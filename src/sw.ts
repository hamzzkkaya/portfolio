/// <reference lib="webworker" />

const CACHE_NAME = 'hamza-portfolio-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json', // If exists
    '/favicon.ico',
];

self.addEventListener('install', (event: any) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event: any) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event: any) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip browser-sync or other dev tools
    if (event.request.url.includes('hot-update')) return;

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            // 1. Try Network First
            try {
                const networkResponse = await fetch(event.request);

                // Cache successful valid responses
                if (networkResponse.ok && networkResponse.type === 'basic') {
                    // Clone response because it can only be consumed once
                    cache.put(event.request, networkResponse.clone());
                }

                return networkResponse;
            } catch (error) {
                // 2. Network failed, try Cache
                console.log('[SW] Network failed, serving from cache:', event.request.url);
                const cachedResponse = await cache.match(event.request);

                if (cachedResponse) {
                    return cachedResponse;
                }

                // 3. If both fail, and it's a navigation request (HTML), return index.html (SPA Fallback)
                // This ensures that if the user is on /about and refreshes offline, they get the index.html
                // which then loads React, which then shows the Offline component.
                if (event.request.mode === 'navigate') {
                    const indexCache = await cache.match('/index.html');
                    return indexCache || Response.error();
                }

                throw error;
            }
        })()
    );
});
