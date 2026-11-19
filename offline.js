/* Mentalista v47 — integridade offline, somente leitura */
(()=>{'use strict';
const scope=new URL('./',location.href);
const essential=['index.html','styles.css','app.js','calculator.js','maintenance.js','notifications.js','file-handling.js','file-access.js','clipboard.js','offline.js','manifest.webmanifest','assets/logo.svg','assets/icon-192.png','assets/icon-512.png'];
const cacheName='mentalista-v47';
async function check(){
 const result={supported:'caches' in window,controlled:!!navigator.serviceWorker?.controller,online:navigator.onLine,missing:[],checked:essential.length,cacheName};
 if(!result.supported){result.missing=[...essential];return result}
 const cache=await caches.open(cacheName);
 for(const name of essential){const url=new URL(name,scope).href;const response=await cache.match(url);if(!response||!response.ok||response.type==='opaque')result.missing.push(name)}
 return result;
}
const badge=document.getElementById('offlineBadge');
async function refresh(){if(!badge)return;try{const r=await check();badge.dataset.state=!r.supported?'unsupported':r.missing.length?'missing':'ready';badge.textContent=!r.supported?'Offline não verificável':r.missing.length?(r.online?'Offline incompleto · reparar':'Offline incompleto · conecte-se'):(r.online?'Offline preparado · online':'Offline preparado · sem rede');badge.title=r.missing.length?r.missing.join(', '):'Arquivos essenciais presentes no cache';}catch{badge.dataset.state='unsupported';badge.textContent='Offline: verificação indisponível'}}
window.MentalistaOffline=Object.freeze({check,refresh,essential:[...essential],cacheName});
window.addEventListener('online',refresh);window.addEventListener('offline',refresh);navigator.serviceWorker?.addEventListener('controllerchange',refresh);
refresh();
})();
