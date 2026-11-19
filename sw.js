/* Mentalista v48 — offline-first, escopo restrito ao aplicativo */
const CACHE='mentalista-v48';
const FILES=["./", "./index.html", "./styles.css", "./app.js", "./calculator.js", "./maintenance.js", "./notifications.js", "./file-handling.js", "./file-access.js", "./clipboard.js", "./offline.js", "./storage-protection.js", "./manifest.webmanifest", "./assets/logo.svg", "./assets/icon-192.png", "./assets/icon-512.png"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('mentalista-v')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok&&response.type!=='opaque'){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})));
});
