// Имя кэша
const CACHE_NAME = "smp-shpargalki-cache-v1";

// Список файлов для кэширования
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/manifest.json",
  "/картинки/logo.png"
];

// Установка service worker
self.addEventListener("install", (event) => {
  // Ожидаем установки и кэшируем файлы
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Кэширование файлов...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Слушатель для перехвата запросов
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Если ресурс в кэше, возвращаем его, иначе загружаем с сервера
      return response || fetch(event.request);
    })
  );
});

// Удаление старых кэшей при активации
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
