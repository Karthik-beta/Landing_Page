// Service Worker for aggressive caching and offline support
const CACHE_NAME = 'pivotr-landing-v1.1.0';
const STATIC_CACHE = 'pivotr-static-v1';
const RUNTIME_CACHE = 'pivotr-runtime-v1';

// Resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/index.html',
  // Critical CSS and JS will be added dynamically
];

// Install event - precache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== STATIC_CACHE && 
                   cacheName !== RUNTIME_CACHE &&
                   cacheName !== CACHE_NAME;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method !== 'GET') return;

  // Handle API requests (if any)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Handle static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff2?)$/)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: cache first with network fallback
  event.respondWith(cacheFirst(request));
});

// Cache first strategy - good for static assets
async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Serve from cache and update in background
    updateCacheInBackground(request, cache);
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, try to serve a fallback
    return getFallbackResponse(request);
  }
}

// Network first strategy - good for dynamic content
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return fallback
    return getFallbackResponse(request);
  }
}

// Update cache in background
async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
  } catch (error) {
    // Silent fail for background updates
  }
}

// Fallback responses for offline scenarios
function getFallbackResponse(request) {
  const url = new URL(request.url);
  
  // Return offline page for navigation requests
  if (request.mode === 'navigate') {
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Pivotr - Offline</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .offline { color: #666; }
          </style>
        </head>
        <body>
          <div class="offline">
            <h1>You're offline</h1>
            <p>Please check your internet connection and try again.</p>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Return minimal response for other requests
  return new Response('Offline', { 
    status: 503, 
    statusText: 'Service Unavailable' 
  });
}

// Handle background sync (for form submissions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form submissions when back online
async function syncContactForm() {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const pendingSubmissions = await cache.match('/pending-submissions');
    
    if (pendingSubmissions) {
      const submissions = await pendingSubmissions.json();
      
      for (const submission of submissions) {
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submission)
          });
        } catch (error) {
          console.error('Failed to sync submission:', error);
        }
      }
      
      // Clear pending submissions
      await cache.delete('/pending-submissions');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Handle push notifications (if implemented)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});
