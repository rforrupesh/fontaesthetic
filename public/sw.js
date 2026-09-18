// Bump this on every deploy-worthy change so old caches get thrown away
// automatically. It's just a version tag, not tied to any file content.
const CACHE_VERSION = 'fontaesthetic-v1';
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Install: activate this new worker immediately instead of waiting for
// all old tabs to close.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate: delete every cache that isn't the current version. This is
// what makes new deploys actually reach repeat visitors instead of
// serving them a stale copy forever.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - Navigations (HTML pages): network-first, falling back to cache when
//   offline. This means a visitor with a flaky connection still gets the
//   last page they loaded, but whenever the network is available they get
//   the latest HTML (so content/SEO updates show up immediately).
// - Everything else (hashed CSS/JS, images, fonts): cache-first. Astro
//   fingerprints these filenames on every build, so a cached file is
//   guaranteed to still be correct -- there's no "stale asset" risk, only
//   speed to gain. A cache miss (new file after a deploy) just fetches
//   once from network and caches it for next time.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET, same-origin requests. Let everything else (POST,
  // cross-origin analytics, etc.) go straight to the network untouched.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Don't cache error responses or opaque cross-origin junk.
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const copy = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
