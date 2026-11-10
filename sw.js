// Garage Code service worker.
// Saves the game and the Pyodide Python engine so everything works offline
// after the first visit. Our own files load network-first, so pushing a new
// version still reaches players straight away. The engine cache has the same
// name as Python Kitchen's, so both games share one saved copy of Python.
const CACHE = "garagecode-v2";
const PYODIDE_CACHE = "pyodide-0.26.4";
const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
const CORE = ["./", "./index.html", "./jobs.js", "./gc-worker.js", "./harness.py", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"];
const PYODIDE_FILES = ["pyodide.js", "pyodide.asm.js", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"].map(f => PYODIDE_BASE + f);

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    // The engine is big; if it can't be saved now it is saved the first time it loads.
    try { const p = await caches.open(PYODIDE_CACHE); await p.addAll(PYODIDE_FILES); } catch (err) {}
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  // Only tidy our own old caches. The shared Python engine cache is left alone.
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("garagecode-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // version.json is the update check: always ask the network, never keep a copy.
  if (url.pathname.endsWith('/version.json')) return;
  if (url.href.startsWith(PYODIDE_BASE)) {
    // Versioned engine files never change: saved copy first.
    e.respondWith(caches.open(PYODIDE_CACHE).then(c => c.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  if (req.mode === "navigate" || url.origin === location.origin) {
    e.respondWith(fetch(req, req.mode === "navigate" ? { cache: "no-cache" } : undefined).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match("./index.html"))));
    return;
  }
  // Fonts and other outside files: saved copy first, so the game still looks right offline
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
});
