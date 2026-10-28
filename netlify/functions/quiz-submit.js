'use strict';

const admin = require('firebase-admin');

function json(statusCode, payload) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify(payload)
    };
}

function safeTimestamp(value) {
    if (value && typeof value.toDate === 'function') return value.toDate().toISOString();
    if (value && typeof value._seconds === 'number') return new Date(value._seconds * 1000).toISOString();
    return typeof value === 'string' ? value : null;
}

function serializeResult(data) {
    const result = { ...data };
    result.timestamp = safeTimestamp(data && data.timestamp);
    return result;
}

function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(Number(seconds) || 0));
    const minutes = Math.floor(safe / 60);
    const remaining = safe % 60;
    return String(minutes).padStart(2, '0') + ':' + String(remaining).padStart(2, '0');
}

function getAdminApp() {
    if (admin.apps.length) return admin.app();
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not configured in Netlify environment variables.');
    let serviceAccount;
    try {
        serviceAccount = JSON.parse(raw);
    } catch (error) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.');
    }
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    console.info('[quiz-submit][admin-init][SUCCESS] Firebase Admin initialized.');
    return admin.app();
}

exports.handler = async function handler(event) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': event.headers && event.headers.origin ? event.headers.origin : '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Cache-Control': 'no-store'
            },
            body: ''
        };
    }
    if (event.httpMethod !== 'POST') {
        console.warn('[quiz-submit][method][ERROR] Unsupported HTTP method.', { method: event.httpMethod });
        return json(405, { success: false, error: 'Method not allowed.' });
    }

    try {
        const headers = event.headers || {};
        const authHeader = headers.authorization || headers.Authorization || '';
        const tokenMatch = /^Bearer\s+(.+)$/i.exec(authHeader);
        if (!tokenMatch) {
            console.warn('[quiz-submit][auth][ERROR] Missing bearer token.');
            return json(401, { success: false, error: 'Please sign in before syncing this attempt.' });
        }

        const app = getAdminApp();
        const auth = admin.auth(app);
        const db = admin.firestore(app);
        const decoded = await auth.verifyIdToken(tokenMatch[1]);
        const uid = decoded.uid;
        let body;
        try {
            body = JSON.parse(event.body || '{}');
        } catch (error) {
            return json(400, { success: false, error: 'Invalid JSON request body.' });
        }

        const quizId = String(body.quizId || '');
        const attemptId = String(body.attemptId || '');
        const answers = body.answers;
        if (!/^[A-Za-z0-9_-]{1,180}$/.test(quizId)) {
            return json(400, { success: false, error: 'Invalid quiz identifier.' });
        }
        if (!/^[A-Za-z0-9_-]{8,180}$/.test(attemptId)) {
            return json(400, { success: false, error: 'Invalid attempt identifier.' });
        }
        if (!Array.isArray(answers) || answers.length < 1 || answers.length > 5000) {
            return json(400, { success: false, error: 'Invalid answer list.' });
        }

        const quizRef = db.collection('quizzes').doc(quizId);
        const quizDoc = await quizRef.get();
        if (!quizDoc.exists) return json(404, { success: false, error: 'Quiz not found.' });
        const quiz = quizDoc.data() || {};
        if (!Array.isArray(quiz.questions)) return json(422, { success: false, error: 'This quiz has no supported question bank.' });

        const seen = new Set();
        const durationSeconds = Math.max(0, Math.min(24 * 60 * 60, Math.floor(Number(body.durationSeconds) || 0)));
        const requestedTimeTaken = Math.max(0, Math.floor(Number(body.timeTakenSeconds) || 0));
        const timeTakenSeconds = Math.min(durationSeconds || requestedTimeTaken, requestedTimeTaken);
        const perQuestionTime = answers.length ? Math.floor(timeTakenSeconds / answers.length) : 0;
        let score = 0;
        let wrong = 0;
        let skipped = 0;
        const detailed = [];

        for (const item of answers) {
            const qId = String(item && item.qId || '');
            const match = /^Q([1-9]\d*)$/.exec(qId);
            if (!match || seen.has(qId)) return json(400, { success: false, error: 'Answer list contains an invalid or duplicate question ID.' });
            seen.add(qId);
            const sourceQuestion = quiz.questions[Number(match[1]) - 1];
            if (!sourceQuestion || typeof sourceQuestion.answer !== 'string') {
                return json(422, { success: false, error: 'A server-side answer key is missing for one of the submitted questions.' });
            }
            const userAnswer = item.userAnswer === null || item.userAnswer === undefined || item.userAnswer === ''
                ? null
                : String(item.userAnswer).toUpperCase();
            if (userAnswer !== null && !['A', 'B', 'C', 'D'].includes(userAnswer)) {
                return json(400, { success: false, error: 'An answer contains an invalid option.' });
            }
            const correctAnswer = sourceQuestion.answer;
            const isCorrect = userAnswer !== null && userAnswer === correctAnswer;
            if (isCorrect) score++;
            else if (userAnswer === null) skipped++;
            else wrong++;
            detailed.push({
                qId,
                qText: String(sourceQuestion.question || ''),
                imageUrl: sourceQuestion.imageUrl || null,
                userAnswer,
                correctAnswer,
                isCorrect,
                timeSpent: perQuestionTime
            });
        }

        const total = detailed.length;
        const nowIso = new Date().toISOString();
        const resultRef = db.collection('user_results').doc(uid).collection('attempts').doc(attemptId);
        const resultToStore = {
            quizId,
            quizTitle: String(quiz.title || 'Quiz'),
            score,
            total,
            wrong,
            skipped,
            answers: detailed,
            status: body.isTimeout ? 'Timed Out' : 'Completed',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            timeTaken: formatTime(timeTakenSeconds),
            totalTimeSeconds: timeTakenSeconds,
            rank: 'Top 50%',
            offlineSync: true,
            attemptId
        };

        let outcome;
        await db.runTransaction(async transaction => {
            const existing = await transaction.get(resultRef);
            if (existing.exists) {
                outcome = { alreadySubmitted: true, result: serializeResult(existing.data()) };
                return;
            }
            transaction.set(resultRef, resultToStore);
            outcome = {
                alreadySubmitted: false,
                result: { ...resultToStore, timestamp: nowIso }
            };
        });

        console.info('[quiz-submit][SUCCESS]', {
            quizId,
            attemptId,
            userId: uid,
            score: outcome.result.score,
            total: outcome.result.total,
            alreadySubmitted: outcome.alreadySubmitted
        });
        return json(200, { success: true, alreadySubmitted: outcome.alreadySubmitted, result: outcome.result });
    } catch (error) {
        console.error('[quiz-submit][ERROR]', {
            name: error && error.name ? error.name : 'Error',
            message: error && error.message ? error.message : 'Unknown server error'
        });
        const message = error && /FIREBASE_SERVICE_ACCOUNT_JSON/.test(error.message || '')
            ? 'Server sync is not configured yet. Your pending attempt is still saved on this device.'
            : 'The attempt could not be synced. Your pending attempt is still saved on this device.';
        return json(500, { success: false, error: message });
    }
};
