/* Mentalista v44 — abertura de arquivos via sistema operacional. */
(()=>{'use strict';
const LIMIT_JSON=35_000_000, LIMIT_MD=1024*1024;
const supported=typeof window.launchQueue!=='undefined'&&typeof window.launchQueue.setConsumer==='function';
let queue=Promise.resolve();
const status=()=>document.getElementById('fileHandlingStatus');
function report(message){const el=status();if(el)el.textContent=message;}
function selectInput(file,id){
 const input=document.getElementById(id);
 if(!input)throw Error('Importador indisponível. Abra o Mentalista novamente.');
 const transfer=new DataTransfer();transfer.items.add(file);input.files=transfer.files;
 input.dispatchEvent(new Event('change',{bubbles:true}));
}
async function handleFile(handle){
 if(!handle||handle.kind!=='file')return;
 const file=await handle.getFile();
 const extension=file.name.toLowerCase();
 const markdown=/\.(md|markdown)$/.test(extension);
 const json=/\.json$/.test(extension);
 if(!markdown&&!json){report('Formato não suportado: '+file.name);return;}
 if(file.size>(markdown?LIMIT_MD:LIMIT_JSON)){report('Arquivo acima do limite permitido: '+file.name);return;}
 if(json){
  let data;try{data=JSON.parse(await file.text())}catch{throw Error('JSON inválido: '+file.name)}
  if(!data||!data.project||!Array.isArray(data.project.nodes)||!Array.isArray(data.project.edges)||typeof data.format!=='string'||!data.format.includes('mentalista')){
   throw Error('Arquivo JSON não é um projeto individual compatível. Backups gerais devem ser restaurados manualmente pelo menu, com confirmação.');
  }
 }
 if(!confirm('Abrir "'+file.name+'" no Mentalista?\n\nO arquivo será importado como um NOVO projeto. Os projetos atuais serão mantidos.')){
  report('Abertura cancelada.');return;
 }
 selectInput(file,markdown?'markdownFileInput':'fileInput');
 report('Arquivo enviado para importação: '+file.name+'. Verifique a mensagem de confirmação do Mentalista.');
}
function start(){
 if(!supported){report('Abertura pelo explorador indisponível neste navegador. Use Arquivo → Importar.');return;}
 window.launchQueue.setConsumer(params=>{
  const handles=params?.files||[];
  for(const handle of handles){
   queue=queue.then(()=>handleFile(handle)).catch(err=>report('Não foi possível abrir o arquivo: '+(err?.message||String(err))));
  }
 });
 report('Pronto para receber arquivos .json e .md do sistema operacional, quando houver associação compatível.');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
