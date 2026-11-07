const CACHE='rifa-cliente-pwa-v2';
const ARQUIVOS=['./','./index.html','./vencedor.html','./style.css','./app.js','./pix-fluxo-v2.js','./instalar-app.js','./pagamentos-config.js','./vencedor.js','./firebase-config.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(async c=>{await Promise.allSettled(ARQUIVOS.map(p=>c.add(new Request(p,{cache:'reload'}))));}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('rifa-cliente-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  e.respondWith(fetch(req).catch(async()=>{const c=await caches.open(CACHE);return (await c.match('./index.html'))||Response.error();}));return;
 }
 e.respondWith(fetch(req).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}return r;}).catch(()=>caches.match(req)));
});
