const CACHE_NAME = 'gym-tracker-v1788267000000';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './default_db.js',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css'
];

self.addEventListener('install', event => {
  // Force the new service worker to take over immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Delete old caches and claim clients immediately
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network first, falling back to cache strategy (better for apps that update frequently)
  event.respondWith(
    fetch(event.request).then(response => {
      // If we got a valid response from network, clone it and put it in cache
      if(response && response.status === 200 && response.type === 'basic') {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
      }
      return response;
    }).catch(() => {
      // If network fails (offline), return from cache
      return caches.match(event.request);
    })
  );
});
