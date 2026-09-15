const CACHE_NAME = 'togoenglish-v1';
const urlsToCache = [
  '/togo-english-play/',
  '/togo-english-play/index.html',
  '/togo-english-play/login.html',
  '/togo-english-play/students.html',
  '/togo-english-play/kids.html',
  '/togo-english-play/ce.html',
  '/togo-english-play/cm.html',
  '/togo-english-play/parents.html',
  '/togo-english-play/teachers.html',
  '/togo-english-play/guide.html',
  '/togo-english-play/css/style.css',
  '/togo-english-play/js/analytics.js',
  '/togo-english-play/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
