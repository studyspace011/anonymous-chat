// This file is intentionally kept simple for basic PWA functionality.
// It ensures the app shell can load offline.

const CACHE_NAME = 'anon-chat-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  // Add other static assets here like CSS, icons, etc. if you have them.
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

