// service-worker.js (Corrected Code v2)

const CACHE_NAME = 'anon-chat-cache-v1';
// OLD: const urlsToCache = ['/', '/index.html'];
// NEW: Paths are now relative to the current directory.
const urlsToCache = [
  './',
  'index.html'
];

// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate the service worker
self.addEventListener('activate', event => {
    // Clean up old caches if any
});
