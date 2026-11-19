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
bind('maintenanceRepair',async()=>{
 if(!navigator.onLine){show('Conecte-se à internet antes de reparar os arquivos do aplicativo.');return}
 const reg=await registration();if(reg)await reg.update();
 if(!('caches'in window)){show('Este navegador não permite reparar o cache via Cache Storage.');return}
 const files=['./','./index.html','./styles.css','./app.js','./calculator.js','./maintenance.js','./manifest.webmanifest','./assets/logo.svg','./assets/icon-192.png','./assets/icon-512.png'];
 const temp='mentalista-repair-temp-v39-1';await caches.delete(temp);const cache=await caches.open(temp);
 try{for(const path of files){const url=new URL(path,appScope());const response=await fetch(url.href,{cache:'reload'});if(!response.ok)throw Error('Falha HTTP '+response.status+' em '+path);await cache.put(url.href,response)}
 const target=await caches.open('mentalista-v39-1');for(const req of await cache.keys()){const res=await cache.match(req);if(res)await target.put(req,res)}
 show('Arquivos essenciais baixados e repostos no cache. Recarregue o aplicativo quando terminar de salvar seu trabalho.');
 }catch(e){show('Reparo incompleto: '+e.message+'\nO cache principal anterior foi preservado até a etapa de cópia.')}finally{await caches.delete(temp)}
});
bind('maintenanceResetPrefs',async()=>{
 if(!confirm('Restaurar as preferências gerais do Mentalista? Projetos, históricos, rascunhos e backups não serão excluídos. A página será recarregada.'))return;
 const keys=['mentalista.theme.v1','mentalista.appearance.v14','mentalista.stage.preferences.v28','mentalista.edge.preferences.v29','mentalista.node.preferences.v30','mentalista.navigation.preferences.v31','mentalista.security.v32.2'];
 let removed=0;for(const key of keys){if(localStorage.getItem(key)!==null){localStorage.removeItem(key);removed++}}
 show(removed+' preferência(s) restaurada(s). Recarregando…');location.reload();
});
})();
