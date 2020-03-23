// https://github.com/decrek/progressive-web-apps-1920/blob/master/examples/movies-example/src/service-worker.js
// Used as example. Understand everything now, soon I'll add more of my own flavour or even a different caching technique
// Author: Declan Rek
// I made use of the functions Declan wrote: fetch and cache, is htmlgetrequest and iscoregetrequest


const CORE_CACHE_VERSION = "pwa-v1"
const CORE_ASSETS = [
    '/offline',
    '/css/style.css',
    '/js/index.js',
    '/images/the-movie-db-logo.cb5571ba.png',
    '/manifest-webmanifest.json',
    '/images/no-image.svg',
    '/images/icons-192.png',
    '/images/icons-152.png'
];


self.addEventListener('install', event => {
  console.log('Installing sw')

  event.waitUntil(
    caches.open(CORE_CACHE_VERSION).then(function(cache) {
      return cache.addAll(CORE_ASSETS)
      // Disable skipwaiting, create popup or push notification for update and then trigger it
        .then(() => self.skipWaiting());
    })
  );
});



self.addEventListener('fetch', event => {
  console.log('Fetch: ', event.request.url);
  
  if (isCoreGetRequest(event.request)) {
    console.log('Core get req: ', event.request.url);
    // cache only strategy
    event.respondWith(
      caches.open(CORE_CACHE_VERSION)
        .then(cache => cache.match(event.request.url))
    )
  } else if (isHtmlGetRequest(event.request)) {
    console.log('html get request', event.request.url)
    // generic fallback
    event.respondWith(
      caches.open(CORE_CACHE_VERSION)
        .then(cache => cache.match(event.request.url))
        .then(response => response ? response : fetchAndCache(event.request, CORE_CACHE_VERSION))
        .catch(e => {
          console.log('Ben ik offline?')
          return caches.open(CORE_CACHE_VERSION)
            .then(cache => cache.match('/offline'))
        })
    )
  }
});

function fetchAndCache(request, cacheName) {
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new TypeError('Bad response status');
      }
      const clone = response.clone()
      caches.open(cacheName).then((cache) => cache.put(request, clone))
      return response
    })
}



function isHtmlGetRequest(request) {
  return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}


function isCoreGetRequest(request) {
  return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}


function getPathName(requestUrl) {
  const url = new URL(requestUrl);
  return url.pathname;
}



// https://github.com/decrek/progressive-web-apps-1920/blob/master/examples/movies-example/src/service-worker.js
// Used as example. Understand everything now, soon I'll add more of my own flavour or even a different caching technique
// Author: Declan Rek
// I made use of the functions Declan wrote: fetch and cache, is htmlgetrequest and iscoregetrequest