"use strict";

const crypto = require("crypto");

let cachedAccessToken = null;
let cachedAccessTokenExpiresAt = 0;

const logSuccess = (action, details = {}) => console.log("[normal-test-submit][SUCCESS]", action, details);
const logError = (action, error, details = {}) => console.error("[normal-test-submit][ERROR]", action, {
  message: error && error.message ? error.message : String(error || "Unknown error"),
  ...details,
});

const json = (statusCode, body, origin) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  },
  body: JSON.stringify(body),
});

function base64url(value) {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function firestoreValueToJs(value) {
  if (!value || typeof value !== "object") return null;
  if ("nullValue" in value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) return (value.arrayValue.values || []).map(firestoreValueToJs);
  if ("mapValue" in value) {
    const out = {};
    for (const [key, child] of Object.entries(value.mapValue.fields || {})) out[key] = firestoreValueToJs(child);
    return out;
  }
  return null;
}

function jsToFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(jsToFirestoreValue) } };
  if (typeof value === "object") {
    const fields = {};
    for (const [key, child] of Object.entries(value)) fields[key] = jsToFirestoreValue(child);
    return { mapValue: { fields } };
  }
  return { nullValue: null };
}

async function verifyFirebaseIdToken(idToken, apiKey) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !Array.isArray(data.users) || !data.users[0] || !data.users[0].localId) {
    throw Object.assign(new Error("Firebase login token is invalid or expired."), { statusCode: 401 });
  }
  return data.users[0].localId;
}

async function getServiceAccessToken(projectId, clientEmail, privateKey) {
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt - 60000) return cachedAccessToken;
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = header + "." + claim;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), privateKey);
  const assertion = unsigned + "." + base64url(signature);
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) throw new Error("Could not obtain the Firestore service access token.");
  cachedAccessToken = data.access_token;
  cachedAccessTokenExpiresAt = Date.now() + Number(data.expires_in || 3600) * 1000;
  logSuccess("service-token-created", { projectId });
  return cachedAccessToken;
}

async function firestoreRequest(url, accessToken, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error && data.error.message ? data.error.message : `Firestore request failed (HTTP ${response.status}).`);
    error.statusCode = response.status;
    throw error;
  }
  return data;
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function calculateRank(score, total) {
  const percentage = total > 0 ? (score / total) * 100 : 0;
  if (percentage >= 90) return "Top 5%";
  if (percentage >= 80) return "Top 10%";
  if (percentage >= 60) return "Top 25%";
  if (percentage >= 40) return "Top 50%";
  return "Top 80%";
}

exports.handler = async (event) => {
  const origin = event.headers && (event.headers.origin || event.headers.Origin);
  try {
    if (event.httpMethod === "OPTIONS") return json(204, {}, origin);
    if (event.httpMethod !== "POST") return json(405, { ok: false, error: "Method not allowed." }, origin);

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const webApiKey = process.env.FIREBASE_WEB_API_KEY;
    if (!projectId || !clientEmail || !privateKey || !webApiKey) {
      throw Object.assign(new Error("Server configuration is incomplete. Contact the site administrator."), { statusCode: 500 });
    }

    const authHeader = event.headers && (event.headers.authorization || event.headers.Authorization);
    const idToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!idToken) throw Object.assign(new Error("Please sign in before syncing your test."), { statusCode: 401 });

    const body = JSON.parse(event.body || "{}");
    const quizId = String(body.quizId || "");
    const attemptId = String(body.attemptId || "");
    const answers = body.answers && typeof body.answers === "object" ? body.answers : {};
    const questionIds = Array.isArray(body.questionIds) ? body.questionIds : [];

    if (!/^[A-Za-z0-9_-]{1,180}$/.test(quizId)) {
      throw Object.assign(new Error("Quiz ID is invalid."), { statusCode: 400 });
    }
    if (!/^[A-Za-z0-9_-]{8,180}$/.test(attemptId)) {
      throw Object.assign(new Error("Attempt ID is invalid."), { statusCode: 400 });
    }
    if (!questionIds.length || questionIds.length > 5000) {
      throw Object.assign(new Error("Attempt question list is invalid."), { statusCode: 400 });
    }
    for (const [questionId, answer] of Object.entries(answers)) {
      if (!/^Q\d+$/.test(questionId) || !["A", "B", "C", "D"].includes(answer)) {
        throw Object.assign(new Error("Submitted answers contain an invalid value."), { statusCode: 400 });
      }
    }

    const uid = await verifyFirebaseIdToken(idToken, webApiKey);
    const accessToken = await getServiceAccessToken(projectId, clientEmail, privateKey);
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents`;
    const resultPath = `user_results/${uid}/attempts/${attemptId}`;
    const resultUrl = `${baseUrl}/${resultPath}`;

    // Idempotency: a repeated sync returns the previously persisted result.
    try {
      const existing = await firestoreRequest(resultUrl, accessToken);
      if (existing && existing.name) {
        const existingData = {};
        for (const [key, value] of Object.entries(existing.fields || {})) existingData[key] = firestoreValueToJs(value);
        logSuccess("duplicate-attempt-returned", { quizId, attemptId });
        return json(200, { ok: true, duplicate: true, result: existingData }, origin);
      }
    } catch (error) {
      if (error.statusCode !== 404) throw error;
    }

    const quizDoc = await firestoreRequest(`${baseUrl}/quizzes/${encodeURIComponent(quizId)}`, accessToken);
    const quizData = {};
    for (const [key, value] of Object.entries(quizDoc.fields || {})) quizData[key] = firestoreValueToJs(value);
    if (!Array.isArray(quizData.questions)) throw Object.assign(new Error("Quiz question data is unavailable."), { statusCode: 404 });

    const indexedQuestions = quizData.questions.map((q, index) => ({ ...q, id: `Q${index + 1}` }));
    const questionById = new Map(indexedQuestions.map(q => [q.id, q]));
    const selectedQuestions = questionIds.map(id => questionById.get(String(id)));
    if (selectedQuestions.some(q => !q) || new Set(questionIds).size !== questionIds.length) {
      throw Object.assign(new Error("Attempt question list does not match this quiz."), { statusCode: 400 });
    }

    let score = 0;
    let wrong = 0;
    const details = selectedQuestions.map((question) => {
      const userAnswer = answers[question.id] || null;
      const correctAnswer = question.answer;
      if (!["A", "B", "C", "D"].includes(correctAnswer)) {
        throw Object.assign(new Error("Answer key is missing for one or more questions."), { statusCode: 500 });
      }
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) score++;
      else if (userAnswer) wrong++;
      return {
        qId: question.id,
        qText: question.question || "",
        imageUrl: question.imageUrl || null,
        userAnswer,
        correctAnswer,
        isCorrect,
        timeSpent: 0,
      };
    });

    const total = selectedQuestions.length;
    const skipped = Math.max(0, total - score - wrong);
    const startedAt = Number(body.startedAt) || Date.now();
    const durationSeconds = Math.max(0, Math.min(24 * 60 * 60, Number(body.durationSeconds) || 0));
    const elapsedSeconds = Math.max(0, Math.min(durationSeconds, Math.floor((Date.now() - startedAt) / 1000)));
    const resultData = {
      quizId,
      quizTitle: String(quizData.title || body.quizTitle || "Quiz"),
      score,
      total,
      wrong,
      skipped,
      answers: details,
      status: body.isTimeout ? "Timed Out" : "Completed",
      timestamp: new Date().toISOString(),
      timeTaken: formatTime(elapsedSeconds),
      totalTimeSeconds: elapsedSeconds,
      rank: calculateRank(score, total),
      attemptId,
      scoringSource: "server",
    };

    const firestoreFields = {};
    for (const [key, value] of Object.entries(resultData)) {
      if (key === "timestamp") firestoreFields[key] = { timestampValue: resultData.timestamp };
      else firestoreFields[key] = jsToFirestoreValue(value);
    }
    const writeUrl = `${resultUrl}?currentDocument.exists=false`;
    try {
      await firestoreRequest(writeUrl, accessToken, {
        method: "PATCH",
        body: JSON.stringify({ fields: firestoreFields }),
      });
    } catch (writeError) {
      // A concurrent retry may have created the same attempt between the
      // initial read and write. Return that record rather than double-score.
      try {
        const existing = await firestoreRequest(resultUrl, accessToken);
        if (existing && existing.name) {
          const existingData = {};
          for (const [key, value] of Object.entries(existing.fields || {})) existingData[key] = firestoreValueToJs(value);
          logSuccess("duplicate-race-returned", { quizId, attemptId });
          return json(200, { ok: true, duplicate: true, result: existingData }, origin);
        }
      } catch (_) {}
      throw writeError;
    }

    logSuccess("attempt-scored-and-saved", { quizId, attemptId, uid, total, score });
    return json(200, { ok: true, duplicate: false, result: resultData }, origin);
  } catch (error) {
    logError("handler", error);
    return json(Number(error.statusCode) || 500, {
      ok: false,
      error: error && error.message ? error.message : "Test sync failed.",
    }, origin);
  }
};
