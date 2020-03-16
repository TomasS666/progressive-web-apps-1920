self.addEventListener('install', function(e) {
    // console.log(e)
    e.waitUntil(
      caches.open('pwa-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/css/style.css',
          '/js/index.js',
          '/images/the-movie-db-logo.cb5571ba.png',
          '/manifest-webmanifest.json',
          '/images/no-image.svg',
          '/images/icons-192.png',
          '/images/icons-512.png'
        ]);
      })
    );
   });


self.addEventListener('fetch', function(event) {
    // console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
});