/* Browser-side reliability helpers for the quiz flow.
 * Never persist or log correct-answer keys or authentication tokens here.
 */
(function () {
    'use strict';

    const PREFIX = '[QuizReliability]';
    const STORAGE_VERSION = 1;

    function safeContext(context) {
        const source = context && typeof context === 'object' ? context : {};
        return {
            mode: source.mode || null,
            quizId: source.quizId || null,
            attemptId: source.attemptId || null,
            operation: source.operation || null
        };
    }

    function success(operation, context = {}) {
        console.info(`✅ SUCCESS ${PREFIX} ${operation}`, safeContext({ ...context, operation }));
    }

    function info(operation, context = {}) {
        console.info(`ℹ️ INFO ${PREFIX} ${operation}`, safeContext({ ...context, operation }));
    }

    function warning(operation, context = {}, error = null) {
        console.warn(`⚠️ WARNING ${PREFIX} ${operation}`, safeContext({ ...context, operation }), error || '');
    }

    function failure(operation, error, context = {}) {
        console.error(`❌ ERROR ${PREFIX} ${operation}`, safeContext({ ...context, operation }), {
            message: error && error.message ? error.message : String(error || 'Unknown error'),
            code: error && error.code ? error.code : null
        });
    }

    function storageKey(uid, quizId) {
        return `neelaxmi:quiz-test:v${STORAGE_VERSION}:${uid}:${quizId}`;
    }

    function sanitizeQuestions(questions) {
        return (Array.isArray(questions) ? questions : []).map((question, index) => {
            const { answer, correctAnswer, answerKey, solutionAnswer, ...safeQuestion } = question || {};
            return { ...safeQuestion, id: safeQuestion.id || `Q${index + 1}` };
        });
    }

    function canUseLocalStorage() {
        const probeKey = `neelaxmi:quiz-test:probe:${Date.now()}`;
        try {
            localStorage.setItem(probeKey, '1');
            localStorage.removeItem(probeKey);
            success('local-storage-available');
            return true;
        } catch (error) {
            failure('local-storage-unavailable', error);
            return false;
        }
    }

    function saveLocalAttempt(uid, quizId, attempt) {
        const context = { mode: attempt && attempt.mode, quizId, attemptId: attempt && attempt.attemptId };
        try {
            if (!uid || !quizId || !attempt || !attempt.attemptId) {
                throw new Error('Cannot save a local attempt without userId, quizId and attemptId.');
            }
            const safePayload = {
                version: STORAGE_VERSION,
                uid,
                quizId,
                attemptId: attempt.attemptId,
                mode: attempt.mode || 'test',
                status: attempt.status || 'active',
                quizTitle: attempt.quizTitle || '',
                questions: sanitizeQuestions(attempt.questions),
                userAnswers: attempt.userAnswers && typeof attempt.userAnswers === 'object' ? attempt.userAnswers : {},
                visitedQuestions: attempt.visitedQuestions && typeof attempt.visitedQuestions === 'object' ? attempt.visitedQuestions : {},
                markedForReview: attempt.markedForReview && typeof attempt.markedForReview === 'object' ? attempt.markedForReview : {},
                currentIndex: Math.max(0, Number(attempt.currentIndex) || 0),
                deadlineAtMs: Number(attempt.deadlineAtMs) || null,
                startedAtMs: Number(attempt.startedAtMs) || null,
                durationSeconds: Math.max(0, Number(attempt.durationSeconds) || 0),
                savedAtMs: Date.now()
            };
            localStorage.setItem(storageKey(uid, quizId), JSON.stringify(safePayload));
            success('local-attempt-saved', context);
            return true;
        } catch (error) {
            failure('local-attempt-save-failed', error, context);
            return false;
        }
    }

    function loadLocalAttempt(uid, quizId) {
        const context = { quizId };
        try {
            const raw = localStorage.getItem(storageKey(uid, quizId));
            if (!raw) {
                info('no-local-attempt-found', context);
                return null;
            }
            const attempt = JSON.parse(raw);
            if (!attempt || attempt.version !== STORAGE_VERSION || attempt.uid !== uid || attempt.quizId !== quizId) {
                throw new Error('Saved local attempt has an unsupported version or mismatched identity.');
            }
            attempt.questions = sanitizeQuestions(attempt.questions);
            success('local-attempt-restored-from-storage', {
                ...context, mode: attempt.mode, attemptId: attempt.attemptId
            });
            return attempt;
        } catch (error) {
            failure('local-attempt-load-failed', error, context);
            return null;
        }
    }

    function clearLocalAttempt(uid, quizId, attemptId = null) {
        const context = { quizId, attemptId };
        try {
            const key = storageKey(uid, quizId);
            const existing = loadLocalAttempt(uid, quizId);
            if (attemptId && existing && existing.attemptId !== attemptId) {
                warning('local-attempt-not-cleared-id-mismatch', context);
                return false;
            }
            localStorage.removeItem(key);
            success('local-attempt-cleared', context);
            return true;
        } catch (error) {
            failure('local-attempt-clear-failed', error, context);
            return false;
        }
    }

    async function api(action, payload = {}) {
        const context = { mode: payload.mode || null, quizId: payload.quizId || null, attemptId: payload.attemptId || null };
        try {
            const authInstance = (typeof auth !== 'undefined' && auth) ? auth : window.auth;
            if (!authInstance || !authInstance.currentUser) {
                throw new Error('Signed-in user is required for the quiz service.');
            }
            const idToken = await authInstance.currentUser.getIdToken();
            const response = await fetch('/.netlify/functions/quiz-attempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ action, ...payload })
            });
            let data = {};
            try { data = await response.json(); } catch (_) {}
            if (!response.ok) {
                throw new Error(data.error || `Quiz API failed with HTTP ${response.status}.`);
            }
            success(`api-${action}`, context);
            return data;
        } catch (error) {
            failure(`api-${action}-failed`, error, context);
            throw error;
        }
    }

    window.QuizReliability = {
        success, info, warning, error: failure,
        api,
        saveLocalAttempt,
        loadLocalAttempt,
        canUseLocalStorage,
        clearLocalAttempt,
        sanitizeQuestions
    };

    window.addEventListener('online', () => success('browser-online'));
    window.addEventListener('offline', () => warning('browser-offline', { operation: 'network-state' }));
    window.addEventListener('error', (event) => failure('uncaught-window-error', event.error || event.message));
    window.addEventListener('unhandledrejection', (event) => failure('unhandled-promise-rejection', event.reason));
    success('reliability-helpers-initialized');
})();
