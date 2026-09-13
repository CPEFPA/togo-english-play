   const CACHE_NAME = 'togo-english-play-v2';

// Fichiers à mettre en cache pour le mode hors-ligne
const urlsToCache = [
  '/togo-english-play/',
  '/togo-english-play/index.html',
  '/togo-english-play/kids.html',
  '/togo-english-play/parents.html',
  '/togo-english-play/teachers.html',
  '/togo-english-play/css/style.css',
  '/togo-english-play/js/main.js',
  '/togo-english-play/js/kids.js',
  '/togo-english-play/js/parents.js',
  '/togo-english-play/js/teachers.js',
  '/togo-english-play/data/videos.json',
  '/togo-english-play/manifest.json'
];

// Installation : mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes : cache d'abord, puis réseau
self.addEventListener('fetch', event => {
  // Ne pas mettre en cache les vidéos YouTube (trop lourdes)
  if (event.request.url.includes('youtube') || event.request.url.includes('googlevideo')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si le fichier est en cache, le retourner
        if (response) {
          return response;
        }

        // Sinon, le télécharger et le mettre en cache
        return fetch(event.request)
          .then(response => {
            // Vérifier que la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si pas de réseau et pas de cache, retourner une page hors-ligne
            if (event.request.mode === 'navigate') {
              return caches.match('/togo-english-play/index.html');
            }
          });
      })
  );
});
