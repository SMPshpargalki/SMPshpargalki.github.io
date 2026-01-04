const CACHE_NAME = "smp-shpargalki-v7";

// ===== ФАЙЛЫ ДЛЯ ОФФЛАЙНА =====
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",

  // ===== ОСНОВНЫЕ СКРИПТЫ =====
  "./скрипты/script.js",
  "./скрипты/theme.js",

  // ===== КАЛЬКУЛЯТОРЫ =====
  "./Калькуляторы/ПрепаратыПедиатрия.js",
  "./Калькуляторы/СрокБеременности.js",
  "./Калькуляторы/ДетскиеНормы.js",
  "./Калькуляторы/NEWS.js",
  "./Калькуляторы/ШОКС.js",
  "./Калькуляторы/ГЛАЗГО.js",
  "./Калькуляторы/ТЭЛА.js",
  "./Калькуляторы/LAMS.js",

  // ===== ШАБЛОНЫ =====
  "./Шаблоны/Акушерство.js",
  "./Шаблоны/Анестезиология.js",
  "./Шаблоны/Инфекция.js",
  "./Шаблоны/Кардиология.js",
  "./Шаблоны/Констатация.js",
  "./Шаблоны/Неврология.js",
  "./Шаблоны/Оториноларингология.js",
  "./Шаблоны/Офтальмология.js",
  "./Шаблоны/Педиатрия.js",
  "./Шаблоны/Стоматология.js",
  "./Шаблоны/Терапия.js",
  "./Шаблоны/Токсикология.js",
  "./Шаблоны/Травматология.js",
  "./Шаблоны/Урология.js",
  "./Шаблоны/Хирургия.js",
  "./Шаблоны/Прочее.js",

  // ===== КАРТИНКИ =====
  "./картинки/logo.png",
  "./картинки/БаннерДоброПожаловать.jpg",
  "./картинки/Диазепам.jpg",
  "./картинки/Кетамин.jpg",
  "./картинки/Морфин.jpg",
  "./картинки/Фентанил.jpg",
  "./картинки/Беспризорный.jpg"
];

// =======================
// INSTALL
// =======================
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// =======================
// ACTIVATE
// =======================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// =======================
// FETCH
// =======================
self.addEventListener("fetch", event => {

  // ===== HTML — ВСЕГДА С СЕРВЕРА (если онлайн)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // ===== JS / CSS — STALE WHILE REVALIDATE
  if (
    event.request.destination === "script" ||
    event.request.destination === "style"
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request)
          .then(response => {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, response.clone());
            });
            return response;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // ===== КАРТИНКИ — CACHE FIRST
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return (
          cached ||
          fetch(event.request).then(response => {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, response.clone());
            });
            return response;
          })
        );
      })
    );
    return;
  }

});