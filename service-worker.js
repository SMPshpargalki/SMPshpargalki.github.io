const CACHE_NAME = "smp-cache-v1";

// Что кэшируем при первой установке
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/styles.css",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting(); // сразу активировать новую версию
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  return self.clients.claim();
});

// Логика запросов — сначала сеть, потом кэш
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // кладём в кэш копию
        const respClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached)
      )
  );
});
