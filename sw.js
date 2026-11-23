// Vỏ app GIAO HÀNG NVT – vỏ v1.0.0
// Chỉ lưu sẵn các file của vỏ (trang, biểu tượng) để mở nhanh. App bên trong luôn lấy mới từ Google.
var BAN = 'vo-1.0.0';
var FILE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(BAN).then(function (c) { return c.addAll(FILE); }));
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== BAN; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function (e) {
  if (new URL(e.request.url).origin !== self.location.origin) return; // không đụng tới app Google
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request); }));
});
