// Change this version when you want users to get a fresh cache.
// This forces a new Service Worker installation and cache cleanup.
const CACHE_NAME = "rdr2-cache-v3";

const urlsToCache = [
  "/",
  "/index.html",
  "/trinket.html",
  "/manifest.json",
  "/sw.js",
  "/css/style.css",
  "/js/script.js",
  "/js/script_satchel.js",
  "/js/script_trinket.js",
  "/assets/icons/alligator.png",
  "/assets/icons/bear.png",
  "/assets/icons/beaver.png",
  "/assets/icons/bison.png",
  "/assets/icons/bisonhorn.png",
  "/assets/icons/boar.png",
  "/assets/icons/buck.png",
  "/assets/icons/cougar.png",
  "/assets/icons/coyote.png",
  "/assets/icons/elk.png",
  "/assets/icons/fox.png",
  "/assets/icons/ingredients.png",
  "/assets/icons/kit.png",
  "/assets/icons/legend.png",
  "/assets/icons/lion.png",
  "/assets/icons/materials.png",
  "/assets/icons/moose.png",
  "/assets/icons/panther.png",
  "/assets/icons/pronghorn.png",
  "/assets/icons/provisions.png",
  "/assets/icons/ram.png",
  "/assets/icons/raven.png",
  "/assets/icons/tonics.png",
  "/assets/icons/valuables.png",
  "/assets/icons/wolf.png",
];

// Helper: use network first for navigation requests so users see updated HTML quickly.
const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    return cached || Response.error();
  }
};

// Helper: use cache first for static assets.
const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
};

self.addEventListener("install", (event) => {
  // Activate this service worker immediately so the new cache can take effect.
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  // Clean up old caches when a new service worker activates.
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  // Take control of uncontrolled clients immediately.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Use network-first for navigation requests so users get updated HTML.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cache-first for other requests (CSS/JS/images)
  event.respondWith(cacheFirst(request));
});