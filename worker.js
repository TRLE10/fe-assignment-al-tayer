const CACHE_NAME = 'al-tayer-cache-v1';
const urlsToCache = [
  '/favicon.ico',
];

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
    if (currentCacheName !== cacheName) {
      await caches.delete(cacheName);
    }
  });
  await Promise.all(deletePromises);
};

// Service Worker: Activate event listener for cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches(CACHE_NAME));
});


// Function to handle cache-first strategy
const handleFetchEvent = async (event) => {
  try {
    const networkResponse = await fetch(event.request);
    const isResponseInvalid = (response, requestUrl) => {
      return (
        !response ||
        response.status !== 200 ||
        response.type !== 'basic' ||
        requestUrl.startsWith('chrome-extension://')
      );
    };

    // return the network response without caching it
    if (isResponseInvalid(networkResponse, event.request.url)) {
      return networkResponse;
    }

    // Clone the network response since it can only be consumed once
    const responseToCache = networkResponse.clone();

    // Open the cache and store the cloned response
    const cache = await caches.open(CACHE_NAME);

    // Before adding the new response, delete the old one from the cache
    await cache.delete(event.request);

    // Now add the new response to the cache
    cache.put(event.request, responseToCache);

    // Return the original network response to the user
    return networkResponse;
  } catch (error) {
    console.error('Error in handleFetchEvent:', error);
    throw error; // re-throw the error so it can be caught later if needed
  }
};

// Service Worker: Fetch event listener using the cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(handleFetchEvent(event).catch(error => {
    // Handle any errors that weren't caught earlier
    console.error('Error in fetch event:', error);
    return new Response(null, { status: 500 }); // Return a 500 Internal Server Error response
  }));
});
