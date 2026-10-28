/* Offline shell for /quiz/ only. Does not cache Firestore/API data. */
const QUIZ_CACHE_PREFIX = 'neelaxmi-quiz-shell-';
const QUIZ_CACHE_NAME = QUIZ_CACHE_PREFIX + 'v1';
const QUIZ_SHELL_ASSETS = [
  '/quiz/quizzes.html',
  '/quiz/auth.js',
  '/quiz/quiz.js',
  '/quiz/scoring.js',
  '/quiz/result.js',
  '/quiz/vedio.js',
  '/quiz/style.css',
  '/js/head-loader.js',
  '/vendor/face-api.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/contrib/auto-render.min.js',
  'https://cdn.tailwindcss.com',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(QUIZ_CACHE_NAME);
    await Promise.all(QUIZ_SHELL_ASSETS.map(async (asset) => {
      try {
        const isCrossOrigin = asset.startsWith('http') && new URL(asset).origin !== self.location.origin;
        const request = isCrossOrigin
          ? new Request(asset, { mode: 'no-cors', cache: 'reload' })
          : new Request(asset, { cache: 'reload' });
        const response = await fetch(request);
        if (response.ok || response.type === 'opaque') {
          await cache.put(request, response.clone());
          console.log('[NEELAXMI QUIZ SW] SUCCESS precached', asset);
        } else {
          console.error('[NEELAXMI QUIZ SW] ERROR precache response', asset, response.status);
        }
      } catch (error) {
        console.error('[NEELAXMI QUIZ SW] ERROR precaching asset', asset, error && error.message);
      }
    }));
    console.log('[NEELAXMI QUIZ SW] SUCCESS install complete');
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => {
      if (key.startsWith(QUIZ_CACHE_PREFIX) && key !== QUIZ_CACHE_NAME) {
        return caches.delete(key);
      }
      return Promise.resolve(false);
    }));
    await self.clients.claim();
    console.log('[NEELAXMI QUIZ SW] SUCCESS activated');
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isQuizNavigation = request.mode === 'navigate'
    && url.origin === self.location.origin
    && url.pathname.startsWith('/quiz/');

  const isStaticAsset = ['script', 'style', 'image', 'font'].includes(request.destination);
  if (!isQuizNavigation && !isStaticAsset) return;

  event.respondWith((async () => {
    const cache = await caches.open(QUIZ_CACHE_NAME);
    try {
      const networkResponse = await fetch(request);
      if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
        try {
          await cache.put(request, networkResponse.clone());
          console.log('[NEELAXMI QUIZ SW] SUCCESS runtime cache', url.pathname);
        } catch (cacheError) {
          console.warn('[NEELAXMI QUIZ SW] WARNING runtime cache skipped', url.pathname, cacheError && cacheError.message);
        }
      }
      return networkResponse;
    } catch (networkError) {
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) {
        console.warn('[NEELAXMI QUIZ SW] WARNING served cached asset offline', url.pathname);
        return cached;
      }
      if (isQuizNavigation) {
        const quizShell = await cache.match('/quiz/quizzes.html');
        if (quizShell) {
          console.warn('[NEELAXMI QUIZ SW] WARNING served cached quiz page offline');
          return quizShell;
        }
      }
      console.error('[NEELAXMI QUIZ SW] ERROR no cached response offline', url.pathname, networkError && networkError.message);
      throw networkError;
    }
  })());
});
