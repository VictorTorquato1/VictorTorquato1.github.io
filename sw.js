const CACHE_NAME = "rdr2-cache-v1";
const urlsToCache = [
  "/index.html",
  "/css/style.css",
  "/js/script.js",
  "/assets/icons",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});