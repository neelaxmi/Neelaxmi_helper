/* Normal Test Mode local attempt storage.
 * Stores only the selected question text/options and student state.
 * Correct-answer keys are deliberately excluded from this local record.
 */
(function () {
    'use strict';

    const DB_NAME = 'neelaxmi-normal-test-attempts';
    const DB_VERSION = 1;
    const STORE_NAME = 'attempts';
    let dbPromise = null;

    function logSuccess(action, details = {}) {
        console.log('[NormalTestOffline][SUCCESS]', action, details);
    }

    function logError(action, error, details = {}) {
        console.error('[NormalTestOffline][ERROR]', action, {
            message: error && error.message ? error.message : String(error || 'Unknown error'),
            ...details
        });
    }

    function openDatabase() {
        if (!('indexedDB' in window)) {
            const error = new Error('This browser does not support IndexedDB local attempt storage.');
            logError('openDatabase', error);
            return Promise.reject(error);
        }
        if (dbPromise) return dbPromise;

        dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'storageKey' });
                }
            };
            request.onsuccess = () => {
                logSuccess('openDatabase');
                resolve(request.result);
            };
            request.onerror = () => {
                const error = request.error || new Error('IndexedDB could not be opened.');
                logError('openDatabase', error);
                dbPromise = null;
                reject(error);
            };
            request.onblocked = () => {
                logError('openDatabase', new Error('IndexedDB upgrade is blocked by another open tab.'));
            };
        });
        return dbPromise;
    }

    async function save(attempt) {
        try {
            if (!attempt || !attempt.storageKey) throw new Error('Attempt storageKey is required.');
            const db = await openDatabase();
            const safeRecord = { ...attempt, updatedAt: Date.now() };
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).put(safeRecord);
            await new Promise((resolve, reject) => {
                tx.oncomplete = resolve;
                tx.onerror = () => reject(tx.error || new Error('IndexedDB save transaction failed.'));
                tx.onabort = () => reject(tx.error || new Error('IndexedDB save transaction was aborted.'));
            });
            logSuccess('save', {
                quizId: safeRecord.quizId || null,
                status: safeRecord.status || 'in_progress',
                questionCount: Array.isArray(safeRecord.questions) ? safeRecord.questions.length : 0
            });
            return true;
        } catch (error) {
            logError('save', error, { quizId: attempt && attempt.quizId });
            throw error;
        }
    }

    async function load(storageKey) {
        try {
            if (!storageKey) throw new Error('Attempt storageKey is required.');
            const db = await openDatabase();
            const tx = db.transaction(STORE_NAME, 'readonly');
            const request = tx.objectStore(STORE_NAME).get(storageKey);
            const record = await new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result || null);
                request.onerror = () => reject(request.error || new Error('IndexedDB read failed.'));
            });
            logSuccess(record ? 'load-found' : 'load-empty', {
                quizId: record && record.quizId ? record.quizId : null
            });
            return record;
        } catch (error) {
            logError('load', error);
            throw error;
        }
    }

    async function remove(storageKey) {
        try {
            if (!storageKey) throw new Error('Attempt storageKey is required.');
            const db = await openDatabase();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).delete(storageKey);
            await new Promise((resolve, reject) => {
                tx.oncomplete = resolve;
                tx.onerror = () => reject(tx.error || new Error('IndexedDB delete transaction failed.'));
                tx.onabort = () => reject(tx.error || new Error('IndexedDB delete transaction was aborted.'));
            });
            logSuccess('remove', { keySuffix: String(storageKey).slice(-12) });
            return true;
        } catch (error) {
            logError('remove', error);
            throw error;
        }
    }

    window.NormalTestOffline = Object.freeze({ openDatabase, save, load, remove, logSuccess, logError });
    console.log('[NormalTestOffline][SUCCESS] Local attempt storage module initialized.');
})();
