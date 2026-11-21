/* JSON geral: salvar todos os projetos em arquivo escolhido e abrir backup geral. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
let currentHandle=null, busy=false;
const types=[{description:'Backup geral Mentalista (JSON)',accept:{'application/json':['.json']}}];
const bridge=()=>window.MentalistaBackupBridge;
const status=message=>{const el=$('fileHandlingStatus');if(el)el.textContent=message;};
function fallbackDownload(content){
 const url=URL.createObjectURL(new Blob([content],{type:'application/json'}));
 const a=document.createElement('a');a.href=url;a.download='mentalista-projetos.json';document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),30000);
}
async function save(){
 if(busy)return;busy=true;
 try{
  const content=bridge().snapshot();
  if(typeof window.showSaveFilePicker!=='function'){
   fallbackDownload(content);
   alert('Este navegador não permite escolher e atualizar diretamente um arquivo. O backup foi baixado; para sobrescrevê-lo, escolha o arquivo manualmente no sistema.');
   status('Backup geral baixado');return;
  }
  // Se o usuário já autorizou um arquivo nesta sessão, atualizamos exatamente esse arquivo.
  const handle=currentHandle||await window.showSaveFilePicker({suggestedName:'mentalista-projetos.json',types});
  if(!handle)return;
  const writable=await handle.createWritable();
  try{await writable.write(content);await writable.close()}
  catch(err){await writable.abort().catch(()=>{});throw err}
  currentHandle=handle;
  status('Todos os projetos salvos em '+handle.name);
  alert('Todos os projetos foram salvos em: '+handle.name);
 }catch(err){if(err.name!=='AbortError'){status('Falha ao salvar');alert('Não foi possível salvar: '+err.message)}}
 finally{busy=false}
}
async function open(){
 if(busy)return;busy=true;
 try{
  if(typeof window.showOpenFilePicker!=='function'){$('backupFileInput')?.click();return}
  const handles=await window.showOpenFilePicker({multiple:false,types});
  if(!handles?.length)return;
  const file=await handles[0].getFile();
  if(file.size>35e6)throw Error('Arquivo maior que 35 MB');
  const data=JSON.parse(await file.text());
  if(!data||data.format!=='mentalista-backup'||!Array.isArray(data.projects))throw Error('Selecione um backup geral válido do Mentalista.');
  // A rotina existente faz validação completa e solicita confirmação ANTES de substituir dados.
  bridge().restoredFile(file);
  // Não associar automaticamente o arquivo aberto: evita sobrescrevê-lo com dados ainda não restaurados.
  currentHandle=null;
  status('Arquivo selecionado: '+file.name);
 }catch(err){if(err.name!=='AbortError'){status('Falha ao abrir');alert('Não foi possível abrir: '+err.message)}}
 finally{busy=false}
}
$('jsonSaveAll')?.addEventListener('click',save);
$('jsonOpenAll')?.addEventListener('click',open);
})();
