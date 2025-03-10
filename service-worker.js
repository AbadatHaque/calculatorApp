const CACHE_NAME = 'calculator-cache-v1';

// Install event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/index.html',
        '/CSS/style.css',
        '/images/Calculator_512.png',
        '/manifest.json',
        // '/offline.html' // Consider adding an offline page
      ]);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request).catch(() => {
        // If fetch fails (e.g. offline), return an offline page
        return caches.match('/offline.html');
      });
    })
  );
});
