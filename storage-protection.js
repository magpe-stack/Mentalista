/* Mentalista v48 — inspeções não destrutivas e armazenamento persistente */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const output=$('maintenanceResult');
if(!output)return;
const report=message=>{output.textContent=message};
const bind=(id,handler)=>{const button=$(id);if(!button)return;button.addEventListener('click',async()=>{button.disabled=true;try{await handler()}catch(e){report('Não foi possível concluir: '+(e?.message||String(e)))}finally{button.disabled=false}})};
const bytes=n=>Number.isFinite(n)?(n/1048576).toFixed(2)+' MiB':'indisponível';
const estimate=async()=>navigator.storage?.estimate?.()||null;
const persistence=async()=>typeof navigator.storage?.persisted==='function'?await navigator.storage.persisted():null;
const status=async()=>{const e=await estimate(),p=await persistence();return 'Persistência: '+(p===true?'concedida':p===false?'não concedida':'API indisponível')+'\nUso estimado da origem: '+bytes(e?.usage)+'\nCota estimada da origem: '+bytes(e?.quota)+'\nEspaço restante estimado: '+bytes(e&&Number.isFinite(e.quota)&&Number.isFinite(e.usage)?Math.max(0,e.quota-e.usage):NaN)+'\n\nAs estimativas abrangem esta origem e não substituem backups.'};
bind('maintenancePersistence',async()=>{if(typeof navigator.storage?.persist!=='function'){report('Este navegador não disponibiliza a solicitação de armazenamento persistente. Continue fazendo backups JSON.');return}const was=await persistence();if(was===true){report('O armazenamento persistente já foi concedido.\n\n'+await status());return}const ok=await navigator.storage.persist();report((ok?'Solicitação aceita pelo navegador.':'O navegador não concedeu persistência. Os projetos continuam acessíveis, mas podem ser removidos por políticas de armazenamento.')+'\n\n'+await status())});
bind('maintenanceStorageProtection',async()=>report('PROTEÇÃO DO ARMAZENAMENTO\n'+await status()+'\n\nLimpar dados do site, usar modo privado ou desinstalar o aplicativo pode eliminar dados locais. Exporte backups gerais regularmente.'));
const validateProject=p=>{
 const errors=[];
 if(!p||typeof p!=='object'||Array.isArray(p))return ['projeto não é um objeto'];
 if(typeof p.id!=='string'||!p.id)errors.push('identificador ausente');
 if(typeof p.name!=='string')errors.push('nome inválido');
 if(!Array.isArray(p.nodes))errors.push('nós não são uma lista');
 if(!Array.isArray(p.edges))errors.push('conexões não são uma lista');
 if(Array.isArray(p.nodes)){
  const ids=new Set();for(const n of p.nodes){if(!n||typeof n.id!=='string'||!n.id){errors.push('nó sem identificador');continue}if(ids.has(n.id))errors.push('identificador de nó repetido');ids.add(n.id)}
  if(Array.isArray(p.edges))for(const e of p.edges){if(!e||typeof e!=='object'){errors.push('conexão inválida');continue}const a=e.a??e.from??e.source,b=e.b??e.to??e.target;if(typeof a==='string'&&typeof b==='string'&&(!ids.has(a)||!ids.has(b)))errors.push('conexão com nó ausente')}
 }
 return errors;
};
bind('maintenanceIntegrity',async()=>{
 let raw;try{raw=localStorage.getItem('mentalista.projects.v1')}catch(e){throw Error('Acesso ao armazenamento bloqueado: '+e.message)}
 if(!raw){report('INTEGRIDADE DOS PROJETOS\nNenhum registro salvo foi encontrado. Nenhum dado foi alterado.');return}
 let data;try{data=JSON.parse(raw)}catch{report('INTEGRIDADE DOS PROJETOS\nO registro local não é um JSON válido. NÃO limpe os dados do navegador. Preserve uma cópia e procure restaurar um backup confiável.');return}
 if(!data||!Array.isArray(data.projects)){report('INTEGRIDADE DOS PROJETOS\nEstrutura geral inválida: lista de projetos ausente. Nenhum dado foi alterado.');return}
 const ids=new Set(),issues=[];for(let i=0;i<data.projects.length;i++){
  const p=data.projects[i];const problems=validateProject(p);if(ids.has(p?.id))problems.push('identificador de projeto repetido');ids.add(p?.id);
  if(problems.length)issues.push('Projeto '+(i+1)+': '+[...new Set(problems)].slice(0,6).join(', '));
 }
 if(data.active&&!ids.has(data.active))issues.push('O projeto ativo não existe na lista');
 report('INTEGRIDADE DOS PROJETOS (leitura apenas)\nProjetos examinados: '+data.projects.length+'\nOcorrências: '+issues.length+'\n'+(issues.length?issues.slice(0,25).join('\n')+(issues.length>25?'\n… outras ocorrências omitidas':''):'Nenhuma inconsistência estrutural básica identificada.')+'\n\nEsta verificação não garante que todo o conteúdo esteja correto. Nenhum projeto foi alterado.');
});
bind('maintenanceBackupCheck',async()=>{
 const input=document.createElement('input');input.type='file';input.accept='.json,application/json';
 const file=await new Promise(resolve=>{input.addEventListener('change',()=>resolve(input.files?.[0]||null),{once:true});input.click()});
 if(!file)return;if(file.size>80*1024*1024)throw Error('Arquivo acima de 80 MB; não foi analisado');
 let data;try{data=JSON.parse(await file.text())}catch{report('BACKUP: o arquivo selecionado não contém JSON válido. Nenhum dado foi alterado.');return}
 if(!data||data.format!=='mentalista-backup'||!Array.isArray(data.projects)){report('O arquivo não possui o formato esperado de backup geral do Mentalista. Nenhum dado foi alterado.');return}
 const issues=[];const ids=new Set();for(let i=0;i<data.projects.length;i++){const p=data.projects[i],problems=validateProject(p);if(ids.has(p?.id))problems.push('identificador de projeto repetido');ids.add(p?.id);if(problems.length)issues.push('Projeto '+(i+1)+': '+[...new Set(problems)].join(', '))}
 report('VERIFICAÇÃO DE BACKUP (sem importar)\nProjetos: '+data.projects.length+'\nProblemas estruturais: '+issues.length+'\n'+(issues.length?issues.slice(0,20).join('\n'):'Estrutura básica compatível com o formato de backup geral.')+'\n\nEsta inspeção não altera projetos e não garante restauração bem-sucedida.');
});
})();
