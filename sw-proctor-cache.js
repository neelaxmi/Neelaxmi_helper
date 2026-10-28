/* Root-scoped service worker for the quiz app.
 * - Caches the same-origin app shell for offline refresh/recovery.
 * - Serves locally stored question images imported by cbttopdf.html.
 * - Never caches or intercepts Firebase/Netlify API responses.
 */
'use strict';

const CACHE_PREFIX = 'neelaxmi-quiz-shell-';
const CACHE_NAME = CACHE_PREFIX + 'v1';
const APP_SHELL = [
    '/quiz/quizzes.html',
    '/quiz/quiz.js',
    '/quiz/result.js',
    '/quiz/scoring.js',
    '/quiz/auth.js',
    '/quiz/normal-test-offline.js',
    '/quiz/vedio.js',
    '/quiz/style.css',
    '/js/head-loader.js',
    '/vendor/face-api.min.js'
];

function swSuccess(action, details = {}) {
    console.log('[QuizServiceWorker][SUCCESS]', action, details);
}
function swError(action, error, details = {}) {
    console.error('[QuizServiceWorker][ERROR]', action, {
        message: error && error.message ? error.message : String(error || 'Unknown error'),
        ...details
    });
}

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        const outcomes = await Promise.allSettled(APP_SHELL.map(async (url) => {
            try {
                const response = await fetch(url, { cache: 'reload' });
                if (!response.ok) throw new Error('HTTP ' + response.status);
                await cache.put(url, response.clone());
                swSuccess('precache-asset', { url });
            } catch (error) {
                swError('precache-asset', error, { url });
                // A missing optional asset must not prevent the worker installing.
            }
        }));
        swSuccess('install-complete', { attemptedAssets: outcomes.length });
        await self.skipWaiting();
    })().catch((error) => {
        swError('install', error);
        throw error;
    }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key)));
        await self.clients.claim();
        swSuccess('activate-complete', { cacheName: CACHE_NAME });
    })().catch((error) => swError('activate', error)));
});

async function serveLocalQuizImage(pathname) {
    if (pathname === '/local-img/_ping') {
        return new Response(null, { status: 204 });
    }
    const match = pathname.match(/^\/local-img\/([^/]+)\/(\d+)\.jpg$/);
    if (!match) return new Response('Not found', { status: 404 });

    const quizId = decodeURIComponent(match[1]);
    const imageNumber = match[2];
    const key = quizId + '/' + imageNumber;

    try {
        const db = await new Promise((resolve, reject) => {
            const request = indexedDB.open('neelaxmi-local-quiz-images', 1);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error || new Error('Could not open local image database.'));
        });
        const tx = db.transaction('images', 'readonly');
        const request = tx.objectStore('images').get(key);
        const record = await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error || new Error('Could not read local question image.'));
        });
        db.close();

        if (!record || !record.blob || (record.expiresAt && record.expiresAt < Date.now())) {
            swError('local-image-missing-or-expired', new Error('Image not found or expired.'), { key });
            return new Response('Local question image not found or expired', { status: 404 });
        }
        swSuccess('local-image-served', { key });
        return new Response(record.blob, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'private, max-age=3600',
                'X-Content-Type-Options': 'nosniff'
            }
        });
    } catch (error) {
        swError('serve-local-image', error, { key });
        return new Response('Could not load local question image', { status: 500 });
    }
}

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (url.pathname.startsWith('/.netlify/functions/')) return;
    if (url.pathname.startsWith('/local-img/')) {
        event.respondWith(serveLocalQuizImage(url.pathname));
        return;
    }

    const isAppShell = APP_SHELL.includes(url.pathname);
    if (!isAppShell) return;

    // Network-first keeps the deployed app fresh when online and uses the
    // last successfully cached version when a student refreshes offline.
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cacheKey = new Request(url.origin + url.pathname, { method: 'GET' });
        try {
            const response = await fetch(request);
            if (response && response.ok) {
                await cache.put(cacheKey, response.clone());
                swSuccess('asset-updated', { path: url.pathname });
            }
            return response;
        } catch (error) {
            const cached = await cache.match(cacheKey);
            if (cached) {
                swSuccess('asset-served-offline', { path: url.pathname });
                return cached;
            }
            swError('asset-unavailable-offline', error, { path: url.pathname });
            return new Response('This page asset is not cached yet. Reconnect once, open the quiz page, and try again.', {
                status: 503,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }
    })());
});
