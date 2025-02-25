self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('calculator-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/CSS/style.css',
          '/images/Calculator_512.png',
          '/manifest.json'
          // Add any other assets that should be cached
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        return cachedResponse || fetch(e.request);
      })
    );
  });
  