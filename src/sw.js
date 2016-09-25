var log = console.log.bind(console);
var err = console.error.bind(console);

importScripts('./sw-toolbox.js');

var version = '5';
var cacheName = 'pwa-boston-guide-v' + version;
var dataCacheName = 'pwa-guide-boston-data-v' + version;
var appShellFilesToCache = [
  './',
  './index.html',
  './inline.js',
  './main.bundle.js',
  './styles.bundle.js',
  './assets/logo.png'
];

toolbox.options.cache.name = cacheName;
toolbox.precache(appShellFilesToCache);
toolbox.router.default = toolbox.cacheFirst;

toolbox.router.get('/assets/data/(.*)', toolbox.networkFirst, {
  cache: {
    name: dataCacheName
  }
});

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
  log('Service Worker: Installed');
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
  log('Service Worker: Active');

  e.waitUntil(

    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {

        if (
          (key !== dataCacheName || key !== cacheName) &&
          key.indexOf("$$$inactive$$$") === -1
        ) {
          log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }

      }));
    })

  );

});

self.addEventListener('push', function(e) {
  log('Service Worker: Received push event');
  e.waitUntil(
    fetch('http://localhost:8000/pushdata').then(function(response) {
      return response.json();
    }).then(function(data) {
      var title = 'Boston Guide';
      var body = data.msg;
      var icon = '/assets/logo.png';
      var tag = 'static-tag';
      return self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag
      });
    }, function(err) {
      err(err);
    })
  );
});
