/* Mentalista v43 — Lembretes locais. Não implementa Web Push. */
(()=>{'use strict';
const KEY='mentalista.notifications.v43';
const $=id=>document.getElementById(id);
const DEFAULT={enabled:true,backup:false,backupAcknowledged:Date.now(),items:[]};
let state;
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');state={...DEFAULT,...(v&&typeof v==='object'?v:{})};if(!Array.isArray(state.items))state.items=[];}catch{state={...DEFAULT};}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{message('Não foi possível salvar. Verifique o armazenamento do navegador.');return false}};
const message=t=>{$('notificationsStatus').textContent=t};
const permission=()=>{const supported=('Notification' in window)&&window.isSecureContext;const value=supported?Notification.permission:'indisponível';$('notificationsPermission').textContent=`Notificações do sistema: ${value}.`; $('notificationsAllow').disabled=!supported||value!=='default';return supported};
function display(title,body){
 let sent=false;
 if(permission()&&Notification.permission==='granted'){
   try{if('serviceWorker' in navigator&&navigator.serviceWorker.controller){navigator.serviceWorker.ready.then(reg=>reg.showNotification(title,{body,tag:'mentalista-local-reminder',icon:'./assets/icon-192.png'})).catch(()=>{message(`${title}: ${body}`)});sent=true}
   else {new Notification(title,{body,icon:'./assets/icon-192.png'});sent=true;}}catch{}
 }
 if(!sent)message(`${title}: ${body}`);
}
function render(){
 $('notificationsEnabled').checked=!!state.enabled;$('notificationsBackupEnabled').checked=!!state.backup;
 const list=$('notificationsList');list.replaceChildren();
 const ordered=[...state.items].sort((a,b)=>a.when-b.when);
 if(!ordered.length){const li=document.createElement('li');li.textContent='Nenhum lembrete cadastrado.';list.append(li);return;}
 for(const item of ordered){const li=document.createElement('li');const span=document.createElement('span');span.textContent=`${item.text} — ${new Date(item.when).toLocaleString('pt-BR')}${item.done?' (concluído)':''}`;const btn=document.createElement('button');btn.type='button';btn.textContent='Excluir';btn.setAttribute('aria-label',`Excluir lembrete ${item.text}`);btn.addEventListener('click',()=>{state.items=state.items.filter(x=>x.id!==item.id);save();render()});li.append(span,btn);list.append(li)}
}
function check(){if(!state.enabled)return;const now=Date.now();let changed=false;
 for(const item of state.items){if(!item.done&&item.when<=now){item.done=true;changed=true;display('Mentalista — lembrete',item.text)}}
 if(state.backup&&now-state.backupAcknowledged>=7*86400000){state.backupAcknowledged=now;changed=true;display('Mentalista — backup','Considere exportar um backup geral JSON dos seus projetos.')}
 if(changed){save();render()}
}
function init(){if(!$('notificationsDialog'))return;
 $('openNotifications').addEventListener('click',()=>{document.querySelectorAll('.menu').forEach(m=>m.open=false);permission();render();$('notificationsDialog').showModal()});
 $('notificationsClose').addEventListener('click',()=>$('notificationsDialog').close());
 $('notificationsDialog').addEventListener('click',e=>{if(e.target===$('notificationsDialog'))$('notificationsDialog').close()});
 $('notificationsAllow').addEventListener('click',async()=>{if(!permission())return;try{const result=await Notification.requestPermission();permission();message(result==='granted'?'Permissão concedida.':'Permissão não concedida. Os avisos continuarão disponíveis dentro do aplicativo.')}catch{message('O navegador não permitiu solicitar a permissão.')}});
 $('notificationsTest').addEventListener('click',()=>display('Mentalista — teste','Este é um teste das notificações locais.'));
 $('notificationsEnabled').addEventListener('change',e=>{state.enabled=e.target.checked;save();if(state.enabled)check()});
 $('notificationsBackupEnabled').addEventListener('change',e=>{state.backup=e.target.checked;state.backupAcknowledged=Date.now();save()});
 $('notificationsForm').addEventListener('submit',e=>{e.preventDefault();const text=$('notificationsText').value.trim();const when=new Date($('notificationsDate').value).getTime();if(!text||!Number.isFinite(when)||when<=Date.now()){message('Informe uma mensagem e uma data futura.');return}state.items.push({id:crypto.randomUUID?.()||String(Date.now()+Math.random()),text,when,done:false});if(save()){e.target.reset();message('Lembrete salvo neste navegador.');render()}});
 permission();render();check();setInterval(check,30000);window.addEventListener('focus',check);document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
