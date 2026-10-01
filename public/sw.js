const CACHE_NAME = 'outpost-sanctuary-v6';
const API_CACHE_NAME = 'outpost-sanctuary-api-v6';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/apple-touch-icon.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching core sanctuary app shell assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[SW] Pre-cache warning (non-blocking):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== API_CACHE_NAME) {
            console.log('[SW] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-First with Offline Cache Fallback for GET API routes (/api/weather, /api/verified-telemetry, /api/verified-scripture)
  // When online: fetches fresh telemetry/weather and updates API_CACHE_NAME.
  // When offline: serves the last cached JSON payload with X-Outpost-Offline-Cache: true header.
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(API_CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            const body = await cachedResponse.text();
            const headers = new Headers(cachedResponse.headers);
            headers.set('X-Outpost-Offline-Cache', 'true');
            return new Response(body, {
              status: cachedResponse.status,
              statusText: cachedResponse.statusText,
              headers
            });
          }
          return new Response(
            JSON.stringify({
              offline: true,
              cached: false,
              error: 'Device is offline and no cached API response was found for this endpoint.'
            }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json', 'X-Outpost-Offline-Cache': 'true' }
            }
          );
        })
    );
    return;
  }

  // Network-first strategy for navigation (HTML documents) to prevent stale index.html and chunk mismatch errors
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => cached || caches.match('/index.html') || caches.match('/'));
        })
    );
    return;
  }

  // Cache-first with background revalidation for static assets (JS, CSS, SVG, fonts, images)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {/* Offline mode - ignore */});

        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        return caches.match('/index.html') || caches.match('/');
      });
    })
  );
});
