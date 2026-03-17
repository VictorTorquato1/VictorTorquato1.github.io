const CACHE_NAME = "rdr2-tracker-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/camp.html",
  "/talismans.html",
  "/amulets.html",
  "/map.html",

  "/css/style.css",
  "/js/script.js",
  "/js/map.js",

  "/images/rdr2map.jpg",

  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});