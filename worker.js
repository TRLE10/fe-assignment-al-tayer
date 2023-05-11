const CACHE_NAME = 'al-tayer-cache-v1';
const FAILED_REQUESTS_CACHE_NAME = 'failed-requests';

const urlsToCache = ['/favicon.ico'];

let dbPromise = indexedDB.open('failedRequestsDB', 1);

dbPromise.onupgradeneeded = function (event) {
  let db = event.target.result;
  let objectStore = db.createObjectStore('failedRequests', { keyPath: 'id', autoIncrement: true });
};

// Function to open cache and add URLs
const openCacheAndAddUrls = async (cacheName, urlsToCache) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(urlsToCache);
};

// Service Worker: Install event listener
self.addEventListener('install', (event) => {
  event.waitUntil(openCacheAndAddUrls(CACHE_NAME, urlsToCache));
});

// Function to delete old caches
const deleteOldCaches = async (currentCacheName) => {
  const cacheNames = await caches.keys();
  const deletePromises = cacheNames.map(async (cacheName) => {
    if (cacheName !== FAILED_REQUESTS_CACHE_NAME && currentCacheName !== cacheName) {
      await caches.delete(cacheName);
    }
  });
  await Promise.all(deletePromises);
};

// Service Worker: Activate event listener for cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches(CACHE_NAME));
});

// Handle cache-first strategy
const handleFetchEvent = async (event) => {
  const cache = await caches.open(CACHE_NAME);

  // Try to retrieve the response from cache
  let response = await cache.match(event.request);

  if (response) {
    // Return the cached response if it exists
    return response;
  }

  // Fetch the response from the network
  const networkResponse = await fetch(event.request);

  // If the response is not successful (status 200) or not of type 'basic' (same origin),
  // return the network response without caching it
  if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
    return networkResponse;
  }

  // Clone the network response since it can only be consumed once
  const responseToCache = networkResponse.clone();

  // Now add the new response to the cache
  cache.put(event.request, responseToCache);

  // Return the original network response to the user
  return networkResponse;
};

// Service Worker: Fetch event listener using the cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status >= 400) {
          // Save failed request to cache
          caches.open(FAILED_REQUESTS_CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return handleFetchEvent(event);
      })
      .catch((error) => {
        let dbPromise = indexedDB.open('failedRequestsDB');

        dbPromise.onsuccess = function (dbevent) {
          let db = dbevent.target.result;
          let tx = db.transaction('failedRequests', 'readwrite');
          let store = tx.objectStore('failedRequests');
          const params = {
            url: event.request.url,
            method: event.request.method,
            headers: Array.from(event.request.headers.entries()),
          };
          if (event.request.body) {
            params.body = event.request.body;
          }

          store.add({ value: params });
        };
        throw error;
      })
  );
});

self.addEventListener('sync', (event) => {
  console.log('Sync event fired');
  let dbPromise = indexedDB.open('failedRequestsDB');

  dbPromise.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['failedRequests']);
    const objectStore = transaction.objectStore('failedRequests');
    const getRequest = objectStore.getAll();

    getRequest.onsuccess = function () {
      let failedRequests = getRequest.result;

      for (let i = 0; i < failedRequests.length; i++) {
        let failedRequest = failedRequests[i];
        const params = {
          method: failedRequest.value.method,
        };

        if (failedRequest.value.body) {
          params.body = failedRequest.body;
        }

        fetch(failedRequest.value.url, params).then(function (response) {
          if (response.ok) {
            let deleteTx = db.transaction('failedRequests', 'readwrite');
            let deleteStore = deleteTx.objectStore('failedRequests');
            deleteStore.delete(failedRequest.id);
          }
        });
      }
    };
  };
});

// Listen for push events
self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.text() : 'Default message';
  const options = {
    body: payload,
    icon: '/icons/app-icon-192.png',
    badge: '/icons/app-icon-512.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'al-tayer-notification',
    renotify: true,
    actions: [
      {
        action: 'open',
        title: 'Open App',
      },
      {
        action: 'close',
        title: 'Dismiss',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('Al Tayer', options));
});

// Handle notification actions
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;

  if (action === 'open') {
    clients.openWindow('/');
  }

  notification.close();
});
