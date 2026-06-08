// ─────────────────────────────────────────────────────────────
// Family Tree — Service Worker
// Bump CACHE_VERSION every time you deploy an update.
// The old cache is deleted automatically and users get a
// "Refresh" toast inviting them to load the new version.
// Their data lives in localStorage and is never touched here.
// ─────────────────────────────────────────────────────────────
const CACHE_VERSION = 'ft-v8';
const CACHED_FILES  = ['.', 'index.html', 'manifest.json'];

// Install: cache the shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CACHED_FILES))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fall back to network, cache new responses
self.addEventListener('fetch', event => {
  // Only handle GET requests for our own origin
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => null);

      // Return cached immediately; update cache in background
      return cached || networkFetch;
    })
  );
});
