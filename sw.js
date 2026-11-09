// Garage Code service worker: lets the game install and play offline.
// The game page loads network-first, so pushing a new index.html still updates players.
const CACHE = "garagecode-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("garagecode-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // version.json is the update check: always ask the network, never keep a copy.
  if (url.pathname.endsWith('/version.json')) return;
  if (req.mode === "navigate" || url.origin === location.origin) {
    e.respondWith(fetch(req, req.mode === "navigate" ? { cache: "no-cache" } : undefined).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html"))));
    return;
  }
  // Fonts and other outside files: saved copy first, so the game still looks right offline
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
});
