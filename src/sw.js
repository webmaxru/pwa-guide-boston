var log = console.log.bind(console);
var err = console.error.bind(console);

err('start SW');

var version = '3';
var cacheName = 'pwa-boston-guide-v' + version;
var appShellFilesToCache = [
  './',
  './index.html',
  './inline.js',
  './main.bundle.js',
  './styles.bundle.js',
  './assets/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
  log('Service Worker: Installed');

  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      log('Service Worker: Caching App Shell');
      return cache.addAll(appShellFilesToCache);
    })
  );

});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
  log('Service Worker: Active');

  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {

        if (key !== cacheName) {
          log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }

      }));
    })
  );

});

self.addEventListener('fetch', (e) => {
  log('Service Worker: Fetch');

  e.respondWith(
    caches.match(e.request).then((response) => {

      if (response) {
        log('Service Worker: returning ' + e.request.url + ' from cache');
        return response;
      } else {
        log('Service Worker: returning ' + e.request.url + ' from net');
        return fetch(e.request);
      }

      // w/o debug info: return response || fetch(e.request);

    })
  );

});
