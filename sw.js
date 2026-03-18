const CACHE_NAME = "rdr2-cache-v2";
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
  "/assets/icons/wolf.png"
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