/* Mentalista v45 — File System Access, com alternativa por download. */
(()=>{'use strict';
const $=id=>document.getElementById(id),bridge=()=>window.MentalistaFileBridge;
let boundHandle=null,boundProjectId=null;
const supported=()=>typeof window.showSaveFilePicker==='function';
const safeName=name=>String(name||'Mentalista').replace(/[\\/:*?"<>|\x00-\x1f]/g,'-').slice(0,100)||'Mentalista';
function message(text){const status=$('fileHandlingStatus');if(status)status.textContent=text;window.alert(text)}
function download(content,name){const blob=new Blob([content],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)}
async function openFile(){
 if(typeof window.showOpenFilePicker!=='function'){ $('fileInput')?.click();return }
 try{
  const [handle]=await window.showOpenFilePicker({multiple:false,types:[{description:'Projeto Mentalista (JSON)',accept:{'application/json':['.json']}}]});if(!handle)return;
  const file=await handle.getFile();if(file.size>35e6)throw Error('Arquivo maior que 35 MB');
  const data=JSON.parse(await file.text());if(!data||data.format!=='mentalista-map'||!data.project||!Array.isArray(data.project.nodes))throw Error('Este arquivo não é um projeto individual Mentalista compatível.');
  if(!confirm('Importar "'+file.name+'" como NOVO projeto? Seus projetos existentes serão preservados.'))return;
  bridge().importFile(file);
  // Importação cria outro projeto. Não associamos o original à gravação para evitar sobrescrita acidental.
  boundHandle=null;boundProjectId=null;
 }catch(e){if(e.name!=='AbortError')message('Não foi possível abrir: '+e.message)}
}
async function saveAs(){
 try{
  const api=bridge(),id=api.projectId();if(!id)throw Error('Abra um projeto antes de salvar.');
  const content=api.snapshot(),name=safeName(api.projectName())+'.json';
  if(!supported()){download(content,name);message('Seu navegador não oferece salvamento direto. Download JSON iniciado.');return}
  const handle=await window.showSaveFilePicker({suggestedName:name,types:[{description:'Projeto Mentalista (JSON)',accept:{'application/json':['.json']}}]});
  if(!handle)return;
  const writable=await handle.createWritable();try{await writable.write(content);await writable.close()}catch(err){await writable.abort().catch(()=>{});throw err}
  boundHandle=handle;boundProjectId=id;message('Arquivo salvo: '+handle.name+'. O comando Salvar no arquivo poderá atualizar este arquivo enquanto o mesmo projeto estiver aberto.');
 }catch(e){if(e.name!=='AbortError')message('Falha ao salvar: '+e.message)}
}
async function saveExisting(){
 const api=bridge();if(!boundHandle||boundProjectId!==api.projectId())return saveAs();
 if(!confirm('Substituir o conteúdo do arquivo "'+boundHandle.name+'" pelo estado atual do projeto?'))return;
 try{const content=api.snapshot();const writable=await boundHandle.createWritable();try{await writable.write(content);await writable.close()}catch(err){await writable.abort().catch(()=>{});throw err}message('Arquivo atualizado: '+boundHandle.name)}catch(e){message('Falha ao atualizar o arquivo: '+e.message)}
}
$('fileAccessOpen')?.addEventListener('click',openFile);
$('fileAccessSave')?.addEventListener('click',saveExisting);
$('fileAccessSaveAs')?.addEventListener('click',saveAs);
})();
