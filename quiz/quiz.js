let allQuestions = []; 
let questions = [];   
let currentIndex = 0;
let currentQuestionIndex = 0; 
let totalQuestions = 0; 
let userAnswers = {};
let visitedQuestions = {};
let markedForReview = {};
let timeLeft = 0;
let quizStartDurationSeconds = 0;
let timerInterval = null;
let isPaused = false;
let currentMode = 'test';
let checkedQuestions = {};
let currentQuizIsTest = false;
let lockedTestDurationMinutes = null; 
const DEFAULT_TEST_MODE_MINUTES_FALLBACK = 20; 


// Question-image offline cache. IndexedDB is used instead of localStorage so
// image bytes do not consume the small localStorage quota.
const QUIZ_IMAGE_DB_NAME = 'neelaxmi_quiz_image_cache_v1';
const QUIZ_IMAGE_STORE = 'images';
const quizImageMemoryCache = new Map();
let quizImageDbPromise = null;

function openQuizImageCacheDb() {
    if (quizImageDbPromise) return quizImageDbPromise;
    quizImageDbPromise = new Promise((resolve, reject) => {
        try {
            const request = indexedDB.open(QUIZ_IMAGE_DB_NAME, 1);
            request.onupgradeneeded = () => {
                if (!request.result.objectStoreNames.contains(QUIZ_IMAGE_STORE)) {
                    request.result.createObjectStore(QUIZ_IMAGE_STORE, { keyPath: 'url' });
                }
            };
            request.onsuccess = () => {
                console.info('[Quiz][image-cache][SUCCESS] Image cache database opened.');
                resolve(request.result);
            };
            request.onerror = () => reject(request.error || new Error('IndexedDB open failed.'));
        } catch (error) {
            reject(error);
        }
    }).catch(error => {
        quizImageDbPromise = null;
        console.error('[Quiz][image-cache][ERROR] Could not open image cache database.', { message: error && error.message });
        throw error;
    });
    return quizImageDbPromise;
}

async function getCachedQuizImage(url) {
    try {
        if (!url) return null;
        const absoluteUrl = new URL(String(url), location.href).href;
        if (quizImageMemoryCache.has(absoluteUrl)) return quizImageMemoryCache.get(absoluteUrl);
        const db = await openQuizImageCacheDb();
        const record = await new Promise((resolve, reject) => {
            const request = db.transaction(QUIZ_IMAGE_STORE, 'readonly').objectStore(QUIZ_IMAGE_STORE).get(absoluteUrl);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error || new Error('Image cache read failed.'));
        });
        if (record && record.dataUrl) {
            quizImageMemoryCache.set(absoluteUrl, record.dataUrl);
            return record.dataUrl;
        }
        return null;
    } catch (error) {
        console.error('[Quiz][image-cache][ERROR] Could not read cached question image.', { url: String(url || ''), message: error && error.message });
        return null;
    }
}

async function fetchQuizImageResponse(absoluteUrl) {
    let directError = null;
    try {
        const direct = await fetch(absoluteUrl, { mode: 'cors', cache: 'force-cache' });
        if (direct.ok && String(direct.headers.get('content-type') || '').toLowerCase().startsWith('image/')) return direct;
        directError = new Error('Direct image request returned HTTP ' + direct.status);
    } catch (error) {
        directError = error;
    }
    const host = new URL(absoluteUrl).hostname.toLowerCase();
    const isImgBB = ['i.ibb.co', 'ibb.co', 'imgbb.com', 'www.imgbb.com'].includes(host);
    if (!isImgBB || !navigator.onLine) throw directError || new Error('Direct image download failed.');
    const proxyUrl = '/api/quiz-image-cache?url=' + encodeURIComponent(absoluteUrl);
    const proxied = await fetch(proxyUrl, { cache: 'force-cache' });
    if (!proxied.ok || !String(proxied.headers.get('content-type') || '').toLowerCase().startsWith('image/')) {
        throw new Error('Direct download failed (' + (directError && directError.message || 'unknown') + '); ImgBB download fallback returned HTTP ' + proxied.status);
    }
    console.info('[Quiz][image-cache][SUCCESS] Same-origin ImgBB download fallback used.', { hostname: host });
    return proxied;
}

async function cacheQuizImage(url, questionId) {
    try {
        if (!url) return false;
        const absoluteUrl = new URL(String(url), location.href).href;
        if (quizImageMemoryCache.has(absoluteUrl)) return true;
        const existing = await getCachedQuizImage(absoluteUrl);
        if (existing) return true;
        const response = await fetchQuizImageResponse(absoluteUrl);
        if (!response.ok) throw new Error('Image download returned HTTP ' + response.status);
        const blob = await response.blob();
        if (!blob.type.startsWith('image/')) throw new Error('URL did not return an image.');
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error || new Error('Image conversion failed.'));
            reader.readAsDataURL(blob);
        });
        const db = await openQuizImageCacheDb();
        await new Promise((resolve, reject) => {
            const tx = db.transaction(QUIZ_IMAGE_STORE, 'readwrite');
            tx.objectStore(QUIZ_IMAGE_STORE).put({ url: absoluteUrl, dataUrl, cachedAt: Date.now(), questionId: String(questionId || '') });
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error || new Error('Image cache write failed.'));
            tx.onabort = () => reject(tx.error || new Error('Image cache write aborted.'));
        });
        quizImageMemoryCache.set(absoluteUrl, dataUrl);
        console.info('[Quiz][image-cache][SUCCESS] Question image downloaded for offline use.', { questionId, bytes: blob.size });
        return true;
    } catch (error) {
        console.error('[Quiz][image-cache][ERROR] Could not download/cache question image; direct URL will remain as fallback.', {
            questionId, imageUrl: String(url || ''), pageUrl: location.href, message: error && error.message
        });
        return false;
    }
}

async function prepareQuizImages(questionSet) {
    try {
        const imageQuestions = (Array.isArray(questionSet) ? questionSet : []).filter(q => q && q.imageUrl);
        if (!imageQuestions.length) {
            console.info('[Quiz][image-precache][SUCCESS] No question images need preparation.');
            return { total: 0, cached: 0, failed: 0 };
        }
        let cached = 0;
        let failed = 0;
        for (const q of imageQuestions) {
            if (await cacheQuizImage(q.imageUrl, q.id)) cached++;
            else failed++;
        }
        console.info('[Quiz][image-precache][SUCCESS] Question image preparation finished.', { total: imageQuestions.length, cached, failed });
        if (failed) console.warn('[Quiz][image-precache][INFO] Some images will use their original remote URL and may not be available offline.', { failed });
        return { total: imageQuestions.length, cached, failed };
    } catch (error) {
        console.error('[Quiz][image-precache][ERROR] Image preparation failed.', { message: error && error.message });
        return { total: 0, cached: 0, failed: 1 };
    }
}

function showQuizPreparationCountdown(seconds = 10) {
    return new Promise(resolve => {
        let overlay = document.getElementById('quiz-preparation-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'quiz-preparation-overlay';
            overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 p-6 text-white';
            overlay.innerHTML = '<div class="w-full max-w-md text-center"><div class="mx-auto mb-5 h-14 w-14 rounded-full border-4 border-white/25 border-t-white animate-spin"></div><h2 class="text-2xl font-extrabold">We are getting things ready for your quiz</h2><p id="quiz-preparation-status" class="mt-3 text-slate-200">Preparing your questions and images…</p><p id="quiz-preparation-countdown" class="mt-5 text-4xl font-black tabular-nums"></p></div>';
            document.body.appendChild(overlay);
        }
        const status = overlay.querySelector('#quiz-preparation-status');
        const countdown = overlay.querySelector('#quiz-preparation-countdown');
        let remaining = Math.max(1, Number(seconds) || 10);
        if (status) status.textContent = 'Preparing your questions and images…';
        if (countdown) countdown.textContent = remaining + 's';
        console.info('[Quiz][preparation][SUCCESS] Quiz preparation countdown started.', { seconds: remaining });
        const tick = () => {
            remaining--;
            if (remaining <= 0) {
                overlay.remove();
                console.info('[Quiz][preparation][SUCCESS] Quiz preparation countdown completed.');
                resolve(true);
                return;
            }
            if (countdown) countdown.textContent = remaining + 's';
            window.setTimeout(tick, 1000);
        };
        window.setTimeout(tick, 1000);
    });
}

const OFFLINE_ATTEMPT_PREFIX = 'neelaxmi_offline_test_v1:';
let offlineAttemptId = null;
let offlineAttemptStorageKey = null;
let offlineDeadlineAt = null;
let offlinePauseStartedAt = null;
let offlineSaveFailureAlerted = false;
let currentRequestedQuizId = null;

const isOfflineNormalTest = () => currentMode === 'test' && !proctoringEnabled;
function offlineAttemptKey(quizId) { return OFFLINE_ATTEMPT_PREFIX + String(quizId || ''); }
function makeOfflineSafeQuestions(source) {
    return (Array.isArray(source) ? source : []).map(q => {
        const safe = {};
        Object.entries(q || {}).forEach(([key, value]) => {
            if (!['answer', 'correctAnswer', 'correct_answer', 'answerKey', 'answer_key', 'correctOption', 'correct_option'].includes(key)) {
                safe[key] = value;
            }
        });
        return safe;
    });
}
function readOfflineAttemptSnapshot(quizId) {
    try {
        const direct = quizId ? localStorage.getItem(offlineAttemptKey(quizId)) : null;
        if (direct) {
            const parsed = JSON.parse(direct);
            if (parsed && parsed.schemaVersion === 1 && parsed.mode === 'test') {
                console.info('[Quiz][offline-recovery][SUCCESS]', { quizId: parsed.quizId, attemptId: parsed.attemptId, status: parsed.status || 'in_progress' });
                return parsed;
            }
        }
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key || !key.startsWith(OFFLINE_ATTEMPT_PREFIX)) continue;
            const raw = localStorage.getItem(key);
            if (!raw) continue;
            const parsed = JSON.parse(raw);
            if (parsed && parsed.schemaVersion === 1 && parsed.mode === 'test' &&
                (parsed.quizId === quizId || parsed.requestedQuizId === quizId)) {
                console.info('[Quiz][offline-recovery][SUCCESS]', { quizId: parsed.quizId, attemptId: parsed.attemptId, status: parsed.status || 'in_progress' });
                return parsed;
            }
        }
        return null;
    } catch (error) {
        console.error('[Quiz][offline-recovery][ERROR]', { quizId, message: error && error.message });
        return null;
    }
}
function saveOfflineAttemptSnapshot(reason = 'state-change', patch = {}) {
    if (!offlineAttemptStorageKey || !isOfflineNormalTest()) return true;
    try {
        const snapshot = {
            schemaVersion: 1,
            attemptId: offlineAttemptId,
            quizId: currentQuizId,
            requestedQuizId: currentRequestedQuizId || currentQuizId,
            quizTitle: quizEls.title ? quizEls.title.textContent : 'Quiz',
            mode: 'test',
            currentQuizIsTest: !!currentQuizIsTest,
            questions: makeOfflineSafeQuestions(questions),
            currentIndex,
            userAnswers: { ...userAnswers },
            visitedQuestions: { ...visitedQuestions },
            markedForReview: { ...markedForReview },
            startedAt: patch.startedAt || offlineAttemptStartedAt || Date.now(),
            deadlineAt: patch.deadlineAt || offlineDeadlineAt,
            durationSeconds: quizStartDurationSeconds,
            status: patch.status || 'in_progress',
            submittedAt: patch.submittedAt || null,
            submission: patch.submission || null,
            savedAt: Date.now(),
            ...patch
        };
        localStorage.setItem(offlineAttemptStorageKey, JSON.stringify(snapshot));
        offlineSaveFailureAlerted = false;
        console.info('[Quiz][offline-save][SUCCESS]', { reason, quizId: currentQuizId, attemptId: offlineAttemptId, status: snapshot.status });
        return true;
    } catch (error) {
        console.error('[Quiz][offline-save][ERROR]', { reason, quizId: currentQuizId, message: error && error.message });
        if (reason !== 'before-unload' && !offlineSaveFailureAlerted && typeof quizActive === 'function' && quizActive()) {
            offlineSaveFailureAlerted = true;
            try {
                if (!isPaused && typeof togglePause === 'function') togglePause(true);
                alert('Local saving failed, so the test has been paused to protect your answers. Do not refresh or close this page. Check browser storage and retry.');
                console.error('[Quiz][offline-save][ERROR] Active test paused after a local persistence failure.');
            } catch (pauseError) {
                console.error('[Quiz][offline-save][ERROR] Could not pause the test after a local persistence failure.', { message: pauseError && pauseError.message });
            }
        }
        return false;
    }
}
let offlineAttemptStartedAt = null;
function restoreOfflineAttemptSnapshot(snapshot) {
    try {
        currentQuizId = snapshot.quizId;
        currentRequestedQuizId = snapshot.requestedQuizId || snapshot.quizId;
        offlineAttemptStorageKey = offlineAttemptKey(snapshot.quizId);
        offlineAttemptId = snapshot.attemptId;
        offlineAttemptStartedAt = snapshot.startedAt || Date.now();
        offlineDeadlineAt = Number(snapshot.deadlineAt) || Date.now();
        offlinePauseStartedAt = null;
        currentMode = 'test';
        currentQuizIsTest = !!snapshot.currentQuizIsTest;
        proctoringEnabled = false;
        allQuestions = makeOfflineSafeQuestions(snapshot.questions);
        questions = allQuestions.slice();
        currentIndex = Math.max(0, Math.min(Number(snapshot.currentIndex) || 0, Math.max(0, questions.length - 1)));
        userAnswers = snapshot.userAnswers && typeof snapshot.userAnswers === 'object' ? snapshot.userAnswers : {};
        visitedQuestions = snapshot.visitedQuestions && typeof snapshot.visitedQuestions === 'object' ? snapshot.visitedQuestions : {};
        markedForReview = snapshot.markedForReview && typeof snapshot.markedForReview === 'object' ? snapshot.markedForReview : {};
        checkedQuestions = {};
        quizStartDurationSeconds = Number(snapshot.durationSeconds) || 0;
        timeLeft = Math.max(0, Math.ceil((offlineDeadlineAt - Date.now()) / 1000));
        if (quizEls.title) quizEls.title.textContent = snapshot.quizTitle || 'Quiz';
        if (quizEls.setupTitle) quizEls.setupTitle.textContent = snapshot.quizTitle || 'Quiz';
        if (quizEls.loader) quizEls.loader.classList.add('hidden');
        if (quizEls.setupModal) quizEls.setupModal.classList.add('hidden');
        if (quizEls.resumeModal) quizEls.resumeModal.classList.add('hidden');
        console.info('[Quiz][offline-restore][SUCCESS]', { quizId: currentQuizId, attemptId: offlineAttemptId, questions: questions.length, remainingSeconds: timeLeft });
        if (snapshot.status === 'submitted_pending_sync') {
            window.setTimeout(() => {
                if (typeof window.showOfflineSyncScreen === 'function') window.showOfflineSyncScreen(snapshot);
                else console.warn('[Quiz][offline-restore][INFO] Waiting for result sync UI to initialize.');
            }, 0);
            return true;
        }
        startQuizSession();
        return true;
    } catch (error) {
        console.error('[Quiz][offline-restore][ERROR]', { quizId: snapshot && snapshot.quizId, message: error && error.message });
        return false;
    }
}
window.isOfflineNormalTestAttempt = isOfflineNormalTest;
window.getOfflineAttemptSnapshot = () => readOfflineAttemptSnapshot(currentQuizId);
window.updateOfflineAttemptSnapshot = (patch = {}, reason = 'state-update') => {
    if (!offlineAttemptStorageKey) return false;
    const current = readOfflineAttemptSnapshot(currentQuizId);
    if (!current) return false;
    const merged = { ...current, ...patch, savedAt: Date.now() };
    try {
        localStorage.setItem(offlineAttemptStorageKey, JSON.stringify(merged));
        console.info('[Quiz][offline-save][SUCCESS]', { reason, quizId: currentQuizId, attemptId: merged.attemptId, status: merged.status });
        return true;
    } catch (error) {
        console.error('[Quiz][offline-save][ERROR]', { reason, quizId: currentQuizId, message: error && error.message });
        return false;
    }
};
window.clearOfflineAttemptSnapshot = () => {
    try {
        if (offlineAttemptStorageKey) localStorage.removeItem(offlineAttemptStorageKey);
        console.info('[Quiz][offline-clear][SUCCESS]', { quizId: currentQuizId, attemptId: offlineAttemptId });
        offlineAttemptStorageKey = null;
        offlineAttemptId = null;
        offlineDeadlineAt = null;
        offlineAttemptStartedAt = null;
        return true;
    } catch (error) {
        console.error('[Quiz][offline-clear][ERROR]', { message: error && error.message });
        return false;
    }
};


const quizEls = {
    loader: document.getElementById('loading-screen'),
    container: document.getElementById('quiz-container'),
    title: document.getElementById('quiz-title'),
    time: document.getElementById('time-display'),
    qText: document.getElementById('question-text'),
    opts: document.getElementById('options-area'),
    progressBar: document.getElementById('progress-bar'),
    prev: document.getElementById('prev-btn'),
    next: document.getElementById('next-btn'),
    finalSubmit: document.getElementById('final-submit-btn'),
    clearBtn: document.getElementById('clear-btn'),
    markBtn: document.getElementById('mark-review-btn'),
    pause: document.getElementById('pause-btn'),
    resume: document.getElementById('resume-btn'),
    pausedOverlay: document.getElementById('paused-overlay'),
    saveBtn: document.getElementById('save-btn'),
    exitModal: document.getElementById('exit-modal'),
    resumeModal: document.getElementById('resume-modal'),
    setupModal: document.getElementById('setup-modal'), 
    setupSet: document.getElementById('setup-question-set'),
    setupTimer: document.getElementById('setup-timer'),
    startBtn: document.getElementById('btn-start-custom'),
    setupTitle: document.getElementById('setup-quiz-title'),
    viewLastBtn: document.getElementById('btn-view-last-result'),
    endQuizModal: document.getElementById('end-quiz-modal'),
    confirmSubmitModalBtn: document.getElementById('modal-confirm-submit'),
    cancelSubmitModalBtn: document.getElementById('modal-cancel-submit'),
    endQuizEarlyBtn: document.getElementById('end-quiz-early-btn'),
    warningBanner: document.getElementById('warning-banner'),
    warningsLeftCount: document.getElementById('warnings-left-count'),
    warningText: document.getElementById('warning-text')
};

// ============================================================
// PROCTORING STATE (100% client-side — nothing here ever leaves the browser)
// ============================================================
const proctorEls = {
    consentModal: document.getElementById('proctor-consent-modal'),
    enableBtn: document.getElementById('proctor-enable-btn'),
    cancelBtn: document.getElementById('proctor-cancel-btn'),
    fallbackNormalBtn: document.getElementById('proctor-fallback-normal-btn'),
    consentError: document.getElementById('proctor-consent-error'),
    video: document.getElementById('proctor-video'),
    statusDot: document.getElementById('proctor-status-dot'),
    statusText: document.getElementById('proctor-status-text'),
    widget: document.getElementById('proctor-widget')
};

// ===== Pre-Quiz Initialization (Step 1): instructions + consent + CBT/Normal mode choice =====
const preQuizEls = {
    modal: document.getElementById('pre-quiz-init-modal'),
    consentCheckbox: document.getElementById('pre-quiz-consent-checkbox'),
    consentError: document.getElementById('pre-quiz-consent-error'),
    continueBtn: document.getElementById('pre-quiz-continue-btn'),
    modeRadios: () => document.querySelectorAll('input[name="proctor_selection_mode"]')
};

let modelWarmupStarted = false;
let faceModel = null;              // true once face-api.js's tiny_face_detector net is loaded
let proctorStream = null;          // MediaStream from getUserMedia (never transmitted anywhere)
let proctorDetectionTimer = null;  // setInterval handle for the detection loop
let noFaceSince = null;            // timestamp when face last went missing
let pendingStartConfig = null;     // quiz-setup choices captured before proctoring consent
let proctoringEnabled = false;     // true only when the user picked "CBT Mode" in the pre-quiz step
let pendingResume = false;         // true when the camera-consent step was triggered by resuming a saved CBT attempt

function warmUpProctoringAssets() {
    if (modelWarmupStarted) return;
    modelWarmupStarted = true;
    loadWithRetry(() => loadFaceModel(30000), 4, 'face-detection model');
}

async function loadWithRetry(loaderFn, maxAttempts, label) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await loaderFn();
            if (result) {
                console.log(`${label} ready (attempt ${attempt}).`);
                return result;
            }
        } catch (err) {
            console.warn(`${label} load attempt ${attempt}/${maxAttempts} failed:`, err.message);
        }
        if (attempt < maxAttempts) {
            await new Promise((r) => setTimeout(r, 4000 * attempt)); // 4s, 8s, 12s...
        }
    }
    console.warn(`${label} could not be loaded after ${maxAttempts} attempts — continuing without it.`);
    return null;
}

document.addEventListener('change', (e) => {
    if (e.target && e.target.name === 'proctor_selection_mode' && e.target.value === 'cbt') {
        warmUpProctoringAssets();
    }
});
const initiallyChecked = document.querySelector('input[name="proctor_selection_mode"]:checked');
if (initiallyChecked && initiallyChecked.value === 'cbt') warmUpProctoringAssets();

let violationCount = 0;
const MAX_VIOLATIONS = 3;          // exactly 3 warnings allowed; the 4th triggers auto-submit
let violationLog = [];
let violationModalOpen = false;

const SAVED_LANGUAGE_STORAGE_KEY = 'neelaxmi_quiz_language_v1';
let currentLanguage = (() => {
    try {
        const saved = localStorage.getItem(SAVED_LANGUAGE_STORAGE_KEY);
        console.info('[Quiz][translate-mode][SUCCESS] Loaded saved language preference.', { language: saved || 'en' });
        return saved || 'en';
    } catch (error) {
        console.error('[Quiz][translate-mode][ERROR] Could not load saved language preference.', { message: error && error.message });
        return 'en';
    }
})();
let quizAttemptLanguageLocked = false;
window.setQuizAttemptLanguageLock = (locked) => {
    try {
        quizAttemptLanguageLocked = !!locked;
        if (langEls.select) {
            langEls.select.disabled = quizAttemptLanguageLocked;
            langEls.select.setAttribute('aria-disabled', String(quizAttemptLanguageLocked));
        }
        console.info('[Quiz][translate-mode][SUCCESS] Language selector lock updated.', { locked: quizAttemptLanguageLocked });
        return true;
    } catch (error) {
        console.error('[Quiz][translate-mode][ERROR] Could not update language selector lock.', { message: error && error.message });
        return false;
    }
};
const TRANSLATION_CACHE_STORAGE_KEY = 'neelaxmi_translation_cache_v1';
const translationCache = new Map(); // `${lang}::${text}` -> translated text, persisted for offline reuse
const langEls = { select: document.getElementById('language-select') };
if (langEls.select) {
    langEls.select.value = currentLanguage;
    if (!langEls.select.value) currentLanguage = 'en';
}

(function restoreTranslationCache() {
    try {
        const raw = localStorage.getItem(TRANSLATION_CACHE_STORAGE_KEY);
        if (!raw) {
            console.info('[Quiz][translation-cache][SUCCESS] No previous translation cache; starting empty.');
            return;
        }
        const entries = JSON.parse(raw);
        if (!Array.isArray(entries)) throw new Error('Translation cache format is invalid.');
        entries.slice(-600).forEach(entry => {
            if (Array.isArray(entry) && typeof entry[0] === 'string' && typeof entry[1] === 'string') {
                translationCache.set(entry[0], entry[1]);
            }
        });
        console.info('[Quiz][translation-cache][SUCCESS] Restored cached translations.', { entries: translationCache.size });
    } catch (error) {
        console.error('[Quiz][translation-cache][ERROR] Could not restore cached translations.', { message: error && error.message });
    }
})();

function persistTranslationCache() {
    try {
        const entries = Array.from(translationCache.entries()).slice(-600);
        localStorage.setItem(TRANSLATION_CACHE_STORAGE_KEY, JSON.stringify(entries));
        console.info('[Quiz][translation-cache][SUCCESS] Saved translation cache.', { entries: entries.length });
        return true;
    } catch (error) {
        console.error('[Quiz][translation-cache][ERROR] Could not persist translations for offline use.', { message: error && error.message });
        return false;
    }
}

const MATH_PLACEHOLDER_RE = /%%MATH(\d+)%%/g;

function protectMath(text) {
    const segments = [];
    const protectedText = String(text).replace(
        /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g,
        (match) => {
            segments.push(match);
            return `%%MATH${segments.length - 1}%%`;
        }
    );
    return { protectedText, segments };
}

function restoreMath(text, segments) {
    return text.replace(MATH_PLACEHOLDER_RE, (_, i) => segments[Number(i)] ?? '');
}

async function translateText(text, targetLang) {
    if (!text || !targetLang || targetLang === 'en') return text;
    const cacheKey = `${targetLang}::${text}`;
    if (translationCache.has(cacheKey)) {
        console.info('[Quiz][translate][SUCCESS] Translation served from local cache.', { language: targetLang });
        return translationCache.get(cacheKey);
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        console.warn('[Quiz][translate][ERROR] Translation is not cached and internet is unavailable.', { language: targetLang });
        return text;
    }

    const { protectedText, segments } = protectMath(text);
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(protectedText)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Translate HTTP ${res.status}`);
        const data = await res.json();
        const translated = (data[0] || []).map(chunk => chunk[0]).join('');
        if (!translated) throw new Error('Translation provider returned an empty result.');
        const restored = restoreMath(translated, segments);
        translationCache.set(cacheKey, restored);
        persistTranslationCache();
        console.info('[Quiz][translate][SUCCESS] Text translated.', { language: targetLang });
        return restored;
    } catch (err) {
        console.error('[Quiz][translate][ERROR] Translation failed; original text is retained.', { language: targetLang, message: err && err.message });
        return text; // never block answering if translation service fails
    }
}

async function preCacheQuestionTranslations(lang, questionSet = questions) {
    try {
        if (!lang || lang === 'en') return { cached: 0, failed: 0 };
        if (!navigator.onLine) {
            console.warn('[Quiz][translation-precache][ERROR] Cannot prepare offline translations without internet.', { language: lang });
            return { cached: 0, failed: 0 };
        }
        const uniqueTexts = new Set();
        (Array.isArray(questionSet) ? questionSet : []).forEach(question => {
            if (question && question.question) uniqueTexts.add(String(question.question));
            const options = question && question.options;
            if (options && typeof options === 'object') {
                Object.values(options).forEach(option => {
                    if (typeof option === 'string' && option.trim()) uniqueTexts.add(option);
                });
            }
        });
        const missing = Array.from(uniqueTexts).filter(text => !translationCache.has(`${lang}::${text}`));
        if (!missing.length) {
            console.info('[Quiz][translation-precache][SUCCESS] All current quiz text is already cached.', { language: lang, total: uniqueTexts.size });
            return { cached: 0, failed: 0 };
        }

        // Keep background pre-caching bounded so a very large question bank
        // cannot accidentally generate thousands of translation requests.
        const MAX_TRANSLATION_PRECACHE_STRINGS = 250;
        const skipped = Math.max(0, missing.length - MAX_TRANSLATION_PRECACHE_STRINGS);
        const workList = missing.slice(0, MAX_TRANSLATION_PRECACHE_STRINGS);
        if (skipped) {
            console.warn('[Quiz][translation-precache][INFO] Pre-cache batch capped; remaining text will translate on demand while online.', { language: lang, queued: workList.length, skipped });
        }

        let cursor = 0;
        let cached = 0;
        let failed = 0;
        const worker = async () => {
            while (cursor < workList.length) {
                const text = workList[cursor++];
                await translateText(text, lang);
                if (translationCache.has(`${lang}::${text}`)) cached++;
                else failed++;
                if ((cached + failed) % 20 === 0) {
                    console.info('[Quiz][translation-precache][SUCCESS] Translation pack progress.', { language: lang, completed: cached + failed, total: workList.length });
                }
            }
        };
        await Promise.all(Array.from({ length: Math.min(3, missing.length) }, () => worker()));
        console.info('[Quiz][translation-precache][SUCCESS] Finished preparing current quiz translations for offline reuse.', { language: lang, cached, failed, total: workList.length, skipped });
        if (failed) console.error('[Quiz][translation-precache][ERROR] Some strings could not be cached; those strings need internet to translate.', { language: lang, failed });
        return { cached, failed };
    } catch (error) {
        console.error('[Quiz][translation-precache][ERROR] Failed to prepare offline translations.', { language: lang, message: error && error.message });
        return { cached: 0, failed: 1 };
    }
}

async function applyStaticUILanguage(lang) {
    const nodes = document.querySelectorAll('[data-i18n-default]');
    await Promise.all(Array.from(nodes).map(async (node) => {
        const original = node.getAttribute('data-i18n-default');
        node.textContent = await translateText(original, lang);
    }));
}

async function applyQuestionLanguage(lang) {
    const q = questions[currentIndex];
    if (!q) return;

    if (lang === 'en') {
        quizEls.qText.innerHTML = q.question;
    } else {
        quizEls.qText.innerHTML = await translateText(q.question, lang);
    }

    const optionButtons = quizEls.opts.querySelectorAll('.option-btn');
    await Promise.all(Array.from(optionButtons).map(async (btn, i) => {
        const key = ['A', 'B', 'C', 'D'][i];
        if (!key || !q.options[key]) return;
        const textSpan = btn.querySelector('span:last-child');
        if (!textSpan) return;
        textSpan.textContent = lang === 'en' ? q.options[key] : await translateText(q.options[key], lang);
    }));

    renderMath(quizEls.container);
}

async function applyLanguage(lang) {
    try {
        currentLanguage = lang;
        document.documentElement.setAttribute('dir', lang === 'ur' || lang === 'sd' || lang === 'ks' ? 'auto' : 'ltr');
        await Promise.all([applyStaticUILanguage(lang), applyQuestionLanguage(lang)]);
        try {
            localStorage.setItem(SAVED_LANGUAGE_STORAGE_KEY, lang);
            console.info('[Quiz][translate-mode][SUCCESS] Saved language preference.', { language: lang });
        } catch (storageError) {
            console.error('[Quiz][translate-mode][ERROR] Could not save language preference.', { language: lang, message: storageError && storageError.message });
        }
        console.info('[Quiz][translate-mode][SUCCESS] Language applied.', { language: lang, cachedEntries: translationCache.size });
        if (navigator.onLine && lang !== 'en') {
            preCacheQuestionTranslations(lang).catch(error => console.error('[Quiz][translation-precache][ERROR] Background pre-cache failed.', { language: lang, message: error && error.message }));
        }
    } catch (error) {
        console.error('[Quiz][translate-mode][ERROR] Could not fully apply selected language.', { language: lang, message: error && error.message });
    }
}

if (langEls.select) {
    langEls.select.onchange = () => {
        if (quizAttemptLanguageLocked) {
            langEls.select.value = currentLanguage;
            console.warn('[Quiz][translate-mode][INFO] Language change blocked during an active attempt; choose language before the next attempt.');
            alert('Language cannot be changed during an active quiz. Finish this attempt first, then choose a language before starting the next one.');
            return;
        }
        console.info('[Quiz][translate-mode][SUCCESS] Language selector changed.', { language: langEls.select.value });
        applyLanguage(langEls.select.value);
    };
}

const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

const renderMath = (element = document.body) => {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(element, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ],
            throwOnError: false
        });
    }
};

window.goToQuestion = (index) => {
    if (currentQuizIsTest) return;
    if (index >= 0 && index < questions.length) {
        currentIndex = index;
        renderQuestion();
    }
};

const updateQuestionPalette = () => {
    if (currentQuizIsTest) return; // Disable Navigation: no palette/grid to update in strict Test Mode
    if (typeof window.renderQuestionPalette === 'function') {
        const paletteItems = questions.map((q, idx) => {
            let status = 'not-visited';
            const hasAnswer = !!userAnswers[q.id];
            const isMarked = !!markedForReview[q.id];

            if (visitedQuestions[q.id]) {
                if (hasAnswer && isMarked) status = 'answered-marked';
                else if (hasAnswer) status = 'answered';
                else if (isMarked) status = 'marked';
                else status = 'not-answered';
            }

            return {
                number: idx + 1,
                status: status,
                current: idx === currentIndex
            };
        });
        window.renderQuestionPalette(paletteItems);
    }
};



const renderQuestion = () => {
    try {
    const q = questions[currentIndex];
    
    // Mark as visited as soon as it renders
    visitedQuestions[q.id] = true;
    
    quizEls.qText.innerHTML = q.question;

    const existingImg = document.getElementById('current-quiz-image');
    if (existingImg) existingImg.remove();

    if (q.imageUrl) {
        const imgContainer = document.createElement('div');
        imgContainer.id = 'current-quiz-image';
        imgContainer.className = 'w-full flex justify-center my-4';

        const imageFrame = document.createElement('div');
        imageFrame.id = 'trigger-zoom';
        imageFrame.className = 'relative group w-full max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md';

        const questionImage = document.createElement('img');
        questionImage.alt = 'Question image';
        questionImage.loading = 'eager';
        questionImage.decoding = 'async';
        questionImage.referrerPolicy = 'no-referrer';
        questionImage.className = 'w-full h-32 md:h-48 object-contain mx-auto p-2';
        questionImage.addEventListener('load', () => {
            console.info('[Quiz][image][SUCCESS] Question image loaded.', { questionId: q.id });
            imageFrame.classList.add('cursor-zoom-in');
        }, { once: true });
        questionImage.addEventListener('error', () => {
            console.error('[Quiz][image][ERROR] Question image failed to load.', {
                questionId: q.id, imageUrl: String(q.imageUrl || ''), pageUrl: location.href,
                imageHost: (() => { try { return new URL(q.imageUrl, location.href).host; } catch (_) { return 'invalid-url'; } })()
            });
            imageFrame.classList.remove('cursor-zoom-in');
            imageFrame.innerHTML = '';
            const fallback = document.createElement('div');
            fallback.className = 'px-4 py-6 text-center text-sm text-slate-600 dark:text-slate-300';
            fallback.textContent = 'Question image is unavailable right now. You can continue answering using the question text.';
            imageFrame.appendChild(fallback);
        }, { once: true });

        const zoomOverlay = document.createElement('div');
        zoomOverlay.className = 'absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none';
        zoomOverlay.innerHTML = '<div class="bg-white/90 dark:bg-slate-800/90 text-primary px-4 py-2 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm"><i class="fa-solid fa-expand mr-2"></i> Click to Zoom Image</div>';
        imageFrame.appendChild(questionImage);
        imageFrame.appendChild(zoomOverlay);
        imgContainer.appendChild(imageFrame);
        quizEls.qText.parentNode.insertBefore(imgContainer, quizEls.qText.nextSibling);

        try {
            const originalImageUrl = new URL(String(q.imageUrl), location.href).href;
            getCachedQuizImage(originalImageUrl).then(cachedImageUrl => {
                if (!questionImage.isConnected) return;
                questionImage.src = cachedImageUrl || originalImageUrl;
                console.info('[Quiz][image][SUCCESS] Question image source selected.', {
                    questionId: q.id, source: cachedImageUrl ? 'local-cache' : 'remote-url',
                    imageUrl: originalImageUrl, pageUrl: location.href
                });
            }).catch(error => {
                console.error('[Quiz][image][ERROR] Cached image lookup failed; using remote URL.', {
                    questionId: q.id, imageUrl: originalImageUrl, pageUrl: location.href, message: error && error.message
                });
                if (questionImage.isConnected) questionImage.src = originalImageUrl;
            });
            imageFrame.addEventListener('click', () => {
                if (questionImage.complete && questionImage.naturalWidth > 0 && typeof window.openImageZoom === 'function') {
                    window.openImageZoom(questionImage.src);
                    console.info('[Quiz][image-zoom][SUCCESS] Opened question image zoom.', { questionId: q.id });
                } else {
                    console.warn('[Quiz][image-zoom][ERROR] Zoom skipped because the image is not available.', { questionId: q.id });
                }
            });
        } catch (error) {
            console.error('[Quiz][image][ERROR] Invalid question image URL.', { questionId: q.id, message: error && error.message });
            questionImage.dispatchEvent(new Event('error'));
        }
    }

    document.getElementById('question-meta').textContent = `Question ${currentIndex+1} of ${questions.length}`;
    
    quizEls.progressBar.style.width = `${((currentIndex+1)/questions.length)*100}%`;
    quizEls.opts.innerHTML = '';

    const isChecked = checkedQuestions[q.id];
    const userAnswer = userAnswers[q.id];

    ['A','B','C','D'].forEach(key => {
        const btn = document.createElement('button');
        const isSel = userAnswer === key;
        
        let btnClass = "option-btn w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ";
        let badgeClass = "w-8 h-8 rounded-full flex items-center justify-center ";
        
        if (currentMode === 'quiz' && isChecked) {
             if (key === q.answer) {
                btnClass += "border-green-500 bg-green-50 dark:bg-green-900/20 ring-1 ring-green-500 ";
                badgeClass += "bg-green-500 text-white";
            } else if (isSel && key !== q.answer) {
                btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-500 ";
                badgeClass += "bg-red-500 text-white";
            } else {
                btnClass += "border-slate-200 dark:border-slate-600 opacity-60 ";
                badgeClass += "bg-slate-100 dark:bg-slate-700";
            }
        } else {
             if (isSel) {
                btnClass += "border-primary bg-indigo-50 dark:bg-primary/20 ring-1 ring-primary ";
                badgeClass += "bg-primary text-white";
            } else {
                btnClass += "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-primary/50 ";
                badgeClass += "bg-slate-100 dark:bg-slate-700";
            }
        }

        btn.className = btnClass;
        btn.disabled = (currentMode === 'quiz' && isChecked); 
        btn.innerHTML = `<span class="${badgeClass}">${key}</span><span class="text-lg ${isSel && !isChecked ? 'text-primary font-semibold' : 'dark:text-slate-300'}">${q.options[key]}</span>`;
        btn.onclick = () => { 
            if(!isPaused && !(currentMode === 'quiz' && isChecked)) { 
                userAnswers[q.id] = key;
                if (isOfflineNormalTest()) saveOfflineAttemptSnapshot('answer-selected');
                else console.info('[Quiz][answer][SUCCESS]', { quizId: currentQuizId, questionId: q.id, mode: currentMode });
                renderQuestion(); 
            }
        };
        quizEls.opts.appendChild(btn);
    });

    const existingCheckBtn = document.getElementById('check-answer-btn');
    if(existingCheckBtn) existingCheckBtn.remove();
    
    if (currentMode === 'quiz' && !isChecked) {
        const checkBtn = document.createElement('button');
        checkBtn.id = 'check-answer-btn';
        checkBtn.className = "w-full md:w-auto px-6 py-2.5 rounded-xl text-white font-medium bg-purple-600 shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
        checkBtn.innerHTML = '<i class="fa-solid fa-check-double mr-2"></i> Check Answer';
        checkBtn.disabled = !userAnswers[q.id];
        checkBtn.onclick = () => {
            checkedQuestions[q.id] = true;
            renderQuestion();
        };
        const footerDiv = document.querySelector('footer div.flex');
        if(quizEls.next) quizEls.next.classList.add('hidden');
        if(quizEls.finalSubmit) quizEls.finalSubmit.classList.add('hidden');
        if(footerDiv) footerDiv.appendChild(checkBtn);
    } else {
        if(quizEls.prev) quizEls.prev.disabled = currentIndex === 0;
        
        // Final Question Logic
        if (currentIndex === questions.length - 1) {
            if(quizEls.next) quizEls.next.classList.add('hidden');
            if(quizEls.finalSubmit) quizEls.finalSubmit.classList.remove('hidden');
        } else {
            if(quizEls.next) quizEls.next.classList.remove('hidden');
            if(quizEls.finalSubmit) quizEls.finalSubmit.classList.add('hidden');
        }
    }
    
    updateQuestionPalette();
    renderMath(quizEls.container);
    if (currentLanguage !== 'en') {
        applyQuestionLanguage(currentLanguage);
    }
    if (isOfflineNormalTest()) saveOfflineAttemptSnapshot('question-rendered');
    console.info('[Quiz][render-question][SUCCESS]', { questionId: q.id, index: currentIndex, mode: currentMode });
    } catch (error) {
        console.error('[Quiz][render-question][ERROR] Could not render current question.', { index: currentIndex, message: error && error.message });
    }
};


if(quizEls.clearBtn) {
    quizEls.clearBtn.onclick = () => {
        const qId = questions[currentIndex].id;
        delete userAnswers[qId];
        delete markedForReview[qId]; 
        renderQuestion();
    };
}

if(quizEls.markBtn) {
    quizEls.markBtn.onclick = () => {
        const qId = questions[currentIndex].id;
        markedForReview[qId] = !markedForReview[qId]; // Toggle mark status
        if (currentIndex < questions.length - 1) {
            currentIndex++;
        }
        renderQuestion();
    };
}

const triggerEndModal = () => {
    if(quizEls.endQuizModal) quizEls.endQuizModal.classList.remove('hidden');
    togglePause(true); 
};

if(quizEls.endQuizEarlyBtn) quizEls.endQuizEarlyBtn.onclick = triggerEndModal;
if(quizEls.finalSubmit) quizEls.finalSubmit.onclick = triggerEndModal;

if(quizEls.cancelSubmitModalBtn) {
    quizEls.cancelSubmitModalBtn.onclick = () => {
        if(quizEls.endQuizModal) quizEls.endQuizModal.classList.add('hidden');
        togglePause(false); // Resume timer
    };
}

if(quizEls.confirmSubmitModalBtn) {
    quizEls.confirmSubmitModalBtn.onclick = () => {
        if(quizEls.endQuizModal) quizEls.endQuizModal.classList.add('hidden');
        submitQuiz(false); 
    };
}


const startTimer = () => {
    clearInterval(timerInterval);
    if (isOfflineNormalTest() && offlineDeadlineAt) {
        timerInterval = setInterval(() => {
            if (isPaused) return;
            timeLeft = Math.max(0, Math.ceil((offlineDeadlineAt - Date.now()) / 1000));
            if (quizEls.time) quizEls.time.textContent = formatTime(timeLeft);
            if (timeLeft % 5 === 0) saveOfflineAttemptSnapshot('timer-checkpoint');
            if (timeLeft <= 0) {
                console.info('[Quiz][timer][SUCCESS] Offline Test Mode deadline reached; auto-submitting.');
                submitQuiz(true);
            }
        }, 1000);
        console.info('[Quiz][timer][SUCCESS] Deadline-based offline timer started.', { deadlineAt: offlineDeadlineAt });
        return;
    }
    timerInterval = setInterval(() => {
        if(!isPaused && timeLeft > 0) {
            timeLeft--;
            quizEls.time.textContent = formatTime(timeLeft);
        } else if(timeLeft <= 0) {
            submitQuiz(true);
        }
    }, 1000);
    console.info('[Quiz][timer][SUCCESS] Standard timer started.');
};

const togglePause = (state) => {
    try {
        if (!state && isOfflineNormalTest() && navigator.onLine) {
            console.warn('[Quiz][network-guard][ERROR] Resume blocked because internet is ON during Normal Test Mode.');
            alert('Internet connection is ON. For a fair offline Test Mode, turn internet OFF before resuming. Your answers are saved locally.');
            return;
        }
        if (isOfflineNormalTest() && offlineDeadlineAt) {
            if (state && !isPaused) offlinePauseStartedAt = Date.now();
            if (!state && isPaused && offlinePauseStartedAt) {
                offlineDeadlineAt += Math.max(0, Date.now() - offlinePauseStartedAt);
                offlinePauseStartedAt = null;
                saveOfflineAttemptSnapshot('timer-resumed');
            }
        }
        isPaused = state;
        if (isPaused) {
            if (isOfflineNormalTest()) saveOfflineAttemptSnapshot('timer-paused');
            clearInterval(timerInterval);
            if (quizEls.pause) quizEls.pause.classList.add('hidden');
            if (quizEls.resume) quizEls.resume.classList.remove('hidden');
            if (quizEls.pausedOverlay) quizEls.pausedOverlay.classList.remove('hidden');
        } else {
            startTimer();
            if (quizEls.pause) quizEls.pause.classList.remove('hidden');
            if (quizEls.resume) quizEls.resume.classList.add('hidden');
            if (quizEls.pausedOverlay) quizEls.pausedOverlay.classList.add('hidden');
        }
        console.info('[Quiz][pause][SUCCESS]', { paused: isPaused, mode: currentMode });
    } catch (error) {
        console.error('[Quiz][pause][ERROR] Could not change quiz pause state.', { requestedPaused: state, message: error && error.message });
    }
};

// Guard Normal Test Mode if connectivity returns mid-attempt. The local snapshot
// is saved before warning so the student's answers survive a refresh or retry.
window.addEventListener('online', () => {
    try {
        if (!isOfflineNormalTest() || !quizEls.container || quizEls.container.classList.contains('hidden') || (typeof quizActive === 'function' && !quizActive())) return;
        saveOfflineAttemptSnapshot('internet-enabled-during-test');
        if (!isPaused) togglePause(true);
        console.warn('[Quiz][network-guard][ERROR] Internet became available during Normal Test Mode; attempt paused.');
        alert('Internet is ON. Normal Test Mode has been paused and your answers are saved locally. Turn internet OFF, then press Resume to continue.');
    } catch (error) {
        console.error('[Quiz][network-guard][ERROR] Failed to handle internet reconnect during test.', { message: error && error.message });
        try { togglePause(true); } catch (pauseError) { console.error('[Quiz][network-guard][ERROR] Could not pause the test.', { message: pauseError && pauseError.message }); }
    }
});

window.addEventListener('offline', () => {
    console.info('[Quiz][network][SUCCESS] Browser reports internet connectivity is offline.');
});

function showPreQuizInitModal() {
    if (!preQuizEls.modal) {
        proctoringEnabled = false;
        if (quizEls.setupModal) quizEls.setupModal.classList.remove('hidden');
        return;
    }

    if (preQuizEls.consentCheckbox) preQuizEls.consentCheckbox.checked = false;
    if (preQuizEls.consentError) preQuizEls.consentError.classList.add('hidden');
    preQuizEls.modal.classList.remove('hidden');
}

if (preQuizEls.continueBtn) {
    preQuizEls.continueBtn.onclick = () => {
        const agreed = preQuizEls.consentCheckbox && preQuizEls.consentCheckbox.checked;
        if (!agreed) {
            if (preQuizEls.consentError) preQuizEls.consentError.classList.remove('hidden');
            return;
        }
        const modeInput = document.querySelector('input[name="proctor_selection_mode"]:checked');
        proctoringEnabled = modeInput ? modeInput.value === 'cbt' : true;

        preQuizEls.modal.classList.add('hidden');
        if (quizEls.setupModal) quizEls.setupModal.classList.remove('hidden');
    };
}

const TOKEN_PORTAL_URL = "/token.html";

const tokenUnlockEls = {
    modal: document.getElementById('token-unlock-modal'),
    quizTitle: document.getElementById('token-unlock-quiz-title'),
    input: document.getElementById('token-unlock-input'),
    error: document.getElementById('token-unlock-error'),
    verifyBtn: document.getElementById('token-unlock-verify-btn'),
    getLinkBtn: document.getElementById('token-unlock-getlink-btn'),
};

let tokenGateQuizId = null;
let tokenGateOnUnlocked = null;
const tokenUnlockSessionKey = (quizId) => `paidQuizUnlocked_${quizId}`;

function isQuizUnlockedInSession(quizId) {
    try { return sessionStorage.getItem(tokenUnlockSessionKey(quizId)) === '1'; }
    catch (e) { return false; }
}
function markQuizUnlockedInSession(quizId) {
    try { sessionStorage.setItem(tokenUnlockSessionKey(quizId), '1'); }
    catch (e) { /* sessionStorage unavailable — worst case the tab just asks again, not a hard failure */ }
}

function showTokenUnlockModal(quizId, quizTitle, onUnlocked) {
    tokenGateQuizId = quizId;
    tokenGateOnUnlocked = onUnlocked;

    if (tokenUnlockEls.quizTitle) tokenUnlockEls.quizTitle.textContent = quizTitle || 'This quiz';
    if (tokenUnlockEls.input) tokenUnlockEls.input.value = '';
    if (tokenUnlockEls.error) tokenUnlockEls.error.classList.add('hidden');
    if (tokenUnlockEls.getLinkBtn) {
        tokenUnlockEls.getLinkBtn.href = `${TOKEN_PORTAL_URL}?quizId=${encodeURIComponent(quizId)}`;
    }
    if (tokenUnlockEls.modal) tokenUnlockEls.modal.classList.remove('hidden');
    if (tokenUnlockEls.input) tokenUnlockEls.input.focus();
}

async function verifyAndConsumeToken(quizId, rawCode) {
    const code = String(rawCode || '').trim();
    if (!/^\d{6}$/.test(code)) {
        throw new Error('Enter the 6-digit token exactly as shown.');
    }

    const poolRef = db.collection('quiz_tokens').doc(quizId);
    const tokensCol = poolRef.collection('tokens');

    const candidateSnap = await tokensCol.where('code', '==', code).limit(1).get();
    if (candidateSnap.empty) {
        throw new Error('That token is invalid, already used, or not for this quiz.');
    }
    const tokenRef = candidateSnap.docs[0].ref;

    return db.runTransaction(async (t) => {
        const tokenDoc = await t.get(tokenRef);
        if (!tokenDoc.exists) {
            throw new Error('That token is invalid, already used, or not for this quiz.');
        }
        t.delete(tokenRef);
        t.set(poolRef, { usedCount: firebase.firestore.FieldValue.increment(1) }, { merge: true });
        return true;
    });
}

if (tokenUnlockEls.verifyBtn) {
    tokenUnlockEls.verifyBtn.onclick = async () => {
        if (!tokenGateQuizId) return;
        if (tokenUnlockEls.error) tokenUnlockEls.error.classList.add('hidden');

        tokenUnlockEls.verifyBtn.disabled = true;
        tokenUnlockEls.verifyBtn.textContent = 'Verifying...';
        try {
            await verifyAndConsumeToken(tokenGateQuizId, tokenUnlockEls.input.value);
            markQuizUnlockedInSession(tokenGateQuizId);
            if (tokenUnlockEls.modal) tokenUnlockEls.modal.classList.add('hidden');

            const proceed = tokenGateOnUnlocked;
            tokenGateQuizId = null;
            tokenGateOnUnlocked = null;
            if (typeof proceed === 'function') proceed();
        } catch (e) {
            if (tokenUnlockEls.error) {
                tokenUnlockEls.error.textContent = e.message;
                tokenUnlockEls.error.classList.remove('hidden');
            }
        } finally {
            tokenUnlockEls.verifyBtn.disabled = false;
            tokenUnlockEls.verifyBtn.textContent = 'Verify Token';
        }
    };
}

if (tokenUnlockEls.input) {
    // Digits only, 6 max — keeps stray characters from ever reaching the query.
    tokenUnlockEls.input.addEventListener('input', () => {
        tokenUnlockEls.input.value = tokenUnlockEls.input.value.replace(/\D/g, '').slice(0, 6);
    });
    tokenUnlockEls.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && tokenUnlockEls.verifyBtn) tokenUnlockEls.verifyBtn.click();
    });
}

const loadQuiz = async (uid) => {
    quizEls.loader.classList.remove('hidden');
    currentRequestedQuizId = uid;
    const offlineSnapshot = readOfflineAttemptSnapshot(uid);
    if (offlineSnapshot && ['in_progress', 'submitted_pending_sync'].includes(offlineSnapshot.status || 'in_progress')) {
        const restored = restoreOfflineAttemptSnapshot(offlineSnapshot);
        if (restored) return;
    }

    let doc = await db.collection('quizzes').doc(uid).get();

    if (!doc.exists) {
        try {
            const aliasDoc = await db.collection('quiz_aliases').doc(uid).get();
            if (aliasDoc.exists && aliasDoc.data().quizId) {
                uid = aliasDoc.data().quizId; // switch to the real doc id for everything below
                doc = await db.collection('quizzes').doc(uid).get();
            }
        } catch (e) {
            console.warn('Alias lookup failed:', e);
        }
    }

    if(!doc.exists) {
        document.getElementById('error-text').textContent = "Quiz not found or deleted.";
        document.getElementById('error-message-area').classList.remove('hidden');
        return;
    }

    currentQuizId = uid;

    const data = doc.data();

    if (data.isPaid === true && !isQuizUnlockedInSession(uid)) {
        quizEls.loader.classList.add('hidden');
        showTokenUnlockModal(uid, data.title, () => loadQuiz(uid));
        return;
    }

    quizEls.title.textContent = data.title;
    quizEls.setupTitle.textContent = data.title;
    allQuestions = data.questions.map((q,i)=>({...q, id:`Q${i+1}`}));

    currentQuizIsTest = data.test_quiz === true;

    const urlParams = new URLSearchParams(window.location.search);
    const retryModeParam = urlParams.get('mode'); // 'retry-incorrect' | 'retry-unattempted' | null
    let retryIncorrectActive = false;
    let retryModeLabel = '';
    if (retryModeParam === 'retry-incorrect' || retryModeParam === 'retry-unattempted') {
        try {
            const retryConfig = JSON.parse(sessionStorage.getItem('retryQuizConfig') || 'null');
            if (retryConfig && retryConfig.mode === retryModeParam && retryConfig.quizId === uid
                && Array.isArray(retryConfig.questionIds) && retryConfig.questionIds.length > 0) {
                const wantedIds = new Set(retryConfig.questionIds);
                const filtered = allQuestions.filter(q => wantedIds.has(q.id));
                if (filtered.length > 0) {
                    allQuestions = filtered;
                    retryIncorrectActive = true;
                    retryModeLabel = retryModeParam === 'retry-incorrect' ? 'Practice Incorrect' : 'Practice Unattempted';
                }
            }
        } catch (e) {
            console.warn("Could not parse retryQuizConfig, falling back to full quiz:", e);
        } finally {
            sessionStorage.removeItem('retryQuizConfig');
        }
    }

    quizEls.setupTitle.textContent = retryIncorrectActive
        ? `${data.title} — ${retryModeLabel} (${allQuestions.length} Qs)`
        : data.title;

    quizEls.setupSet.innerHTML = '';
    const setSize = 20;
    const totalQ = allQuestions.length;
    for (let i = 0; i < totalQ; i += setSize) {
        const start = i + 1;
        const end = Math.min(i + setSize, totalQ);
        const option = document.createElement('option');
        option.value = `${i}-${end}`; 
        option.textContent = `Questions ${start} - ${end}`;
        quizEls.setupSet.appendChild(option);
    }
    if (totalQ > setSize) {
        const allOpt = document.createElement('option');
        allOpt.value = `0-${totalQ}`;
        allOpt.textContent = `All Questions (${totalQ})`;
        quizEls.setupSet.appendChild(allOpt);
    }

    quizEls.setupTimer.innerHTML = '';
    const maxDurationMin = data.durationMinutes || Math.ceil(totalQ * 1); 

    if (currentQuizIsTest) {
        const fixedMin = data.durationMinutes || DEFAULT_TEST_MODE_MINUTES_FALLBACK;
        lockedTestDurationMinutes = fixedMin;
        const lockedOpt = document.createElement('option');
        lockedOpt.value = fixedMin;
        lockedOpt.textContent = `${fixedMin} Minutes (Fixed — Test Mode)`;
        lockedOpt.selected = true;
        quizEls.setupTimer.appendChild(lockedOpt);
        quizEls.setupTimer.disabled = true;
        quizEls.setupTimer.classList.add('opacity-60', 'cursor-not-allowed');
    } else {
        for (let t = 5; t <= maxDurationMin; t += 5) {
            const option = document.createElement('option');
            option.value = t;
            option.textContent = `${t} Minutes`;
            if (t === 20 || t === maxDurationMin) option.selected = true; 
            quizEls.setupTimer.appendChild(option);
        }
        if (maxDurationMin % 5 !== 0) {
             const maxOpt = document.createElement('option');
             maxOpt.value = maxDurationMin;
             maxOpt.textContent = `${maxDurationMin} Minutes (Max)`;
             maxOpt.selected = true;
             quizEls.setupTimer.appendChild(maxOpt);
        }
        quizEls.setupTimer.disabled = false;
        quizEls.setupTimer.classList.remove('opacity-60', 'cursor-not-allowed');
        lockedTestDurationMinutes = null;
    }

    const modeBlock = document.getElementById('mode-select-block');
    const lockedBanner = document.getElementById('test-mode-locked-banner');
    if (currentQuizIsTest) {
        if (modeBlock) modeBlock.classList.add('hidden');
        if (lockedBanner) { lockedBanner.classList.remove('hidden'); lockedBanner.classList.add('flex'); }
        const testRadio = document.querySelector('input[name="quiz_mode"][value="test"]');
        const quizRadio = document.querySelector('input[name="quiz_mode"][value="quiz"]');
        if (testRadio) testRadio.checked = true;
        if (quizRadio) quizRadio.disabled = true;
    } else {
        if (modeBlock) modeBlock.classList.remove('hidden');
        if (lockedBanner) { lockedBanner.classList.add('hidden'); lockedBanner.classList.remove('flex'); }
        const quizRadio = document.querySelector('input[name="quiz_mode"][value="quiz"]');
        if (quizRadio) quizRadio.disabled = false;
    }

    const prog = await db.collection('user_progress').doc(CURRENT_USER_ID).collection('saved_quizzes').doc(uid).get();
    
    quizEls.loader.classList.add('hidden');
    
    let discardQuizModeRefresh = false;
    try {
        discardQuizModeRefresh = sessionStorage.getItem('quiz_refresh_discard_' + (uid || 'session')) === '1';
        if (discardQuizModeRefresh) sessionStorage.removeItem('quiz_refresh_discard_' + (uid || 'session'));
    } catch (error) {
        console.error('[Quiz][refresh-policy][ERROR] Could not read Quiz Mode refresh marker.', { message: error && error.message });
    }
    if(prog.exists && !discardQuizModeRefresh) {
        quizEls.resumeModal.classList.remove('hidden');
        document.getElementById('btn-resume-attempt').onclick = () => {
            const s = prog.data();
            questions = allQuestions;
            currentIndex = s.currentIndex; 
            timeLeft = s.timeLeft; 
            quizStartDurationSeconds = typeof s.quizStartDurationSeconds === 'number' ? s.quizStartDurationSeconds : s.timeLeft;
            userAnswers = s.userAnswers;
            
            if(s.visitedQuestions) visitedQuestions = s.visitedQuestions;
            if(s.markedForReview) markedForReview = s.markedForReview;
            proctoringEnabled = !!s.proctoringEnabled;

            quizEls.resumeModal.classList.add('hidden');

            if (proctoringEnabled && proctorEls.consentModal) {
                pendingResume = true;
                if (proctorEls.consentError) proctorEls.consentError.classList.add('hidden');
                proctorEls.consentModal.classList.remove('hidden');
            } else {
                startQuizSession();
            }
        };
        document.getElementById('btn-restart-attempt').onclick = async () => {
            await prog.ref.delete(); 
            quizEls.resumeModal.classList.add('hidden');
            showPreQuizInitModal();
        };
    } else {
        if (discardQuizModeRefresh) console.info('[Quiz][refresh-policy][SUCCESS] Quiz Mode refresh state will not be restored; existing Firebase records were left untouched.');
        showPreQuizInitModal();
    }

    quizEls.startBtn.onclick = () => {
        const modeInput = document.querySelector('input[name="quiz_mode"]:checked');
        pendingStartConfig = {
            mode: currentQuizIsTest ? 'test' : (modeInput ? modeInput.value : 'test'),
            selectedTime: currentQuizIsTest
                ? (lockedTestDurationMinutes || DEFAULT_TEST_MODE_MINUTES_FALLBACK)
                : parseInt(quizEls.setupTimer.value, 10),
            rangeVal: quizEls.setupSet.value
        };

        if (proctoringEnabled && proctorEls.consentModal) {
            if (quizEls.setupModal) quizEls.setupModal.classList.add('hidden');
            proctorEls.consentModal.classList.remove('hidden');
            if (proctorEls.consentError) proctorEls.consentError.classList.add('hidden');
        } else {
            beginSelectedQuiz();
        }
    };
};

const beginSelectedQuiz = async () => {
    const cfg = pendingStartConfig;
    if (!cfg) {
        console.error('[Quiz][start][ERROR] Missing selected quiz configuration.');
        return;
    }
    currentMode = cfg.mode;
    if (currentMode === 'test' && !proctoringEnabled && navigator.onLine) {
        try {
            const [prepStart, prepEnd] = String(cfg.rangeVal || '0-20').split('-').map(Number);
            const prepQuestions = allQuestions.slice(prepStart, prepEnd);
            console.info('[Quiz][preparation][SUCCESS] Online preparation started before offline Test Mode.', { questionCount: prepQuestions.length, language: currentLanguage });
            await Promise.all([
                prepareQuizImages(prepQuestions),
                currentLanguage !== 'en' ? preCacheQuestionTranslations(currentLanguage, prepQuestions) : Promise.resolve({ cached: 0, failed: 0 })
            ]);
            await showQuizPreparationCountdown(10);
        } catch (error) {
            console.error('[Quiz][preparation][ERROR] Online pre-test preparation encountered an error; continuing to offline reminder.', { message: error && error.message });
        }
        console.warn('[Quiz][start][INFO] Test Mode requires disconnecting the internet before starting.');
        alert('Preparation finished. Now disconnect your internet, then press Start Test again to begin.');
        return;
    }
    if (currentMode === 'quiz' && !navigator.onLine) {
        console.warn('[Quiz][start][INFO] Quiz Mode requires an internet connection.');
        alert('Quiz Mode needs internet because it shows the correct answer immediately. Please reconnect and try again.');
        return;
    }
    const [start, end] = cfg.rangeVal.split('-').map(Number);
    const selectedQuestions = allQuestions.slice(start, end);
    if (!proctoringEnabled) {
        try {
            await Promise.all([
                prepareQuizImages(selectedQuestions),
                currentLanguage !== 'en' && navigator.onLine
                    ? preCacheQuestionTranslations(currentLanguage, selectedQuestions)
                    : Promise.resolve({ cached: 0, failed: 0 })
            ]);
            await showQuizPreparationCountdown(10);
        } catch (error) {
            console.error('[Quiz][preparation][ERROR] Quiz preparation failed; attempting to continue with available assets.', { message: error && error.message });
        }
    } else {
        console.info('[Quiz][preparation][SUCCESS] Existing proctoring/CBT startup flow preserved; preparation overlay skipped.');
    }
    timeLeft = cfg.selectedTime * 60;
    quizStartDurationSeconds = timeLeft; // remember the real starting duration for result.js's Total Time calc

    questions = selectedQuestions;
    currentIndex = 0;
    userAnswers = {};
    visitedQuestions = {};
    markedForReview = {};
    checkedQuestions = {};

    if (currentMode === 'test' && !proctoringEnabled) {
        try {
            const probeKey = '__neelaxmi_offline_storage_probe__';
            localStorage.setItem(probeKey, 'ok');
            localStorage.removeItem(probeKey);
        } catch (error) {
            console.error('[Quiz][start][ERROR] Local storage unavailable; refusing to start an unsavable offline attempt.', { message: error && error.message });
            alert('This browser cannot save your test locally. Please enable site storage or use another browser before starting.');
            return;
        }
        offlineAttemptId = (window.crypto && typeof window.crypto.randomUUID === 'function')
            ? window.crypto.randomUUID()
            : 'attempt-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
        offlineAttemptStorageKey = offlineAttemptKey(currentQuizId);
        offlineAttemptStartedAt = Date.now();
        offlineDeadlineAt = Date.now() + timeLeft * 1000;
        offlinePauseStartedAt = null;
        const saved = saveOfflineAttemptSnapshot('attempt-start');
        if (!saved) {
            alert('The browser could not save your test locally, so the attempt was not started. Please free browser storage and try again.');
            return;
        }
        console.info('[Quiz][start][SUCCESS] Offline Test Mode attempt initialized.', { quizId: currentQuizId, attemptId: offlineAttemptId, questionCount: questions.length });
    } else {
        console.info('[Quiz][start][SUCCESS] Online quiz attempt initialized.', { quizId: currentQuizId, mode: currentMode });
    }

    if (typeof window.setQuizAttemptLanguageLock === 'function') window.setQuizAttemptLanguageLock(true);

    // Fresh violation state for this attempt
    violationCount = 0;
    violationLog = [];
    persistViolationState();

    // Fresh proctoring-detection state for this attempt
    noFaceSince = null;

    startQuizSession();
};


if (proctorEls.cancelBtn) {
    proctorEls.cancelBtn.onclick = () => {
        stopProctoring();
        if (proctorEls.consentModal) proctorEls.consentModal.classList.add('hidden');
        if (pendingResume) {
            pendingResume = false;
            if (quizEls.resumeModal) quizEls.resumeModal.classList.remove('hidden');
        } else if (quizEls.setupModal) {
            quizEls.setupModal.classList.remove('hidden');
        }
    };
}

function resetEnableBtn() {
    proctorEls.enableBtn.disabled = false;
    proctorEls.enableBtn.innerHTML = '<i class="fa-solid fa-camera mr-2"></i>Enable Camera & Start Test';
}

function hideProctorFailureUI() {
    if (proctorEls.consentError) proctorEls.consentError.classList.add('hidden');
    if (proctorEls.fallbackNormalBtn) proctorEls.fallbackNormalBtn.classList.add('hidden');
}

if (proctorEls.fallbackNormalBtn) {
    proctorEls.fallbackNormalBtn.onclick = () => {
        stopProctoring();
        proctoringEnabled = false;
        if (proctorEls.consentModal) proctorEls.consentModal.classList.add('hidden');
        hideProctorFailureUI();

        if (pendingResume) {
            pendingResume = false;
            startQuizSession();
        } else {
            beginSelectedQuiz();
        }
    };
}

if (proctorEls.enableBtn) {
    proctorEls.enableBtn.onclick = async () => {
        proctorEls.enableBtn.disabled = true;
        hideProctorFailureUI();
        proctorEls.enableBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Requesting camera access...';

        try {
            if (!proctorStream) await setupProctorCamera();

            warmUpProctoringAssets();
            requestFullscreenMode();
            proctorEls.consentModal.classList.add('hidden');
            hideProctorFailureUI();
            resetEnableBtn();

            if (pendingResume) {
                pendingResume = false;
                startQuizSession();
            } else {
                beginSelectedQuiz();
            }
        } catch (err) {
            console.error('Camera setup failed:', err);

            if (proctorStream) {
                proctorStream.getTracks().forEach(t => t.stop());
                proctorStream = null;
            }

            if (proctorEls.consentError) {
                proctorEls.consentError.textContent =
                    'Camera access is required to start this proctored test. Please allow camera permission in your browser and try again — or continue below without the camera.';
                proctorEls.consentError.classList.remove('hidden');
            }

            if (proctorEls.fallbackNormalBtn) proctorEls.fallbackNormalBtn.classList.remove('hidden');

            resetEnableBtn();
        }
    };
}

const startQuizSession = () => {
    document.querySelectorAll('.fixed').forEach(m => { if(m.id!=='loading-screen' && m.id!=='proctor-widget') m.classList.add('hidden') });
    
    quizEls.container.classList.remove('hidden');
    quizEls.time.textContent = formatTime(timeLeft);
    const paletteToggleBtn = document.getElementById('palette-toggle-btn');
    const paletteAside = document.getElementById('question-palette');
    if (currentQuizIsTest) {
        if (paletteToggleBtn) paletteToggleBtn.classList.add('hidden');
        if (paletteAside) paletteAside.classList.add('hidden');
    } else {
        if (paletteToggleBtn) paletteToggleBtn.classList.remove('hidden');
        if (paletteAside) paletteAside.classList.remove('hidden');
    }

    renderQuestion();
    startTimer();
    
    if (typeof setupAntiCheatingMeasures === 'function') {
        setupAntiCheatingMeasures();
    }

    restoreViolationState();
    if (proctoringEnabled) {
        if (proctorEls.widget) proctorEls.widget.classList.remove('hidden');
        startFaceDetectionLoop();
        if (faceModel) {
            setProctorStatus('ok', 'Proctoring Active');
        } else {
            setProctorStatus('warn', 'Camera Recording (AI loading…)');
            watchForFaceModelReady();
        }
    } else if (proctorEls.widget) {
        proctorEls.widget.classList.add('hidden');
    }
    
    history.pushState(null, null, location.href);
    window.onpopstate = () => {
        if(!document.getElementById('result-box').classList.contains('hidden')) {
             window.location.replace('/index.html');
        } else { 
            togglePause(true); 
            if(quizEls.exitModal) quizEls.exitModal.classList.remove('hidden'); 
            history.pushState(null, null, location.href); 
        }
    };
};

const saveProgress = async () => {
    await db.collection('user_progress').doc(CURRENT_USER_ID).collection('saved_quizzes').doc(currentQuizId).set({
        currentIndex, 
        timeLeft, 
        quizStartDurationSeconds, // so a resumed attempt still knows its real total duration
        userAnswers, 
        visitedQuestions,
        markedForReview,
        proctoringEnabled,
        lastSaved: firebase.firestore.FieldValue.serverTimestamp()
    });
};

if(quizEls.prev) quizEls.prev.onclick = () => { if(currentIndex>0) { currentIndex--; renderQuestion(); }};
if(quizEls.next) quizEls.next.onclick = () => { 
    if(currentIndex<questions.length-1) { 
        currentIndex++; 
        renderQuestion(); 
    }
};

if(quizEls.pause) quizEls.pause.onclick = () => togglePause(true);
if(quizEls.resume) quizEls.resume.onclick = () => togglePause(false);

if(quizEls.saveBtn) {
    quizEls.saveBtn.onclick = () => {
         togglePause(true);
         quizEls.exitModal.classList.remove('hidden');
         history.pushState(null, null, location.href);
    };
}

if(document.getElementById('modal-cancel')) {
    document.getElementById('modal-cancel').onclick = () => { 
        quizEls.exitModal.classList.add('hidden'); 
        togglePause(false); 
    };
}
if(document.getElementById('modal-save')) {
    document.getElementById('modal-save').onclick = async () => {
        stopProctoring();
        if (isOfflineNormalTest()) {
            window.__quizIntentionalExit = true;
            saveOfflineAttemptSnapshot('save-and-exit');
            console.info('[Quiz][save-exit][SUCCESS] Offline attempt kept locally for later recovery.', { quizId: currentQuizId, attemptId: offlineAttemptId });
            window.onpopstate = null;
            window.location.replace('/index.html');
            return;
        }
        try {
            await saveProgress();
            window.__quizIntentionalExit = true;
            console.info('[Quiz][save-exit][SUCCESS] Progress saved to Firebase.', { quizId: currentQuizId });
            window.onpopstate = null;
            window.location.replace('/index.html');
        } catch (error) {
            console.error('[Quiz][save-exit][ERROR] Could not save progress.', { quizId: currentQuizId, message: error && error.message });
            alert('Progress could not be saved. Please check your connection and try again.');
        }
    };
}

window.toggleModeDescription = (mode) => {
    console.log("Selected Mode:", mode);
};

const themeEls = {
    themeToggle: document.getElementById('theme-toggle'),
    sunIcon: document.getElementById('sun-icon'),
    moonIcon: document.getElementById('moon-icon'),
};
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if(themeEls.sunIcon) themeEls.sunIcon.classList.remove('hidden');
        if(themeEls.moonIcon) themeEls.moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if(themeEls.sunIcon) themeEls.sunIcon.classList.add('hidden');
        if(themeEls.moonIcon) themeEls.moonIcon.classList.remove('hidden');
    }
}
if(themeEls.themeToggle) {
    themeEls.themeToggle.onclick = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        initTheme();
    };
}
initTheme();

const quizContainer = document.getElementById('quiz-container'); 

function showAntiCheatAlert(message, isCritical = false) {
    console.warn(`Anti-Cheat Alert: ${message}`);
    
    const alertId = 'anticheat-alert';
    const existingAlert = document.getElementById(alertId);
    if (existingAlert) existingAlert.remove();
    
    const alertEl = document.createElement('div');
    alertEl.id = alertId;
    alertEl.className = `fixed top-0 left-0 right-0 p-4 text-center z-[1000] font-bold shadow-lg transition-transform duration-300 transform 
        ${isCritical ? 'bg-red-600 text-white' : 'bg-yellow-400 text-slate-800'}`;
    alertEl.textContent = message;
    
    document.body.appendChild(alertEl);
    
    if (!isCritical) {
        setTimeout(() => {
            if (document.getElementById(alertId)) {
                document.getElementById(alertId).remove();
            }
        }, 4000);
    }
}


function quizActive() {
    return !!(quizContainer && !quizContainer.classList.contains('hidden') &&
        document.getElementById('result-box') &&
        document.getElementById('result-box').classList.contains('hidden'));
}

function violationStorageKey() {
    return 'quiz_violations_' + (typeof currentQuizId !== 'undefined' && currentQuizId ? currentQuizId : 'session');
}

function persistViolationState() {
    try {
        sessionStorage.setItem(violationStorageKey(), JSON.stringify({ violationCount, violationLog }));
    } catch (e) { /* sessionStorage unavailable — fail silently, still works in-memory */ }
}

function restoreViolationState() {
    try {
        const raw = sessionStorage.getItem(violationStorageKey());
        if (raw) {
            const saved = JSON.parse(raw);
            violationCount = saved.violationCount || 0;
            violationLog = saved.violationLog || [];
        }
    } catch (e) { /* ignore */ }
}

window.registerViolation = function (type, message) {
    if (!quizActive() || violationModalOpen) return;

    violationCount++;
    violationLog.push({ type, message, time: new Date().toISOString() });
    persistViolationState();

    togglePause(true);

    if (violationCount > MAX_VIOLATIONS) {
        stopFaceDetectionLoop();
        showAntiCheatAlert(`Maximum warnings (${MAX_VIOLATIONS}) exceeded — your quiz is being auto-submitted.`, true);
        setTimeout(() => submitQuiz(true), 1200);
        return;
    }

    violationModalOpen = true;
    const warningsLeft = MAX_VIOLATIONS - violationCount;

    if (quizEls.warningBanner) {
        quizEls.warningBanner.classList.remove('hidden');
        if (quizEls.warningsLeftCount) quizEls.warningsLeftCount.textContent = warningsLeft;
        if (quizEls.warningText) quizEls.warningText.textContent = message;
    }

    const overlay = document.getElementById('violation-overlay');
    const msg = document.getElementById('violation-msg');
    if (msg) msg.textContent = `${message} You have ${warningsLeft} warning(s) left before your quiz is auto-submitted.`;
    if (overlay) overlay.classList.remove('hidden');

    const closeBtn = document.getElementById('close-violation');
    if (closeBtn) {
        closeBtn.onclick = () => {
            overlay.classList.add('hidden');
            violationModalOpen = false;
            togglePause(false);
            noFaceSince = null;
            startFaceDetectionLoop();
            if (type === 'fullscreen-exit') requestFullscreenMode();
        };
    }
};

function handleVisibilityChange() {
    if (document.hidden && proctoringEnabled) {
        window.registerViolation('tab-switch', 'Tab switching / window minimizing detected!');
    }
}
async function setupProctorCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser.');
    }
    proctorStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 160 }, height: { ideal: 120 }, facingMode: 'user' },
        audio: false
    });
    if (proctorEls.video) {
        proctorEls.video.srcObject = proctorStream;
        await proctorEls.video.play().catch(() => {});
    }
}



function waitForGlobal(name, timeoutMs) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        (function poll() {
            if (typeof window[name] !== 'undefined') return resolve();
            if (Date.now() - start >= timeoutMs) {
                return reject(new Error(`${name}-not-loaded`));
            }
            setTimeout(poll, 150);
        })();
    });
}

async function loadFaceModel(remainingMs = 12000) {
    if (faceModel) return faceModel;
    console.log("Loading face-api tiny face detector...");
    await waitForGlobal('faceapi', remainingMs);
    await faceapi.nets.tinyFaceDetector.loadFromUri('/vendor/models');

    faceModel = true; 
    console.log("Face model loaded successfully.");
    return faceModel;
}

function setProctorStatus(state, text) {
    if (proctorEls.statusText) proctorEls.statusText.textContent = text;
    if (proctorEls.statusDot) {
        proctorEls.statusDot.className = 'w-2 h-2 rounded-full shrink-0 animate-pulse ' +
            (state === 'ok' ? 'bg-emerald-400' : 'bg-red-500');
    }
}

let faceModelWatcherInterval = null;
function watchForFaceModelReady() {
    if (faceModelWatcherInterval) return;
    faceModelWatcherInterval = setInterval(() => {
        if (faceModel) {
            clearInterval(faceModelWatcherInterval);
            faceModelWatcherInterval = null;
            if (proctoringEnabled && quizActive()) {
                startFaceDetectionLoop();
                setProctorStatus('ok', 'Proctoring Active');
            }
        }
    }, 1500);
}

function startFaceDetectionLoop() {
    stopFaceDetectionLoop();
    if (!proctoringEnabled || !faceModel || !proctorEls.video) return;

    proctorDetectionTimer = setInterval(async () => {
        if (violationModalOpen || isPaused || !quizActive()) return;
        if (proctorEls.video.readyState < 2) return;

        try {
            const detection = await faceapi.detectSingleFace(
                proctorEls.video,
                new faceapi.TinyFaceDetectorOptions()
            );
            handleFaceDetectionResult(!!detection);
        } catch (err) {
            console.warn('Face detection frame skipped:', err);
        }
    }, 800);
}

function stopFaceDetectionLoop() {
    if (proctorDetectionTimer) clearInterval(proctorDetectionTimer);
    proctorDetectionTimer = null;
}

const FACE_STABILITY_LIMIT_MS = 4000;

function handleFaceDetectionResult(faceFound) {
    if (!faceFound) {
        if (!noFaceSince) noFaceSince = Date.now();
        const elapsedMs = Date.now() - noFaceSince;
        const secondsLeft = Math.max(0, Math.ceil((FACE_STABILITY_LIMIT_MS - elapsedMs) / 1000));
        setProctorStatus('warn', `No face detected (${secondsLeft}s)`);

        if (elapsedMs >= FACE_STABILITY_LIMIT_MS) {
            noFaceSince = null;
            window.registerViolation('no-face', 'Eyes or face not detected. Please stay focused.');
        }
    } else {
        noFaceSince = null;
        setProctorStatus('ok', 'Proctoring Active');
    }
}

function stopProctoring() {
    stopFaceDetectionLoop();
    if (proctorStream) {
        proctorStream.getTracks().forEach(t => t.stop());
        proctorStream = null;
    }
}
window.stopProctoring = stopProctoring; // exposed for result.js to call on final submit

// ============================================================
// FULLSCREEN ENFORCEMENT
// ============================================================

function requestFullscreenMode() {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (req) req.call(el).catch(() => {});
}

function isInFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

function handleFullscreenChange() {
    if (proctoringEnabled && !isInFullscreen() && quizActive() && !violationModalOpen) {
        window.registerViolation('fullscreen-exit', 'You exited fullscreen mode.');
    }
}
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);
window.addEventListener('beforeunload', (event) => {
    stopProctoring();
    if (window.__quizIntentionalExit) {
        console.info('[Quiz][refresh-policy][SUCCESS] Intentional exit detected; preserving the selected save/exit behavior.');
        return;
    }
    if (isOfflineNormalTest() && quizActive()) {
        saveOfflineAttemptSnapshot('before-unload');
        event.preventDefault();
        event.returnValue = '';
        return '';
    }
    if (currentMode === 'quiz' && !proctoringEnabled && quizActive()) {
        console.warn('[Quiz][refresh-policy][INFO] Quiz Mode refresh warning requested; if navigation proceeds, this active session will not be restored.');
        event.preventDefault();
        event.returnValue = '';
        return '';
    }
});
window.addEventListener('pagehide', () => {
    if (window.__quizIntentionalExit || currentMode !== 'quiz' || proctoringEnabled || !quizActive()) return;
    try {
        sessionStorage.setItem('quiz_refresh_discard_' + (currentQuizId || 'session'), '1');
        console.info('[Quiz][refresh-policy][SUCCESS] Quiz Mode navigation confirmed; active session will not be restored. Existing Firebase records were not deleted.');
    } catch (error) {
        console.error('[Quiz][refresh-policy][ERROR] Could not store Quiz Mode refresh marker.', { message: error && error.message });
    }
});
document.addEventListener('keydown', (e) => {
    if (!quizActive()) return;
    const key = e.key ? e.key.toLowerCase() : '';
    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    const blockedClipboard = ctrlOrCmd && ['c', 'v', 'x', 'a', 'p', 's', 'u'].includes(key);
    const blockedDevTools = (ctrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(key)) || key === 'f12';
    const blockedPrintScreen = key === 'printscreen';

    if (blockedClipboard || blockedDevTools || blockedPrintScreen) {
        e.preventDefault();
        e.stopPropagation();
        showAntiCheatAlert('This keyboard shortcut is disabled during the test.', false);
    }
});

if (quizEls.viewLastBtn) {
    quizEls.viewLastBtn.onclick = async () => {
        if (!CURRENT_USER_ID || !currentQuizId) return;

        const originalText = quizEls.viewLastBtn.innerHTML;
        quizEls.viewLastBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        quizEls.viewLastBtn.disabled = true;

        try {
            const snapshot = await db.collection('user_results')
                .doc(CURRENT_USER_ID)
                .collection('attempts')
                .where('quizId', '==', currentQuizId)
                .orderBy('timestamp', 'desc')
                .limit(1)
                .get();

            if (snapshot.empty) {
                alert("No previous results found for this quiz.");
                quizEls.viewLastBtn.innerHTML = originalText;
                quizEls.viewLastBtn.disabled = false;
                return;
            }

            const lastAttemptId = snapshot.docs[0].id;
            
            if(quizEls.setupModal) quizEls.setupModal.classList.add('hidden');
            if(quizEls.container) quizEls.container.classList.add('hidden');

            const resBox = document.getElementById('result-box');
            if(resBox) resBox.classList.remove('hidden'); 

            if (typeof loadAttemptDetails === 'function') {
                loadAttemptDetails(lastAttemptId);
            } else {
                console.error("Critical: loadAttemptDetails function not found in result.js");
            }

        } catch (e) {
            console.error("Error redirecting to result:", e);
            alert("Could not load result. Please ensure the Database Index is created.");
        } finally {
            quizEls.viewLastBtn.innerHTML = originalText;
            quizEls.viewLastBtn.disabled = false;
        }
    };
}

let antiCheatMeasuresInstalled = false;
function setupAntiCheatingMeasures() {
    if (antiCheatMeasuresInstalled) return; // avoid stacking duplicate listeners across attempts
    antiCheatMeasuresInstalled = true;

    document.addEventListener('contextmenu', e => { if (quizActive()) e.preventDefault(); });

    document.addEventListener('copy', (e) => {
        if (!quizActive()) return;
        e.preventDefault();
        showAntiCheatAlert("Copying is prohibited!", true);
    });

    document.addEventListener('paste', (e) => {
        if (!quizActive()) return;
        e.preventDefault();
        showAntiCheatAlert("Pasting is prohibited!", true);
    });

    document.addEventListener('cut', (e) => {
        if (!quizActive()) return;
        e.preventDefault();
        showAntiCheatAlert("Cutting is prohibited!", true);
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    window.addEventListener('keyup', (e) => {
        if (!quizActive()) return;
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('').catch(() => {});
            showAntiCheatAlert("Screenshots are discouraged.", true);
        }
    });
}

window.openImageZoom = function(src) {
    let modal = document.getElementById('img-zoom-modal');
    
    if (!modal) {
        const modalHtml = `
        <div id="img-zoom-modal" class="fixed inset-0 z-[10000] hidden bg-black/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div class="absolute top-4 right-4 flex gap-3 z-[10001]">
                <button id="z-down" title="Download" class="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"><i class="fa-solid fa-download"></i></button>
                
                <button id="z-rotate" title="Rotate" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-rotate"></i></button>
                
                <button id="z-in" title="Zoom In" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-plus"></i></button>
                <button id="z-out" title="Zoom Out" class="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"><i class="fa-solid fa-minus"></i></button>
                
                <button onclick="closeZoomModal()" class="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div class="w-full h-full flex items-center justify-center overflow-hidden">
                <img id="img-zoom-target" src="" class="transition-transform duration-200" style="transform: scale(1) rotate(0deg);">
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('img-zoom-modal');
        
        let currentScale = 1;
        let currentRotation = 0;

        const update = () => {
            document.getElementById('img-zoom-target').style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
        };

        document.getElementById('z-in').onclick = () => { currentScale += 0.2; update(); };
        document.getElementById('z-out').onclick = () => { if(currentScale > 0.5) currentScale -= 0.2; update(); };

        document.getElementById('z-rotate').onclick = () => { 
            currentRotation += 90; 
            update(); 
        };

        document.getElementById('z-down').onclick = () => {
            const link = document.createElement('a');
            link.href = document.getElementById('img-zoom-target').src;
            link.download = 'quiz-image.jpg';
            link.click();
        };
    }

    const targetImg = document.getElementById('img-zoom-target');
    targetImg.src = src;
    targetImg.style.transform = "scale(1) rotate(0deg)"; 
    modal.classList.remove('hidden');
};

window.closeZoomModal = function() {
    document.getElementById('img-zoom-modal').classList.add('hidden');
};