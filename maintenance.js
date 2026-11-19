/* Mentalista v39.1 — Manutenção independente, sem acesso destrutivo a projetos. */
(()=>{'use strict';
const $=id=>document.getElementById(id),dialog=$('maintenanceDialog'),out=$('maintenanceResult');
if(!dialog||!out)return;
const show=msg=>{out.textContent=msg};
let installPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e});
window.addEventListener('appinstalled',()=>{installPrompt=null;show('Mentalista instalado com sucesso.')});
$('openMaintenance')?.addEventListener('click',()=>{document.querySelectorAll('.menu').forEach(m=>m.open=false);dialog.showModal()});
$('maintenanceClose')?.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const bind=(id,fn)=>$(id)?.addEventListener('click',async()=>{const b=$(id);b.disabled=true;try{await fn()}catch(e){show('Operação não concluída: '+(e?.message||String(e)))}finally{b.disabled=false}});
const appScope=()=>new URL('./',location.href).href;
const appCacheKeys=async()=>{if(!('caches'in window))return[];const keys=await caches.keys();return keys.filter(k=>k.startsWith('mentalista-v'))};
const registration=async()=>('serviceWorker'in navigator?navigator.serviceWorker.getRegistration(appScope()):null);
const fmt=n=>{if(!Number.isFinite(n))return 'indisponível';return n<1048576?(n/1024).toFixed(1)+' KiB':(n/1048576).toFixed(2)+' MiB'};
bind('maintenanceInstall',async()=>{
 if(window.matchMedia('(display-mode: standalone)').matches||navigator.standalone){show('O Mentalista já está aberto no modo de aplicativo.');return}
 if(installPrompt){const event=installPrompt;installPrompt=null;await event.prompt();const result=await event.userChoice;show(result.outcome==='accepted'?'Instalação solicitada. Aguarde o navegador concluir.':'Instalação cancelada. Você pode tentar pelo menu do navegador.');return}
 show('O navegador não disponibilizou o convite de instalação neste momento. No Chrome ou Edge, abra o menu ⋮ ou … e procure “Instalar aplicativo” ou “Adicionar à tela inicial”. A opção depende do navegador e dos requisitos do PWA.');
});
bind('maintenanceUninstall',async()=>show('A desinstalação não pode ser executada por um site.\n\nChrome/Edge no computador: abra o Mentalista instalado, procure o menu ⋮ e escolha “Desinstalar Mentalista”, ou utilize a página de aplicativos instalados do navegador.\n\nAndroid: pressione o ícone do aplicativo e escolha Desinstalar/Remover, conforme o sistema.\n\nAtenção: remover o aplicativo ou seus dados pode afetar os projetos armazenados localmente. Exporte um backup geral JSON antes.'));
bind('maintenanceUpdate',async()=>{
 const reg=await registration();if(!reg){show('Nenhum service worker registrado neste escopo. Abra o aplicativo via HTTPS e recarregue a página para tentar registrá-lo.');return}
 await reg.update();show(reg.waiting?'Uma atualização foi encontrada e está aguardando ativação. Feche outras abas do Mentalista e reabra o aplicativo.':'Verificação solicitada ao navegador. Se houver atualização, ela será instalada conforme o ciclo de vida do service worker.');
});
bind('maintenanceDiagnose',async()=>{
 let ls='indisponível';try{const key='mentalista.maintenance.test';localStorage.setItem(key,'ok');ls=localStorage.getItem(key)==='ok'?'leitura e escrita OK':'falha na leitura';localStorage.removeItem(key)}catch(e){ls='bloqueado: '+e.name}
 let db='indisponível';if('indexedDB'in window){try{await new Promise((resolve,reject)=>{const req=indexedDB.open('mentalista-maintenance-test',1);req.onupgradeneeded=()=>req.result.createObjectStore('test');req.onsuccess=()=>{req.result.close();indexedDB.deleteDatabase('mentalista-maintenance-test');resolve()};req.onerror=()=>reject(req.error)});db='abertura OK'}catch(e){db='erro: '+e.message}}
 const reg=await registration();const cachesList=await appCacheKeys();
 show('DIAGNÓSTICO (somente leitura dos projetos)\nHTTPS: '+(location.protocol==='https:'?'sim':'não')+'\nLocalStorage: '+ls+'\nIndexedDB: '+db+'\nService worker: '+(reg?'registrado':'não registrado')+'\nControle offline: '+(navigator.serviceWorker?.controller?'ativo':'não ativo')+'\nCaches do Mentalista: '+cachesList.length+'\nConexão declarada: '+(navigator.onLine?'online':'offline')+'\n\nEste diagnóstico não verifica nem repara a integridade semântica de todos os projetos.');
});
bind('maintenanceStorage',async()=>{
 const estimate=await navigator.storage?.estimate?.();let bytes=0,keys=0;
 try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith('mentalista.')){const value=localStorage.getItem(key)||'';bytes+=(key.length+value.length)*2;keys++}}}catch{}
 const cachesList=await appCacheKeys();
 show('ARMAZENAMENTO\nUso total estimado pelo navegador: '+fmt(estimate?.usage)+'\nCota estimada: '+fmt(estimate?.quota)+'\nDados Mentalista no localStorage (aprox.): '+fmt(bytes)+' em '+keys+' chaves\nCaches do aplicativo: '+cachesList.length+'\n\nO uso total pode incluir dados de outros recursos da mesma origem; as estimativas não são valores exatos.');
});
bind('maintenanceClearCache',async()=>{
 const keys=await appCacheKeys();if(!keys.length){show('Não há caches do Mentalista para remover.');return}
 if(!confirm('Remover '+keys.length+' cache(s) de arquivos do Mentalista? Os projetos e o histórico não serão apagados intencionalmente. Para usar offline novamente, abra o app conectado à internet.'))return;
 const result=await Promise.all(keys.map(k=>caches.delete(k)));show(result.every(Boolean)?'Caches do Mentalista removidos. Reabra o aplicativo online para recriar os arquivos offline.':'Alguns caches não puderam ser removidos.');
});
bind('maintenanceOffline',async()=>{
 if(!window.MentalistaOffline){show('Módulo de verificação offline indisponível. Recarregue o aplicativo.');return}
 const r=await window.MentalistaOffline.check();
 show('VERIFICAÇÃO OFFLINE\nCache: '+r.cacheName+'\nArquivos verificados: '+r.checked+'\nAusentes ou inválidos: '+r.missing.length+'\nControle do service worker: '+(r.controlled?'ativo':'ainda não ativo')+'\nRede declarada: '+(r.online?'online':'offline')+(r.missing.length?'\n\nArquivos a reparar:\n'+r.missing.join('\n'):'\n\nTodos os arquivos essenciais estão no cache. Isso não garante a integridade dos dados dos projetos.'));
});
bind('maintenanceRepair',async()=>{
 if(!navigator.onLine){show('Conecte-se à internet antes de reparar os arquivos do aplicativo.');return}
 if(!window.MentalistaOffline||!('caches'in window)){show('Verificação de cache indisponível neste navegador.');return}
 const {essential,cacheName}=window.MentalistaOffline;
 const scope=appScope();const staging=cacheName+'-repair-temp';await caches.delete(staging);const temp=await caches.open(staging);
 try{
  for(const name of essential){const url=new URL(name,scope).href;const res=await fetch(url,{cache:'reload'});if(!res.ok||res.type==='opaque')throw Error('Arquivo indisponível: '+name+' (HTTP '+res.status+')');await temp.put(url,res)}
  const target=await caches.open(cacheName);for(const req of await temp.keys()){const res=await temp.match(req);if(res)await target.put(req,res)}
  const reg=await registration();if(reg)await reg.update();
  await window.MentalistaOffline.refresh();
  show('Arquivos essenciais verificados e atualizados no cache '+cacheName+'. Nenhum projeto ou histórico foi apagado. Recarregue a página após guardar seu trabalho.');
 }catch(e){show('Reparo não concluído: '+e.message+'\nA cópia temporária foi descartada. Seus projetos não foram alterados.')}finally{await caches.delete(staging)}
});
bind('maintenanceResetPrefs',async()=>{
 if(!confirm('Restaurar as preferências gerais do Mentalista? Projetos, históricos, rascunhos e backups não serão excluídos. A página será recarregada.'))return;
 const keys=['mentalista.theme.v1','mentalista.appearance.v14','mentalista.stage.preferences.v28','mentalista.edge.preferences.v29','mentalista.node.preferences.v30','mentalista.navigation.preferences.v31','mentalista.security.v32.2'];
 let removed=0;for(const key of keys){if(localStorage.getItem(key)!==null){localStorage.removeItem(key);removed++}}
 show(removed+' preferência(s) restaurada(s). Recarregando…');location.reload();
});
})();
