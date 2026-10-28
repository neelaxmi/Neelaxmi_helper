/**
 * Secure quiz-attempt API.
 *
 * Required Netlify environment variable:
 *   FIREBASE_SERVICE_ACCOUNT_JSON = complete Firebase service-account JSON.
 *
 * This endpoint is the trusted boundary for quiz answers. The browser receives
 * question text/options only; correct answers are read from Firestore Admin
 * SDK inside this function and are never returned during Test Mode.
 */
import { randomUUID } from "node:crypto";
import admin from "firebase-admin";

const LOG_PREFIX = "[quiz-attempt-api]";
const allowedOrigin = process.env.QUIZ_ALLOWED_ORIGIN || "*";

function logSuccess(action, details = {}) {
  console.info(`✅ SUCCESS ${LOG_PREFIX} ${action}`, details);
}
function logInfo(action, details = {}) {
  console.info(`ℹ️ INFO ${LOG_PREFIX} ${action}`, details);
}
function logWarning(action, details = {}) {
  console.warn(`⚠️ WARNING ${LOG_PREFIX} ${action}`, details);
}
function logError(action, error, details = {}) {
  console.error(`❌ ERROR ${LOG_PREFIX} ${action}`, {
    ...details,
    message: error?.message || String(error),
    code: error?.code || null,
  });
}

function getAdminApp() {
  if (admin.apps.length) return admin.app();
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not configured in Netlify.");
  const serviceAccount = JSON.parse(raw);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  logSuccess("firebase-admin-initialized", { projectId: serviceAccount.project_id || null });
  return admin.app();
}

function response(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin",
    },
    body: JSON.stringify(payload),
  };
}

function safeQuestion(question, index) {
  const { answer, correctAnswer, answerKey, solutionAnswer, ...publicFields } = question || {};
  return { ...publicFields, id: `Q${index + 1}` };
}

async function requireUser(event, db) {
  const header = event.headers?.authorization || event.headers?.Authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw Object.assign(new Error("Authentication required."), { statusCode: 401 });
  const decoded = await getAdminApp().auth().verifyIdToken(match[1]);
  if (!decoded?.uid) throw Object.assign(new Error("Invalid authentication token."), { statusCode: 401 });
  return decoded.uid;
}

async function resolveQuiz(db, requestedId) {
  if (!requestedId || typeof requestedId !== "string" || requestedId.length > 200) {
    throw Object.assign(new Error("A valid quizId is required."), { statusCode: 400 });
  }
  let quizId = requestedId;
  let quizSnap = await db.collection("quizzes").doc(quizId).get();
  if (!quizSnap.exists) {
    const aliasSnap = await db.collection("quiz_aliases").doc(quizId).get();
    const realId = aliasSnap.exists ? aliasSnap.data()?.quizId : null;
    if (realId) {
      quizId = realId;
      quizSnap = await db.collection("quizzes").doc(quizId).get();
    }
  }
  if (!quizSnap.exists) throw Object.assign(new Error("Quiz not found."), { statusCode: 404 });
  const data = quizSnap.data() || {};
  if (!Array.isArray(data.questions)) throw Object.assign(new Error("Quiz question data is invalid."), { statusCode: 500 });
  return { quizId, data };
}

function selectedQuestions(data, questionIds) {
  if (!Array.isArray(questionIds) || questionIds.length < 1 || questionIds.length > 1000) {
    throw Object.assign(new Error("Select between 1 and 1000 questions."), { statusCode: 400 });
  }
  const max = data.questions.length;
  const indexes = questionIds.map((id) => {
    const match = /^Q([1-9]\d*)$/.exec(String(id));
    if (!match) throw Object.assign(new Error("Invalid question ID in attempt."), { statusCode: 400 });
    const index = Number(match[1]) - 1;
    if (index < 0 || index >= max) throw Object.assign(new Error("Question ID is outside this quiz."), { statusCode: 400 });
    return index;
  });
  if (new Set(indexes).size !== indexes.length) {
    throw Object.assign(new Error("Duplicate question IDs are not allowed."), { statusCode: 400 });
  }
  return indexes.map((index) => ({ index, question: data.questions[index], id: `Q${index + 1}` }));
}

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return response(204, {});
  if (event.httpMethod !== "POST") return response(405, { error: "Method not allowed." });

  let action = "unknown";
  let uid = null;
  let attemptId = null;
  try {
    const app = getAdminApp();
    const db = app.firestore();
    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      throw Object.assign(new Error("Request body must be valid JSON."), { statusCode: 400 });
    }
    action = String(body.action || "");
    uid = await requireUser(event, db);

    if (action === "unlockPaidQuiz") {
      const { quizId, data } = await resolveQuiz(db, body.quizId);
      if (data.isPaid !== true) {
        logInfo("unlock-not-required", { uid, quizId });
        return response(200, { unlocked: true, alreadyUnlocked: true });
      }
      const code = String(body.code || "").trim();
      if (!/^\d{6}$/.test(code)) throw Object.assign(new Error("Enter the 6-digit token exactly as shown."), { statusCode: 400 });
      const poolRef = db.collection("quiz_tokens").doc(quizId);
      const tokensCol = poolRef.collection("tokens");
      const candidateSnap = await tokensCol.where("code", "==", code).limit(1).get();
      if (candidateSnap.empty) throw Object.assign(new Error("That token is invalid, already used, or not for this quiz."), { statusCode: 403 });
      const tokenRef = candidateSnap.docs[0].ref;
      const unlockRef = db.collection("quiz_unlocks").doc(`${uid}_${quizId}`);
      const alreadyUnlocked = await unlockRef.get();
      if (alreadyUnlocked.exists) {
        logSuccess("paid-quiz-already-unlocked", { uid, quizId });
        return response(200, { unlocked: true, alreadyUnlocked: true });
      }
      await db.runTransaction(async (tx) => {
        const tokenDoc = await tx.get(tokenRef);
        const currentUnlock = await tx.get(unlockRef);
        if (currentUnlock.exists) return;
        if (!tokenDoc.exists) throw Object.assign(new Error("That token is invalid, already used, or not for this quiz."), { statusCode: 403 });
        tx.delete(tokenRef);
        tx.set(poolRef, { usedCount: admin.firestore.FieldValue.increment(1) }, { merge: true });
        tx.set(unlockRef, {
          uid, quizId,
          unlockedAt: admin.firestore.FieldValue.serverTimestamp(),
          tokenId: tokenRef.id,
        });
      });
      logSuccess("paid-quiz-unlocked", { uid, quizId });
      return response(200, { unlocked: true, alreadyUnlocked: false });
    }

    if (action === "getQuiz") {
      const { quizId, data } = await resolveQuiz(db, body.quizId);
      if (data.isPaid === true) {
        const unlockSnap = await db.collection("quiz_unlocks").doc(`${uid}_${quizId}`).get();
        if (!unlockSnap.exists) {
          logWarning("paid-quiz-locked", { uid, quizId });
          return response(200, {
            quizId, title: data.title || "Quiz",
            durationMinutes: Number(data.durationMinutes) || null,
            test_quiz: data.test_quiz === true, isPaid: true,
            requiresUnlock: true, questions: [],
          });
        }
      }
      logSuccess("get-quiz", { uid, quizId, questionCount: data.questions.length });
      return response(200, {
        quizId,
        title: data.title || "Quiz",
        durationMinutes: Number(data.durationMinutes) || null,
        test_quiz: data.test_quiz === true,
        isPaid: data.isPaid === true,
        requiresUnlock: false,
        questions: data.questions.map(safeQuestion),
      });
    }

    if (action === "startAttempt") {
      const { quizId, data } = await resolveQuiz(db, body.quizId);
      const mode = body.mode === "quiz" ? "quiz" : body.mode === "test" ? "test" : null;
      if (!mode) throw Object.assign(new Error("mode must be test or quiz."), { statusCode: 400 });
      if (data.isPaid === true) {
        const unlockSnap = await db.collection("quiz_unlocks").doc(`${uid}_${quizId}`).get();
        if (!unlockSnap.exists) throw Object.assign(new Error("This paid quiz is locked. Unlock it with a valid token first."), { statusCode: 403 });
      }
      const chosen = selectedQuestions(data, body.questionIds);
      const maxMinutes = Number(data.durationMinutes) || Math.max(1, chosen.length);
      const fixedMinutes = Number(data.durationMinutes) || 20;
      const requestedMinutes = Number(body.durationMinutes);
      const durationMinutes = data.test_quiz === true
        ? fixedMinutes
        : Math.min(maxMinutes, Math.max(1, Number.isFinite(requestedMinutes) ? requestedMinutes : maxMinutes));
      const now = admin.firestore.Timestamp.now();
      const deadlineAt = admin.firestore.Timestamp.fromMillis(now.toMillis() + durationMinutes * 60_000);
      attemptId = randomUUID();
      const attempt = {
        attemptId, uid, quizId, quizTitle: data.title || "Quiz", mode,
        questionIds: chosen.map((q) => q.id),
        durationSeconds: durationMinutes * 60,
        startedAt: now, deadlineAt, status: "active",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      await db.collection("quiz_attempts").doc(attemptId).create(attempt);
      logSuccess("start-attempt", { uid, quizId, attemptId, mode, questionCount: chosen.length, durationMinutes });
      return response(200, {
        attemptId, quizId, quizTitle: attempt.quizTitle, mode,
        questionIds: attempt.questionIds, durationSeconds: attempt.durationSeconds,
        startedAtMs: now.toMillis(), deadlineAtMs: deadlineAt.toMillis(),
      });
    }

    if (action === "checkAnswer") {
      attemptId = String(body.attemptId || "");
      const attemptRef = db.collection("quiz_attempts").doc(attemptId);
      const attemptSnap = await attemptRef.get();
      if (!attemptSnap.exists) throw Object.assign(new Error("Attempt not found."), { statusCode: 404 });
      const attempt = attemptSnap.data();
      if (attempt.uid !== uid) throw Object.assign(new Error("Attempt access denied."), { statusCode: 403 });
      if (attempt.mode !== "quiz") throw Object.assign(new Error("Answer checks are disabled in Test Mode."), { statusCode: 403 });
      if (attempt.status !== "active") throw Object.assign(new Error("Attempt is no longer active."), { statusCode: 409 });
      const qId = String(body.questionId || "");
      if (!attempt.questionIds.includes(qId)) throw Object.assign(new Error("Question does not belong to this attempt."), { statusCode: 400 });
      const { data } = await resolveQuiz(db, attempt.quizId);
      const match = /^Q([1-9]\d*)$/.exec(qId);
      const question = data.questions[Number(match[1]) - 1];
      if (!question) throw Object.assign(new Error("Question not found."), { statusCode: 404 });
      const selectedAnswer = body.answer == null ? null : String(body.answer);
      const correctAnswer = String(question.answer || question.correctAnswer || "");
      const isCorrect = !!selectedAnswer && selectedAnswer === correctAnswer;
      logSuccess("check-answer", { uid, quizId: attempt.quizId, attemptId, questionId: qId, isCorrect });
      return response(200, { questionId: qId, isCorrect, correctAnswer });
    }

    if (action === "submitAttempt") {
      attemptId = String(body.attemptId || "");
      if (!attemptId || attemptId.length > 100) throw Object.assign(new Error("Valid attemptId required."), { statusCode: 400 });
      const attemptRef = db.collection("quiz_attempts").doc(attemptId);
      const attemptSnap = await attemptRef.get();
      if (!attemptSnap.exists) throw Object.assign(new Error("Attempt not found."), { statusCode: 404 });
      const attempt = attemptSnap.data();
      if (attempt.uid !== uid) throw Object.assign(new Error("Attempt access denied."), { statusCode: 403 });

      const resultRef = db.collection("user_results").doc(uid).collection("attempts").doc(attemptId);
      if (attempt.status === "submitted") {
        const savedResult = await resultRef.get();
        if (!savedResult.exists) throw Object.assign(new Error("Submitted result record is missing."), { statusCode: 500 });
        logSuccess("submit-idempotent-replay", { uid, quizId: attempt.quizId, attemptId });
        return response(200, { result: savedResult.data(), alreadySubmitted: true });
      }

      if (!["test", "quiz"].includes(attempt.mode)) {
        throw Object.assign(new Error("Invalid attempt mode."), { statusCode: 409 });
      }
      const answers = body.answers && typeof body.answers === "object" ? body.answers : {};
      const { data } = await resolveQuiz(db, attempt.quizId);
      const chosen = selectedQuestions(data, attempt.questionIds);
      const detailed = chosen.map(({ question, id }) => {
        const userAnswer = ["A", "B", "C", "D"].includes(answers[id]) ? answers[id] : null;
        const correctAnswer = String(question.answer || question.correctAnswer || "");
        const isCorrect = !!userAnswer && userAnswer === correctAnswer;
        return {
          qId: id, qText: question.question || "", imageUrl: question.imageUrl || null,
          userAnswer, correctAnswer, isCorrect, timeSpent: 0,
        };
      });
      const score = detailed.filter((a) => a.isCorrect).length;
      const wrong = detailed.filter((a) => a.userAnswer && !a.isCorrect).length;
      const skipped = detailed.length - score - wrong;
      const nowMs = Date.now();
      const startedMs = attempt.startedAt?.toMillis?.() || nowMs;
      const deadlineMs = attempt.deadlineAt?.toMillis?.() || (startedMs + attempt.durationSeconds * 1000);
      const effectiveNowMs = Math.min(nowMs, deadlineMs);
      const totalTimeSeconds = Math.max(0, Math.min(attempt.durationSeconds, Math.floor((effectiveNowMs - startedMs) / 1000)));
      const formattedTime = `${String(Math.floor(totalTimeSeconds / 60)).padStart(2, "0")}:${String(totalTimeSeconds % 60).padStart(2, "0")}`;
      const resultData = {
        attemptId, quizId: attempt.quizId, quizTitle: attempt.quizTitle || data.title || "Quiz",
        score, total: detailed.length, wrong, skipped, answers: detailed,
        status: nowMs >= deadlineMs ? "Timed Out" : "Completed",
        timestamp: new Date(nowMs).toISOString(),
        timeTaken: formattedTime, totalTimeSeconds,
        rank: "Unranked",
      };

      const transactionResult = await db.runTransaction(async (tx) => {
        const freshAttemptSnap = await tx.get(attemptRef);
        if (!freshAttemptSnap.exists) throw Object.assign(new Error("Attempt not found."), { statusCode: 404 });
        const freshAttempt = freshAttemptSnap.data();
        if (freshAttempt.uid !== uid) throw Object.assign(new Error("Attempt access denied."), { statusCode: 403 });
        if (freshAttempt.status === "submitted") {
          const existing = await tx.get(resultRef);
          return { result: existing.exists ? existing.data() : null, alreadySubmitted: true };
        }
        tx.set(resultRef, resultData);
        tx.update(attemptRef, {
          status: "submitted",
          submittedAt: admin.firestore.FieldValue.serverTimestamp(),
          resultPath: `user_results/${uid}/attempts/${attemptId}`,
        });
        return { result: resultData, alreadySubmitted: false };
      });
      if (!transactionResult.result) throw Object.assign(new Error("Could not retrieve submitted result."), { statusCode: 500 });
      logSuccess("submit-attempt", { uid, quizId: attempt.quizId, attemptId, score, total: detailed.length, alreadySubmitted: transactionResult.alreadySubmitted });
      return response(200, { result: transactionResult.result, alreadySubmitted: transactionResult.alreadySubmitted });
    }

    throw Object.assign(new Error("Unknown action."), { statusCode: 400 });
  } catch (error) {
    const status = Number(error?.statusCode) || (error?.code === "auth/id-token-expired" || error?.code === "auth/argument-error" ? 401 : 500);
    logError(action, error, { uid, attemptId, status });
    return response(status, { error: status >= 500 ? "Quiz service error. Check server logs." : error.message });
  }
};
