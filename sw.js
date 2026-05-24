const CACHE_NAME = 'almoxavic-v3'; // Atualizado para forçar o celular a ler o logo-pwa.png
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo-pwa.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});