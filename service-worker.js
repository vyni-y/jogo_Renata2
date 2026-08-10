const CACHE_NAME = "jornada-renata-v1";

const ARQUIVOS_PARA_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./assets/renata.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png"
];

// Instala e guarda os arquivos principais em cache
self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ARQUIVOS_PARA_CACHE);
        })
    );

    self.skipWaiting();

});

// Remove caches antigos quando uma nova versão é ativada
self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((nomes) => {
            return Promise.all(
                nomes
                    .filter((nome) => nome !== CACHE_NAME)
                    .map((nome) => caches.delete(nome))
            );
        })
    );

    self.clients.claim();

});

// Serve do cache primeiro; se não tiver, busca na rede
self.addEventListener("fetch", (event) => {

    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((respostaCache) => {
            return respostaCache || fetch(event.request).catch(() => respostaCache);
        })
    );

});
