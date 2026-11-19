(()=>{'use strict';
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg',KEY='mentalista.projects.v1',THEME='mentalista.theme.v1';
let interactionMode='pointer';
let stagePrefs={showGrid:true,gridOpacity:25,snapToGrid:false};
const STAGE_PREFS_KEY='mentalista.stage.preferences.v28',GRID_STEP=30;
function applyStagePrefs(){
 const bg=document.getElementById('gridBg');
 if(bg){bg.style.display=stagePrefs.showGrid?'':'none';bg.style.opacity=String(stagePrefs.gridOpacity/25)}
 const show=document.getElementById('prefShowGrid'),intensity=document.getElementById('prefGridIntensity'),snap=document.getElementById('prefSnapGrid'),value=document.getElementById('prefGridValue');
 if(show)show.checked=stagePrefs.showGrid;
 if(intensity){intensity.value=String(stagePrefs.gridOpacity);intensity.disabled=!stagePrefs.showGrid}
 if(value)value.textContent=stagePrefs.gridOpacity+'%';
 if(snap)snap.checked=stagePrefs.snapToGrid;
}
function initializeStagePrefs(){
 try{const saved=JSON.parse(localStorage.getItem(STAGE_PREFS_KEY)||'null');if(saved&&typeof saved==='object')stagePrefs={showGrid:typeof saved.showGrid==='boolean'?saved.showGrid:true,gridOpacity:Number.isFinite(saved.gridOpacity)?Math.max(0,Math.min(100,saved.gridOpacity)):25,snapToGrid:typeof saved.snapToGrid==='boolean'?saved.snapToGrid:false}}catch{}
 const update=()=>{applyStagePrefs();try{localStorage.setItem(STAGE_PREFS_KEY,JSON.stringify(stagePrefs))}catch{notify('Não foi possível salvar as preferências')}};
 $('prefShowGrid').addEventListener('change',e=>{stagePrefs.showGrid=e.target.checked;update()});
 $('prefGridIntensity').addEventListener('input',e=>{stagePrefs.gridOpacity=Number(e.target.value);update()});
 $('prefSnapGrid').addEventListener('change',e=>{stagePrefs.snapToGrid=e.target.checked;update()});
 $('prefResetStage').addEventListener('click',()=>{stagePrefs={showGrid:true,gridOpacity:25,snapToGrid:false};update();notify('Preferências do Palco restauradas')});
 applyStagePrefs();
}
const snapCoord=value=>Math.round(value/GRID_STEP)*GRID_STEP;

// v31 — Navegação e acessibilidade; preferências locais e globais.
const NAV_PREFS_KEY='mentalista.navigation.preferences.v31';
const NAV_DEFAULTS={zoomSpeed:100,panSpeed:100,largeControls:false,reducedMotion:false};
let navPrefs={...NAV_DEFAULTS};
function applyNavPrefs(){
 document.body.classList.toggle('access-large-controls',navPrefs.largeControls);
 // Animações gerenciadas em Sistema e segurança (v32.2).
 for(const [id,key] of [['prefZoomSpeed','zoomSpeed'],['prefPanSpeed','panSpeed'],['prefLargeControls','largeControls']]){
  const field=$(id);if(field){if(field.type==='checkbox')field.checked=navPrefs[key];else field.value=String(navPrefs[key])}
 }
 for(const [id,key] of [['prefZoomSpeedValue','zoomSpeed'],['prefPanSpeedValue','panSpeed']]){const field=$(id);if(field)field.textContent=navPrefs[key]+'%'}
}
function initializeNavPrefs(){
 try{const saved=JSON.parse(localStorage.getItem(NAV_PREFS_KEY)||'null');if(saved&&typeof saved==='object'){
  for(const key of ['zoomSpeed','panSpeed'])if(Number.isFinite(saved[key]))navPrefs[key]=Math.max(25,Math.min(200,saved[key]));
  for(const key of ['largeControls','reducedMotion'])if(typeof saved[key]==='boolean')navPrefs[key]=saved[key];
 }}catch{}
 const update=()=>{try{localStorage.setItem(NAV_PREFS_KEY,JSON.stringify(navPrefs))}catch{notify('Não foi possível salvar as preferências')}applyNavPrefs()};
 for(const [id,key] of [['prefZoomSpeed','zoomSpeed'],['prefPanSpeed','panSpeed'],['prefLargeControls','largeControls']]){
  $(id).addEventListener(key==='zoomSpeed'||key==='panSpeed'?'input':'change',e=>{navPrefs[key]=e.target.type==='checkbox'?e.target.checked:Number(e.target.value);update()});
 }
 $('prefResetNav').addEventListener('click',()=>{navPrefs={...NAV_DEFAULTS};update();notify('Navegação e acessibilidade restauradas')});
 applyNavPrefs();
}
function zoomFactor(base){return Math.pow(base,navPrefs.zoomSpeed/100)}
// v30 — Preferências de caixas e tipografia (persistentes, sem alterar projetos anteriores).
const NODE_PREFS_KEY='mentalista.node.preferences.v30';
let nodePrefs={width:200,font:'Arial',fontSize:15,spacing:0};
function applyNodePrefs(){
 document.documentElement.style.setProperty('--node-font',JSON.stringify(nodePrefs.font));
 document.documentElement.style.setProperty('--node-font-size',nodePrefs.fontSize+'px');
 document.documentElement.style.setProperty('--node-letter-spacing',nodePrefs.spacing+'px');
 for(const [id,value] of [['prefNodeWidth',nodePrefs.width],['prefNodeFont',nodePrefs.font],['prefNodeFontSize',nodePrefs.fontSize],['prefNodeSpacing',nodePrefs.spacing]]){const e=$(id);if(e)e.value=String(value)}
 for(const [id,value] of [['prefNodeWidthValue',nodePrefs.width+' px'],['prefNodeFontSizeValue',nodePrefs.fontSize+' px'],['prefNodeSpacingValue',nodePrefs.spacing+' px']]){const e=$(id);if(e)e.textContent=value}
 if(current())render();
}
function initializeNodePrefs(){
 try{const v=JSON.parse(localStorage.getItem(NODE_PREFS_KEY)||'null');if(v){if(Number.isFinite(v.width))nodePrefs.width=Math.max(160,Math.min(360,v.width));if(['Arial','Verdana','Georgia','Tahoma','Courier New'].includes(v.font))nodePrefs.font=v.font;if(Number.isFinite(v.fontSize))nodePrefs.fontSize=Math.max(12,Math.min(22,v.fontSize));if(Number.isFinite(v.spacing))nodePrefs.spacing=Math.max(0,Math.min(3,v.spacing))}}catch{}
 const update=()=>{localStorage.setItem(NODE_PREFS_KEY,JSON.stringify(nodePrefs));applyNodePrefs()};
 for(const [id,key] of [['prefNodeWidth','width'],['prefNodeFont','font'],['prefNodeFontSize','fontSize'],['prefNodeSpacing','spacing']]){$(id).addEventListener(id==='prefNodeFont'?'change':'input',e=>{nodePrefs[key]=key==='font'?e.target.value:Number(e.target.value);update()})}
 $('prefResetNodes').addEventListener('click',()=>{nodePrefs={width:200,font:'Arial',fontSize:15,spacing:0};update();notify('Padrões de caixas restaurados')});applyNodePrefs();
}
// v29 — Preferências globais das conexões, sem alterar os dados de cada projeto.
const EDGE_PREFS_KEY='mentalista.edge.preferences.v29';
let edgePrefs={style:'curve',width:2};
function edgePath(A,B,style=edgePrefs.style){
 const dx=B.x-A.x,dy=B.y-A.y;
 if(style==='straight')return `M ${A.x} ${A.y} L ${B.x} ${B.y}`;
 if(style==='orthogonal'){
  if(Math.abs(dx)>=Math.abs(dy)){const mx=(A.x+B.x)/2;return `M ${A.x} ${A.y} L ${mx} ${A.y} L ${mx} ${B.y} L ${B.x} ${B.y}`}
  const my=(A.y+B.y)/2;return `M ${A.x} ${A.y} L ${A.x} ${my} L ${B.x} ${my} L ${B.x} ${B.y}`;
 }
 return `M ${A.x} ${A.y} C ${A.x+dx*.5} ${A.y}, ${B.x-dx*.5} ${B.y}, ${B.x} ${B.y}`;
}
function edgeDistance(point,A,B){
 const dx=B.x-A.x,dy=B.y-A.y;
 const sample=t=>{if(edgePrefs.style==='straight')return{x:A.x+dx*t,y:A.y+dy*t};if(edgePrefs.style==='orthogonal'){if(Math.abs(dx)>=Math.abs(dy)){const mx=(A.x+B.x)/2;return t<1/3?{x:A.x+(mx-A.x)*t*3,y:A.y}:t<2/3?{x:mx,y:A.y+dy*(t*3-1)}:{x:mx+(B.x-mx)*(t*3-2),y:B.y}}const my=(A.y+B.y)/2;return t<1/3?{x:A.x,y:A.y+(my-A.y)*t*3}:t<2/3?{x:A.x+dx*(t*3-1),y:my}:{x:B.x,y:my+(B.y-my)*(t*3-2)}}const u=1-t;return{x:u*u*u*A.x+3*u*u*t*(A.x+dx*.5)+3*u*t*t*(B.x-dx*.5)+t*t*t*B.x,y:u*u*u*A.y+3*u*u*t*A.y+3*u*t*t*B.y+ t*t*t*B.y}};
 let best=Infinity;for(let i=0;i<=72;i++){const q=sample(i/72);best=Math.min(best,Math.hypot(point.x-q.x,point.y-q.y))}return best;
}
function applyEdgePrefs(){
 document.documentElement.style.setProperty('--edge-width',String(edgePrefs.width));
 const style=$('prefEdgeStyle'),width=$('prefEdgeWidth'),out=$('prefEdgeWidthValue');
 if(style)style.value=edgePrefs.style;if(width)width.value=String(edgePrefs.width);if(out)out.textContent=edgePrefs.width+' px';
 if(current())render();
}
function initializeEdgePrefs(){
 try{const saved=JSON.parse(localStorage.getItem(EDGE_PREFS_KEY)||'null');if(saved){if(['curve','straight','orthogonal'].includes(saved.style))edgePrefs.style=saved.style;if(Number.isFinite(saved.width))edgePrefs.width=Math.max(1,Math.min(6,saved.width))}}catch{}
 const update=()=>{try{localStorage.setItem(EDGE_PREFS_KEY,JSON.stringify(edgePrefs))}catch{notify('Não foi possível salvar as conexões')}applyEdgePrefs()};
 $('prefEdgeStyle').addEventListener('change',e=>{edgePrefs.style=e.target.value;update()});
 $('prefEdgeWidth').addEventListener('input',e=>{edgePrefs.width=Number(e.target.value);update()});
 $('prefResetEdges').addEventListener('click',()=>{edgePrefs={style:'curve',width:2};update();notify('Conexões restauradas ao padrão')});
 applyEdgePrefs();
}


// Splash cinematográfico de quatro segundos; não bloqueia após a abertura.
window.addEventListener('load',()=>{const splash=document.getElementById('cinematicSplash');if(splash)window.setTimeout(()=>{splash.classList.add('splash-done');window.setTimeout(()=>splash.remove(),650)},4000)});
const ui={viewport:$('viewport'),canvas:$('canvas'),scene:$('scene'),nodes:$('nodes'),edges:$('edges')};let projects=[],active='',selected=[],camera={x:0,y:0,z:1},drag=null,history=[],future=[],saveTimer=null,search='',toastTimer,propertyOpen=false,selectedEdge=null;

// v16 — 10 identidades cromáticas × modos claro/escuro, persistidas independentemente dos projetos.
const APPEARANCE_KEY='mentalista.appearance.v14';
const PALETTES={
 original:{name:'Mentalista Original',colors:['#FBF3D0','#EBD08C','#D4AF37','#B8860B','#7C5E10']},
 menta:{name:'Mentalista Menta',colors:['#E3FDFD','#DAF5EB','#CFEEDB','#C3E3C9','#B9DBB9']},
 retro:{name:'Mentalista Retrô',colors:['#F6E2B3','#E7A84E','#D96C2C','#3E8E7E','#274C56']},
 safira:{name:'Mentalista Safira',colors:['#E3F6F5','#A7E0DB','#5FB0C9','#3E6D9C','#2A2F63']},
 lavanda:{name:'Mentalista Linho e Lavanda',colors:['#F5F1E8','#EADED8','#E7D8DB','#DACEDB','#CDBECE']},
 terracota:{name:'Mentalista Terracota',colors:['#F9F5EB','#EA5455','#F07B3F','#2D4059','#002B5B']},
 neon:{name:'Mentalista Neon',colors:['#FF4E7B','#FA32D1','#C74BFF','#5F37F6','#488CFF']},
 ferrugem:{name:'Mentalista Ferrugem',colors:['#F3B658','#EC9E3F','#E16D37','#CD502F','#B03228']},
 cafe:{name:'Mentalista Café com Avelã',colors:['#EDE4D3','#C9B79C','#9C7A54','#6B4F3A','#3E2E22']},
 indigo:{name:'Mentalista Índigo',colors:['#E7DFF7','#C6B4EE','#A48AE0','#7B5FD1','#4E2FB0']}
};
let appearance={palette:'original',mode:'light'};
const mixHex=(a,b,t)=>{const n=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const x=n(a),y=n(b);return '#'+x.map((v,i)=>Math.round(v*(1-t)+y[i]*t).toString(16).padStart(2,'0')).join('')};
const contrastInk=hex=>{const c=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722>.18?'#15202a':'#ffffff'};
function applyAppearance(){
 const pal=PALETTES[appearance.palette]||PALETTES.original, dark=appearance.mode==='dark',root=document.documentElement;
 document.body.classList.toggle('light',!dark);document.body.dataset.theme=appearance.palette;document.body.dataset.mode=appearance.mode;
 pal.colors.forEach((v,i)=>root.style.setProperty('--color-'+(i+1),v));
 // A paleta é a referência visual; fundos escuros são derivados para garantir legibilidade.
 const accent=dark?(appearance.palette==='original'?pal.colors[2]:appearance.palette==='menta'?pal.colors[3]:appearance.palette==='lavanda'?pal.colors[4]:appearance.palette==='neon'?pal.colors[2]:pal.colors[2]):(appearance.palette==='menta'?'#36765f':appearance.palette==='lavanda'?'#705777':appearance.palette==='neon'?pal.colors[3]:appearance.palette==='ferrugem'?pal.colors[4]:pal.colors[4]);
 const bg=dark?mixHex('#10151c',pal.colors[4],.11):mixHex('#ffffff',pal.colors[0],.45);
 const panel=dark?mixHex('#1b222c',pal.colors[4],.15):'#ffffff';
 const canvas=dark?mixHex('#111821',pal.colors[4],.12):mixHex('#ffffff',pal.colors[0],.66);
 const border=dark?mixHex('#4a5260',pal.colors[3],.17):mixHex('#d8dce1',pal.colors[3],.17);
 const muted=dark?'#adb7c6':'#626b76';
 Object.entries({'--bg':bg,'--panel':panel,'--canvas':canvas,'--text':dark?'#f6f7fa':'#202831','--muted':muted,'--border':border,'--accent':accent,'--accent-ink':contrastInk(accent),'--theme-soft':dark?mixHex('#25303a',pal.colors[3],.18):pal.colors[0],'--theme-medium':pal.colors[2]}).forEach(([k,v])=>root.style.setProperty(k,v));
 const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=panel;
 document.querySelectorAll('input[name="appearanceMode"]').forEach(r=>r.checked=r.value===appearance.mode);
 document.querySelectorAll('[data-theme-option]').forEach(b=>{const active=b.dataset.themeOption===appearance.palette;b.setAttribute('aria-checked',String(active));b.classList.toggle('is-selected',active)});
 const quick=$('themeQuick');if(quick){quick.textContent=dark?'☀':'☾';quick.title=dark?'Ativar modo claro':'Ativar modo escuro'};const status=$('settingsCurrent');if(status)status.textContent=pal.name+' · '+(dark?'Escuro':'Claro');
 try{localStorage.setItem(APPEARANCE_KEY,JSON.stringify(appearance));localStorage.setItem(THEME,appearance.mode)}catch{}
}
function initializeAppearance(){
 try{const saved=JSON.parse(localStorage.getItem(APPEARANCE_KEY)||'null');if(saved&&PALETTES[saved.palette]&&['light','dark'].includes(saved.mode))appearance=saved;else if(localStorage.getItem(THEME)==='dark')appearance.mode='dark'}catch{}
 const gallery=$('themeGallery');gallery.replaceChildren();
 Object.entries(PALETTES).forEach(([key,pal])=>{const b=document.createElement('button');b.type='button';b.className='theme-option';b.dataset.themeOption=key;b.setAttribute('role','radio');b.setAttribute('aria-label',pal.name);const swatches=document.createElement('span');swatches.className='theme-swatches';pal.colors.forEach(c=>{const span=document.createElement('i');span.style.backgroundColor=c;span.setAttribute('aria-hidden','true');swatches.append(span)});const name=document.createElement('strong');name.textContent=pal.name;b.append(swatches,name);b.addEventListener('click',()=>{appearance.palette=key;applyAppearance()});gallery.append(b)});
 document.querySelectorAll('input[name="appearanceMode"]').forEach(r=>r.addEventListener('change',()=>{if(r.checked){appearance.mode=r.value;applyAppearance()}}));
 initializeStagePrefs();initializeEdgePrefs();initializeNodePrefs();initializeNavPrefs();initSecurityPrefs();$('settingsClose').addEventListener('click',()=>$('settingsDialog').close());$('settingsDone').addEventListener('click',()=>$('settingsDialog').close());applyAppearance();
}
$('themeQuick').addEventListener('click',()=>{appearance.mode=appearance.mode==='dark'?'light':'dark';applyAppearance()});
$('fullscreenQuick').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.()});
function openSettings(){document.querySelectorAll('.menu').forEach(m=>m.open=false);$('settingsDialog').showModal()}

const uid=()=>globalThis.crypto?.randomUUID?.()||'m'+Date.now().toString(36)+Math.random().toString(36).slice(2);
const newMap=(name='Meu primeiro mapa')=>{const a=uid();return{id:uid(),name,created:Date.now(),updated:Date.now(),nodes:[{id:a,x:0,y:0,title:'Novo nó',desc:'',color:'slate'}],edges:[]}};
const current=()=>projects.find(p=>p.id===active),clone=v=>JSON.parse(JSON.stringify(v));
function notify(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2500)}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({projects,active}));$('saveStatus').textContent='Salvo localmente'}catch(e){$('saveStatus').textContent='Erro ao salvar';notify('Armazenamento cheio ou indisponível. Exporte um backup!')}}
function scheduleSave(){const p=current();if(p)p.updated=Date.now();$('saveStatus').textContent='Salvando…';clearTimeout(saveTimer);saveTimer=setTimeout(persist,220)}
function snapshot(){const p=current();if(!p)return;history.push(clone({nodes:p.nodes,edges:p.edges}));if(history.length>80)history.shift();future=[];updateHistoryButtons()}
function updateHistoryButtons(){$('undo').disabled=$('quickUndo').disabled=!history.length;$('redo').disabled=$('quickRedo').disabled=!future.length}
function restore(state){selectedEdge=null;const p=current();if(!p)return;p.nodes=clone(state.nodes);p.edges=clone(state.edges);selected=selected.filter(id=>p.nodes.some(n=>n.id===id));render();scheduleSave()}
function undo(){if(!history.length)return;const p=current();future.push(clone({nodes:p.nodes,edges:p.edges}));restore(history.pop());updateHistoryButtons()}
function redo(){if(!future.length)return;const p=current();history.push(clone({nodes:p.nodes,edges:p.edges}));restore(future.pop());updateHistoryButtons()}
// v33 — organização automática determinística, preservando nós, conexões e fixações.
function organizeMap(mode){
 const project=current();if(!project||!project.nodes.length)return notify('Não há caixas para organizar');
 const nodes=project.nodes, byId=new Map(nodes.map(n=>[n.id,n]));
 const adj=new Map(nodes.map(n=>[n.id,new Set()]));
 for(const edge of project.edges){if(adj.has(edge.a)&&adj.has(edge.b)){adj.get(edge.a).add(edge.b);adj.get(edge.b).add(edge.a)}}
 const order=new Map(nodes.map((n,i)=>[n.id,i]));
 const visited=new Set(),components=[];
 // Os componentes são independentes. O primeiro nó é a raiz do seu componente.
 for(const root of nodes){if(visited.has(root.id))continue;
  const queue=[root.id],levels=new Map([[root.id,0]]),parents=new Map();visited.add(root.id);
  for(let k=0;k<queue.length;k++){
   const id=queue[k],neighbors=[...adj.get(id)].sort((a,b)=>order.get(a)-order.get(b));
   for(const next of neighbors)if(!visited.has(next)){visited.add(next);levels.set(next,levels.get(id)+1);parents.set(next,id);queue.push(next)}
  }
  components.push({queue,levels,parents});
 }
 const gapX=76,gapY=42,proposals=new Map();let componentY=0;
 for(const comp of components){
  const layers=new Map();for(const id of comp.queue){const level=comp.levels.get(id);if(!layers.has(level))layers.set(level,[]);layers.get(level).push(id)}
  const maxLevel=Math.max(...layers.keys());
  // Ordem estável: nós irmãos agrupados pelo ancestral, evitando cruzamentos desnecessários.
  for(let d=1;d<=maxLevel;d++)layers.get(d).sort((a,b)=>order.get(comp.parents.get(a))-order.get(comp.parents.get(b))||order.get(a)-order.get(b));
  const rowGap=gapY, widthAt=d=>Math.max(...(layers.get(d)||[]).map(id=>nodeWidth(byId.get(id))),nodePrefs.width);
  if(mode==='radial'){
   const root=comp.queue[0],rootNode=byId.get(root),cx=componentY+rootNode.x,cy=componentY+rootNode.y;
   // Componentes adicionais são separados no eixo horizontal.
   const baseX=components.indexOf(comp)*1000;
   proposals.set(root,{x:baseX,y:0});
   const others=comp.queue.filter(id=>id!==root);
   const count=others.length;
   const maxH=Math.max(...comp.queue.map(id=>nodeHeight(byId.get(id))));
   const maxW=Math.max(...comp.queue.map(id=>nodeWidth(byId.get(id))));
   const radius=Math.max(250,Math.ceil(count/(2*Math.PI))*(Math.max(maxW,maxH)+gapX));
   others.forEach((id,i)=>{const angle=-Math.PI/2+2*Math.PI*i/Math.max(1,count),n=byId.get(id);proposals.set(id,{x:Math.round(baseX+radius*Math.cos(angle)),y:Math.round(radius*Math.sin(angle))})});
   continue;
  }
  const horizontal=mode==='tree';
  const layerCrossSizes=new Map();let largestCross=0;
  for(const [depth,ids] of layers){const cross=ids.reduce((sum,id)=>sum+(horizontal?nodeHeight(byId.get(id)):nodeWidth(byId.get(id)))+rowGap,-rowGap);layerCrossSizes.set(depth,cross);largestCross=Math.max(largestCross,cross)}
  let major=0;
  for(let depth=0;depth<=maxLevel;depth++){
   const ids=layers.get(depth),cross=layerCrossSizes.get(depth);let minor=(largestCross-cross)/2;
   for(const id of ids){const n=byId.get(id);proposals.set(id,horizontal?{x:major,y:componentY+minor}:{x:minor,y:componentY+major});minor+=(horizontal?nodeHeight(n):nodeWidth(n))+rowGap}
   major+=widthAt(depth)+gapX;
  }
  componentY+=horizontal?largestCross+240:major+240;
 }
 // Nós fixados não mudam. Evitar que nós móveis sejam colocados sobre eles.
 const occupied=nodes.filter(n=>n.pinned).map(n=>({x:n.x,y:n.y,w:nodeWidth(n),h:nodeHeight(n)}));
 const intersects=(a,b)=>a.x<b.x+b.w+24&&a.x+a.w+24>b.x&&a.y<b.y+b.h+24&&a.y+a.h+24>b.y;
 const movable=nodes.filter(n=>!n.pinned);
 const positions=new Map();
 for(const n of movable){const p=proposals.get(n.id);if(!p)continue;let rect={x:p.x,y:p.y,w:nodeWidth(n),h:nodeHeight(n)};let attempts=0;
  while(occupied.some(other=>intersects(rect,other))&&attempts++<500)rect.y+=Math.max(48,rect.h+gapY);
  occupied.push(rect);positions.set(n.id,rect);
 }
 if(!positions.size)return notify('Todos os nós estão fixados');
 // A operação inteira é uma única etapa de Desfazer.
 snapshot();for(const [id,pos] of positions){const n=byId.get(id);n.x=Math.round(pos.x);n.y=Math.round(pos.y)}
 selectedEdge=null;render();scheduleSave();
 document.querySelectorAll('.menu').forEach(m=>m.open=false);
 notify('Mapa organizado: '+({tree:'árvore',hierarchy:'hierarquia',radial:'radial'}[mode]||mode));
}
function projectOptions(){$('projects').replaceChildren(...projects.map(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.name;return o}));$('projects').value=active;$('projectName').textContent=current()?.name||''}
function openProject(id){if(!projects.some(p=>p.id===id))return;if($('findPanel')&&!$('findPanel').hidden){$('findInput').value='';search='';findMatches=[];refreshFind()}active=id;selected=[];selectedEdge=null;history=[];future=[];projectOptions();render();requestAnimationFrame(fit);persist()}
function showMyProjects(){
  const dialog=$('projectsDialog'),list=$('projectsList');
  list.replaceChildren();
  for(const p of projects){
    const button=document.createElement('button');button.type='button';button.className='project-entry';
    const title=document.createElement('strong');title.textContent=p.name;
    const meta=document.createElement('small');meta.textContent=`${p.nodes.length} caixa(s) · ${p.edges.length} elo(s)${p.id===active?' · Projeto atual':''}`;
    button.append(title,meta);
    button.addEventListener('click',()=>{openProject(p.id);dialog.close();notify('Projeto aberto: '+p.name)});
    list.append(button);
  }
  document.querySelectorAll('.menu').forEach(m=>m.open=false);
  dialog.showModal();
}
function addProject(){const name=prompt('Nome do novo projeto:','Novo mapa mental');if(name===null)return;const p=newMap(name.trim().slice(0,90)||'Novo mapa mental');projects.push(p);openProject(p.id);notify('Projeto criado')}
function renameProject(){const p=current(),name=prompt('Renomear projeto:',p.name);if(name===null)return;if(!name.trim())return notify('O nome não pode ficar vazio');p.name=name.trim().slice(0,90);projectOptions();scheduleSave()}
function deleteProject(){if(!confirm('Excluir este projeto e todos os seus nós? Esta ação não poderá ser desfeita.'))return;projects=projects.filter(p=>p.id!==active);if(!projects.length)projects.push(newMap());openProject(projects[0].id)}
const el=(tag,attrs={},txt)=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(txt!==undefined)e.textContent=txt;return e};
const getNode=id=>current()?.nodes.find(n=>n.id===id),nodeWidth=n=>n.kind==='text'?360:nodePrefs.width,nodeHeight=n=>n.kind==='text'?Math.max(245,Math.min(620,n.textHeight||360)):n.kind==='list'?Math.max(118,67+Math.min(30,(n.items||[]).length)*25+35):104,center=n=>({x:n.x+nodeWidth(n)/2,y:n.y+nodeHeight(n)/2});
// v32.1: medição real da fonte SVG (inclusive tipografia personalizada).
// Preserva o texto completo nos dados; limita apenas a representação no Palco.
function fitStageLabel(label,maxWidth){
 if(!label||!(maxWidth>0))return;
 const original=label.textContent||'';
 if(!original)return;
 const measure=()=>{try{return label.getComputedTextLength()}catch{return Infinity}};
 if(measure()<=maxWidth)return;
 const chars=Array.from(original);
 let lo=0,hi=chars.length;
 while(lo<hi){
  const mid=Math.ceil((lo+hi)/2);
  label.textContent=chars.slice(0,mid).join('')+'…';
  if(measure()<=maxWidth)lo=mid;else hi=mid-1;
 }
 label.textContent=lo?chars.slice(0,lo).join('')+'…':'…';
}
// v34: visibilidade derivada das conexões direcionadas; não exclui dados.
function visibleBranches(project=current()){
 const visible=new Set();if(!project)return visible;
 const ids=new Set(project.nodes.map(n=>n.id));const incoming=new Set(),children=new Map(project.nodes.map(n=>[n.id,[]]));
 for(const e of project.edges)if(ids.has(e.a)&&ids.has(e.b)&&e.a!==e.b){children.get(e.a).push(e.b);incoming.add(e.b)}
 const roots=project.nodes.filter(n=>!incoming.has(n.id));
 const walk=start=>{const queue=[start];for(let i=0;i<queue.length;i++){const id=queue[i];if(visible.has(id))continue;visible.add(id);const n=project.nodes.find(x=>x.id===id);if(n&&!n.collapsed)queue.push(...children.get(id))}};
 roots.forEach(n=>walk(n.id));
 // Componentes cíclicos sem raiz: mantenha um ponto de entrada visível.
 const undirected=new Map(project.nodes.map(n=>[n.id,new Set()]));
 for(const e of project.edges)if(ids.has(e.a)&&ids.has(e.b)){undirected.get(e.a).add(e.b);undirected.get(e.b).add(e.a)}
 const inspected=new Set();for(const n of project.nodes){if(inspected.has(n.id))continue;const group=[n.id];inspected.add(n.id);for(let i=0;i<group.length;i++)for(const next of undirected.get(group[i]))if(!inspected.has(next)){inspected.add(next);group.push(next)}if(!group.some(id=>visible.has(id)))walk(group[0])}
 return visible;
}
function branchDescendants(id,project=current()){
 if(!project)return [];
 const children=new Map(project.nodes.map(n=>[n.id,[]]));
 for(const e of project.edges)if(children.has(e.a)&&children.has(e.b)&&e.a!==e.b)children.get(e.a).push(e.b);
 const found=new Set(),queue=[id];for(let i=0;i<queue.length;i++)for(const child of children.get(queue[i])||[])if(child!==id&&!found.has(child)){found.add(child);queue.push(child)}
 return [...found];
}
function toggleBranch(id){const n=getNode(id);if(!n||!branchDescendants(id).length)return;snapshot();n.collapsed=!n.collapsed;selected=selected.filter(x=>visibleBranches().has(x));render();scheduleSave();notify(n.collapsed?'Ramificação recolhida':'Ramificação expandida')}
function render(){const p=current();if(!p)return;const visible=visibleBranches(p);selected=selected.filter(id=>visible.has(id));const scrollOffsets=new Map([...ui.nodes.querySelectorAll('.node[data-id] .stage-scroll-body')].map(b=>[b.closest('.node').dataset.id,b.scrollTop]));ui.nodes.replaceChildren();ui.edges.replaceChildren();for(const e of p.edges){const a=getNode(e.a),b=getNode(e.b);if(!a||!b||!visible.has(a.id)||!visible.has(b.id))continue;const ac=center(a),bc=center(b),d=edgePath(ac,bc);ui.edges.append(el('path',{d,class:'edge'+(selectedEdge===p.edges.indexOf(e)?' edge-picked':selected.includes(a.id)&&selected.includes(b.id)?' active':'')}))}
for(const n of [...p.nodes].filter(n=>visible.has(n.id)).sort((a,b)=>Number(a.kind==='text')-Number(b.kind==='text'))){const g=el('g',{class:'node'+(selected.includes(n.id)?' selected':'')+(search&&(normalizeFind(n.title+' '+(n.desc||'')+' '+(n.items||[]).join(' ')+' '+(n.textPlain||'')).includes(normalizeFind(search)))?' match':''),'data-id':n.id,'data-color':n.color||'violet',transform:`translate(${n.x},${n.y})`,tabindex:'0',role:'button','aria-label':'Nó: '+n.title});const baseRect=el('rect',{width:nodeWidth(n),height:nodeHeight(n),rx:12});if(/^#[0-9a-fA-F]{6}$/.test(n.color||'')){baseRect.style.fill=n.color;baseRect.style.stroke=n.color}g.append(baseRect);if(/^#[0-9a-fA-F]{6}$/.test(n.color||'')){const rgb=[1,3,5].map(i=>parseInt(n.color.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);const lum=.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];g.style.setProperty('--node-ink',lum>.19?'#182334':'#ffffff')}const title=n.title||'Sem título';const t=el('text',{x:14,y:30});t.classList.add('stage-content-label');t.textContent=title;if(n.kind==='text')g.append(t);if(n.kind==='text'){const fo=el('foreignObject',{x:12,y:44,width:nodeWidth(n)-24,height:nodeHeight(n)-94});const div=document.createElement('div');div.setAttribute('xmlns','http://www.w3.org/1999/xhtml');div.className='text-node-body stage-scroll-body';div.innerHTML=sanitizeEditor(n.html||'');fo.append(div);g.append(fo)}else if(n.kind==='list'||n.kind==='node'||!n.kind){
 const fo=el('foreignObject',{x:12,y:12,width:nodeWidth(n)-24,height:Math.max(35,nodeHeight(n)-54)});
 const body=document.createElement('div');body.setAttribute('xmlns','http://www.w3.org/1999/xhtml');body.className='stage-scroll-body stage-plain-body';
 const heading=document.createElement('div');heading.className='stage-scroll-title';heading.textContent=title;body.append(heading);
 if(n.kind==='list'){
  const style=n.listStyle||'bullet';(n.items||[]).forEach((item,i)=>{
   const row=document.createElement('div');row.className='stage-scroll-row'+((n.checked||[]).includes(i)?' done':'');
   if(style==='check'){
    const check=document.createElement('button');check.type='button';check.className='stage-scroll-check';check.dataset.checkNode=n.id;check.dataset.checkIndex=i;check.setAttribute('role','checkbox');check.setAttribute('aria-checked',String((n.checked||[]).includes(i)));check.setAttribute('aria-label',((n.checked||[]).includes(i)?'Desmarcar ':'Marcar ')+item);check.textContent=(n.checked||[]).includes(i)?'✓':'';row.append(check);
   }else{const mark=document.createElement('span');mark.className='stage-scroll-mark';mark.textContent=style==='number'?`${i+1}.`:'•';row.append(mark)}
   const text=document.createElement('span');text.className='stage-scroll-item';text.textContent=item;row.append(text);body.append(row);
  });
 }else if(n.desc){const description=document.createElement('div');description.className='stage-scroll-desc';description.textContent=n.desc;body.append(description)}
 fo.append(body);g.append(fo);
 }
 // Rodapé de ações disponível em todas as caixas, inclusive textos integrados.
const footerY=nodeHeight(n)-15;
const actions=n.kind==='list'?[['copy','⧉','Copiar lista'],['style','☷','Alternar marcadores'],['pin',n.pinned?'▣':'◇',n.pinned?'Desafixar':'Fixar'],['edit','✎','Editar lista']]:n.kind==='text'?[['copy','⧉','Copiar texto'],['pin',n.pinned?'▣':'◇',n.pinned?'Desafixar':'Fixar'],['edit','✎','Editar texto']]:[['copy','⧉','Copiar nó'],['pin',n.pinned?'▣':'◇',n.pinned?'Desafixar':'Fixar'],['edit','✎','Editar nó']];
if(n.kind==='text'||n.kind==='node'||!n.kind){g.append(el('line',{x1:12,x2:nodeWidth(n)-12,y1:footerY-23,y2:footerY-23,class:'node-footer-divider'}))}
// Barra inferior: ações à esquerda e indicadores à direita, sempre dentro do nó.
const descendants=branchDescendants(n.id,p);
const footerRight=nodeWidth(n)-18;
const indicatorSpace=descendants.length?32:0;
const actionMax=footerRight-indicatorSpace-16;
const actionStep=Math.min(34,Math.max(20,(actionMax-34)/Math.max(1,actions.length-1)));
actions.forEach(([action,symbol,label],i)=>{
 const x=20+i*actionStep;
 const b=el('g',{class:'list-tool','data-list-action':action,'data-list-id':n.id,role:'button',tabindex:'0','aria-label':label});
 b.append(el('rect',{x:x-11,y:footerY-15,width:23,height:25,rx:5,class:'list-tool-hit'}));
 b.append(el('text',{x,y:footerY+2,'text-anchor':'middle',class:'list-tool-icon'},symbol));g.append(b)
});
if(descendants.length){
 const bx=footerRight,by=footerY-4;
 const b=el('g',{class:'branch-toggle','data-branch-toggle':n.id,role:'button',tabindex:'0','aria-label':(n.collapsed?'Expandir':'Recolher')+' ramificação de '+n.title});
 b.append(el('circle',{cx:bx,cy:by,r:13,class:'branch-toggle-hit'}));
 b.append(el('circle',{cx:bx,cy:by,r:n.collapsed?10:5,class:'branch-toggle-disc'}));
 if(n.collapsed){
  const count=String(descendants.length);
  b.append(el('text',{x:bx,y:by+0.5,class:'branch-mini-count digits-'+Math.min(count.length,4),'text-anchor':'middle','dominant-baseline':'middle','aria-hidden':'true'},count));
  b.setAttribute('aria-label','Expandir ramificação: '+descendants.length+' nós ocultos');
  b.append(el('title',{},descendants.length+' nós ocultos — clicar para expandir'));
 }else b.append(el('title',{},'Recolher ramificação'));
 g.append(b);
}
// Metadados discretos: descrição acessível no nó, sem sobrepor conteúdo ou controles.
if(n.priority&&n.priority!=='none'||n.tags?.length||n.due){
 const parts=[n.priority&&n.priority!=='none'?'Prioridade '+n.priority:'',n.tags?.length?'Etiquetas: '+n.tags.join(', '):'',n.due?'Prazo: '+n.due.split('-').reverse().join('/'):''].filter(Boolean);
 g.setAttribute('aria-label','Nó: '+n.title+'. '+parts.join('. '));
 g.append(el('title',{},parts.join(' · ')));
}
// O estado de fixação já é indicado pelo botão Fixar/Desafixar no rodapé.
const port=el('g',{class:'node-port','data-port':n.id,role:'button','aria-label':'Arrastar para conectar ou criar filho'});port.append(el('circle',{cx:nodeWidth(n),cy:nodeHeight(n)/2,r:15,class:'port-disc'}));port.append(el('text',{x:nodeWidth(n),y:nodeHeight(n)/2+6,'text-anchor':'middle',class:'port-plus'},'+'));g.append(port);ui.nodes.append(g);for(const label of g.querySelectorAll('.stage-content-label'))fitStageLabel(label,nodeWidth(n)-Number(label.getAttribute('x')||14)-13)}
for(const b of ui.nodes.querySelectorAll('.node[data-id] .stage-scroll-body'))b.scrollTop=scrollOffsets.get(b.closest('.node').dataset.id)||0;miniQueue();
$('edgeActions').hidden=selectedEdge===null||!p.edges[selectedEdge];$('stats').textContent=`${p.nodes.length} caixas · ${p.edges.length} conexões`;$('toolbar').classList.toggle('has-selection',selected.length>0);$('overview').innerHTML=`<strong>${p.nodes.length}</strong> nós<br><strong>${p.edges.length}</strong> conexões<br><strong>${selected.length}</strong> selecionados`;updateForm();updateHistoryButtons();applyCamera()}
function updateForm(){const n=selected.length===1?getNode(selected[0]):null;if(!n){setPropertyOpen(false);return;}if(document.activeElement!==$('nodeTitle'))$('nodeTitle').value=n.title;if(document.activeElement!==$('nodeDesc'))$('nodeDesc').value=n.desc||'';$('nodeColor').value=n.color||'violet'}
function choose(id,multi=false){selectedEdge=null;if(multi){selected=selected.includes(id)?selected.filter(v=>v!==id):[...selected,id]}else selected=[id];render()}
// v35 — duplicação segura com novos IDs e preservação dos dados originais.
function duplicateSelection(withBranches=false){
 const p=current();if(!p||selected.length!==1)return notify('Selecione uma caixa para duplicar');
 const root=selected[0],ids=withBranches?[root,...branchDescendants(root,p)]:[root];
 const source=p.nodes.filter(n=>ids.includes(n.id));if(!source.length)return;
 if(p.nodes.length+source.length>1500)return notify('Limite de caixas atingido');
 const idsMap=new Map(source.map(n=>[n.id,uid()]));
 snapshot();const offset=48;
 const copies=source.map(n=>({...clone(n),id:idsMap.get(n.id),x:n.x+offset,y:n.y+offset,pinned:false}));
 p.nodes.push(...copies);
 if(withBranches){for(const edge of [...p.edges])if(idsMap.has(edge.a)&&idsMap.has(edge.b))p.edges.push({...clone(edge),a:idsMap.get(edge.a),b:idsMap.get(edge.b)})}
 selected=[idsMap.get(root)];selectedEdge=null;render();scheduleSave();notify(withBranches?`${copies.length} caixas duplicadas`:'Caixa duplicada');
}
function openNodeMetadata(){
 if(selected.length!==1)return notify('Selecione uma caixa para editar os detalhes');
 const n=getNode(selected[0]);if(!n)return;
 const dialog=$('nodeMetadataDialog');dialog.dataset.nodeId=n.id;
 $('metaPriority').value=n.priority||'none';$('metaTags').value=(n.tags||[]).join(', ');$('metaDue').value=n.due||'';
 dialog.showModal();
}
function saveNodeMetadata(e){
 e.preventDefault();const dialog=$('nodeMetadataDialog'),n=getNode(dialog.dataset.nodeId);if(!n){dialog.close();return}
 const priority=$('metaPriority').value;
 const tags=[...new Set($('metaTags').value.split(',').map(x=>x.trim().slice(0,32)).filter(Boolean))].slice(0,8);
 const due=$('metaDue').value;
 if(due&&!/^\d{4}-\d{2}-\d{2}$/.test(due))return notify('Prazo inválido');
 snapshot();n.priority=priority;n.tags=tags;n.due=due;dialog.close();render();scheduleSave();notify('Detalhes salvos');
}
$('nodeMetadataForm').addEventListener('submit',saveNodeMetadata);
$('metaCancel').addEventListener('click',()=>$('nodeMetadataDialog').close());
for(const [id,fn] of [['duplicateNode',()=>duplicateSelection(false)],['duplicateBranch',()=>duplicateSelection(true)],['editNodeMetadata',openNodeMetadata]])$(id).addEventListener('click',fn);
function addNode(kind='free'){const p=current(),parent=getNode(selected.at(-1));snapshot();const n={id:uid(),x:0,y:0,title:'Novo nó',desc:'',color:'slate'};if(kind==='child'&&parent){n.x=parent.x+300;n.y=parent.y+p.nodes.filter(x=>x.x===parent.x+300).length*90;p.edges.push({a:parent.id,b:n.id})}else if(kind==='sibling'&&parent){const incoming=p.edges.find(e=>e.b===parent.id);const ancestor=incoming&&getNode(incoming.a);n.x=parent.x;n.y=parent.y+100;if(ancestor)p.edges.push({a:ancestor.id,b:n.id})}else{const r=ui.viewport.getBoundingClientRect();n.x=(r.width/2-camera.x)/camera.z-100;n.y=(r.height/2-camera.y)/camera.z-35}p.nodes.push(n);selected=[n.id];render();scheduleSave()}
function removeSelected(){if(selectedEdge!==null){removeSelectedEdge();return}if(!selected.length)return;const p=current();if(p.nodes.length===selected.length){notify('O mapa precisa manter pelo menos um nó');return}snapshot();p.nodes=p.nodes.filter(n=>!selected.includes(n.id));p.edges=p.edges.filter(e=>!selected.includes(e.a)&&!selected.includes(e.b));selected=[];render();scheduleSave()}
function removeSelectedEdge(){const p=current();if(selectedEdge===null||!p.edges[selectedEdge])return;snapshot();p.edges.splice(selectedEdge,1);selectedEdge=null;render();scheduleSave();notify('Elo removido; caixas preservadas')}
function connect(){if(selected.length!==2)return notify('Selecione dois nós usando Ctrl + clique');const p=current(),[a,b]=selected;if(a===b)return;snapshot();const i=p.edges.findIndex(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));if(i>=0){p.edges.splice(i,1);notify('Conexão removida')}else{p.edges.push({a,b});notify('Nós conectados')}render();scheduleSave()}
// v36 — minimapa navegável: usa as mesmas coordenadas do Palco, sem modificar nós.
let miniTransform=null,miniDrag=false,miniFrame=0;
function miniRender(){miniFrame=0;const panel=$('miniMapPanel'),canvas=$('miniMapCanvas'),p=current();if(!panel||panel.hidden||!p)return;const ctx=canvas.getContext('2d');if(!ctx)return;const W=canvas.width,H=canvas.height;ctx.clearRect(0,0,W,H);const nodes=p.nodes.filter(n=>visibleBranches(p).has(n.id));if(!nodes.length)return;const view=ui.viewport.getBoundingClientRect(),a=-camera.x/camera.z,b=-camera.y/camera.z,vw=view.width/camera.z,vh=view.height/camera.z;const x0=Math.min(a,...nodes.map(n=>n.x))-35,y0=Math.min(b,...nodes.map(n=>n.y))-35,x1=Math.max(a+vw,...nodes.map(n=>n.x+nodeWidth(n)))+35,y1=Math.max(b+vh,...nodes.map(n=>n.y+nodeHeight(n)))+35;const scale=Math.min((W-18)/(x1-x0),(H-18)/(y1-y0)),ox=(W-(x1-x0)*scale)/2,oy=(H-(y1-y0)*scale)/2;miniTransform={x0,y0,scale,ox,oy};const X=x=>ox+(x-x0)*scale,Y=y=>oy+(y-y0)*scale;ctx.lineWidth=2;ctx.strokeStyle='#9b9eaa';for(const e of p.edges){const na=nodes.find(n=>n.id===e.a),nb=nodes.find(n=>n.id===e.b);if(!na||!nb)continue;ctx.beginPath();ctx.moveTo(X(na.x+nodeWidth(na)/2),Y(na.y+nodeHeight(na)/2));ctx.lineTo(X(nb.x+nodeWidth(nb)/2),Y(nb.y+nodeHeight(nb)/2));ctx.stroke()}for(const n of nodes){ctx.fillStyle= /^#[0-9a-f]{6}$/i.test(n.color||'')?n.color:({violet:'#8650ca',blue:'#08a5c5',green:'#2fa577',orange:'#ff7017',rose:'#e64e56',yellow:'#efc400',slate:'#d7dce6'}[n.color]||'#b2a1db');ctx.fillRect(X(n.x),Y(n.y),Math.max(3,nodeWidth(n)*scale),Math.max(3,nodeHeight(n)*scale))}ctx.fillStyle='rgba(104,83,220,.12)';ctx.strokeStyle='#7152d8';ctx.lineWidth=3;ctx.fillRect(X(a),Y(b),vw*scale,vh*scale);ctx.strokeRect(X(a),Y(b),vw*scale,vh*scale)}
function miniQueue(){if(!miniFrame)miniFrame=requestAnimationFrame(miniRender)}
function miniGo(e){if(!miniTransform)return;const canvas=$('miniMapCanvas'),r=canvas.getBoundingClientRect(),u=(e.clientX-r.left)*canvas.width/r.width,v=(e.clientY-r.top)*canvas.height/r.height,{x0,y0,scale,ox,oy}=miniTransform;const x=x0+(u-ox)/scale,y=y0+(v-oy)/scale,rect=ui.viewport.getBoundingClientRect();camera.x=rect.width/2-x*camera.z;camera.y=rect.height/2-y*camera.z;applyCamera()}
$('miniMapCanvas').addEventListener('pointerdown',e=>{if(e.button!==0)return;miniDrag=true;e.currentTarget.setPointerCapture(e.pointerId);miniGo(e)});
$('miniMapCanvas').addEventListener('pointermove',e=>{if(miniDrag)miniGo(e)});
for(const ev of ['pointerup','pointercancel','lostpointercapture'])$('miniMapCanvas').addEventListener(ev,()=>miniDrag=false);
$('miniMapCanvas').addEventListener('keydown',e=>{const d={ArrowLeft:[-100,0],ArrowRight:[100,0],ArrowUp:[0,-100],ArrowDown:[0,100]}[e.key];if(d){e.preventDefault();camera.x-=d[0]*camera.z;camera.y-=d[1]*camera.z;applyCamera()}});
function miniToggle(show){$('miniMapPanel').hidden=!show;$('miniMapShow').hidden=show;try{localStorage.setItem('mentalista.minimap.visible.v36',String(show))}catch{}miniQueue()}
$('miniMapHide').addEventListener('click',()=>miniToggle(false));$('miniMapShow').addEventListener('click',()=>miniToggle(true));$('miniMapMenu')?.addEventListener('click',()=>{miniToggle($('miniMapPanel').hidden);document.querySelectorAll('.menu').forEach(m=>m.open=false)});
miniToggle(localStorage.getItem('mentalista.minimap.visible.v36')!=='false');
window.addEventListener('resize',miniQueue);
function applyCamera(){ui.scene.setAttribute('transform',`translate(${camera.x} ${camera.y}) scale(${camera.z})`);$('zoomLabel').textContent=Math.round(camera.z*100)+'%';miniQueue()}
function centerSelectedOrFit(){const n=selected.length===1?getNode(selected[0]):null;if(!n)return fit();const r=ui.viewport.getBoundingClientRect();const w=nodeWidth(n),h=nodeHeight(n);camera.z=Math.min(2.2,Math.max(.3,Math.min((r.width-100)/w,(r.height-180)/h)));camera.x=r.width/2-(n.x+w/2)*camera.z;camera.y=r.height/2-(n.y+h/2)*camera.z;applyCamera()}
function fit(){const p=current();if(!p?.nodes.length){camera={x:0,y:0,z:1};applyCamera();return}const shown=p.nodes.filter(n=>visibleBranches(p).has(n.id));if(!shown.length)return;const r=ui.viewport.getBoundingClientRect(),xs=shown.map(n=>n.x),ys=shown.map(n=>n.y),left=Math.min(...xs),top=Math.min(...ys),right=Math.max(...shown.map(n=>n.x+nodeWidth(n))),bottom=Math.max(...shown.map(n=>n.y+nodeHeight(n)));camera.z=Math.min(1.7,Math.max(.2,Math.min((r.width-100)/(right-left),(r.height-160)/(bottom-top))));camera.x=r.width/2-(left+right)/2*camera.z;camera.y=r.height/2-(top+bottom)/2*camera.z;applyCamera()}
function zoom(f,px,py){const r=ui.viewport.getBoundingClientRect();px??=r.width/2;py??=r.height/2;const z=Math.max(.2,Math.min(3,camera.z*f));camera.x=px-(px-camera.x)*z/camera.z;camera.y=py-(py-camera.y)*z/camera.z;camera.z=z;applyCamera()}
function localPoint(e){const r=ui.viewport.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
// Hit-testing geométrico: somente o retângulo visível da caixa pode selecionar.
function hitNode(e){const r=ui.viewport.getBoundingClientRect(),x=(e.clientX-r.left-camera.x)/camera.z,y=(e.clientY-r.top-camera.y)/camera.z;const p=current();if(!p)return null;for(const n of [...p.nodes].sort((a,b)=>Number(a.kind==='text')-Number(b.kind==='text')).reverse()){if(x>=n.x&&x<=n.x+nodeWidth(n)&&y>=n.y&&y<=n.y+nodeHeight(n))return n}return null}
function hitEdge(e){const p=current();if(!p)return null;const point=localPoint(e),q={x:(point.x-camera.x)/camera.z,y:(point.y-camera.y)/camera.z};let best=null,dist=Math.max(10,edgePrefs.width+6)/camera.z;for(let i=p.edges.length-1;i>=0;i--){const edge=p.edges[i],a=getNode(edge.a),b=getNode(edge.b);if(!a||!b)continue;const d=edgeDistance(q,center(a),center(b));if(d<dist){dist=d;best=i}}return best}
function hitPort(e){const r=ui.viewport.getBoundingClientRect(),x=(e.clientX-r.left-camera.x)/camera.z,y=(e.clientY-r.top-camera.y)/camera.z;return current()?.nodes.find(n=>Math.hypot(x-(n.x+nodeWidth(n)),y-(n.y+nodeHeight(n)/2))<=17/camera.z)||null}
function drawPreview(e){const g=$('connectionPreview');g.replaceChildren();if(!drag||drag.type!=='link')return;const n=getNode(drag.id);if(!n)return;const p=localPoint(e),x=(p.x-camera.x)/camera.z,y=(p.y-camera.y)/camera.z;g.append(el('path',{d:`M ${n.x+nodeWidth(n)} ${n.y+nodeHeight(n)/2} L ${x} ${y}`,class:'link-preview'}))}
function isHandMode(){return interactionMode==='hand'}
function setInteractionMode(mode){interactionMode=mode;for(const [name,id] of [['pointer','pointerMode'],['hand','handMode']]){const button=$(id);button.classList.toggle('active',name===mode);button.setAttribute('aria-pressed',String(name===mode))}updatePointerCursor()}
function updatePointerCursor(){ui.viewport.classList.toggle('mode-hand',isHandMode());ui.viewport.classList.toggle('mode-pointer',!isHandMode())}
$('pointerMode').addEventListener('click',()=>setInteractionMode('pointer'));
$('handMode').addEventListener('click',()=>setInteractionMode('hand'));
function stageToWorld(p){return{x:(p.x-camera.x)/camera.z,y:(p.y-camera.y)/camera.z}}
function drawSelectionBox(){const overlay=$('selectionOverlay');overlay.replaceChildren();if(!drag||drag.type!=='marquee')return;const a=stageToWorld(drag.start),b=stageToWorld(drag.end||drag.start);overlay.append(el('rect',{x:Math.min(a.x,b.x),y:Math.min(a.y,b.y),width:Math.abs(b.x-a.x),height:Math.abs(b.y-a.y),class:'marquee-rect'}))}
function selectByMarquee(){const a=stageToWorld(drag.start),b=stageToWorld(drag.end||drag.start),left=Math.min(a.x,b.x),right=Math.max(a.x,b.x),top=Math.min(a.y,b.y),bottom=Math.max(a.y,b.y);const hits=current().nodes.filter(n=>n.x<right&&n.x+nodeWidth(n)>left&&n.y<bottom&&n.y+nodeHeight(n)>top).map(n=>n.id);selected=drag.additive?[...new Set([...drag.base,...hits])]:hits;selectedEdge=null;render()}
ui.viewport.addEventListener('pointerdown',e=>{if(e.button!==0)return;const textBody=e.target.closest?.('.text-node-body');if(textBody){const rect=textBody.getBoundingClientRect();if(e.clientX>=rect.right-19&&textBody.scrollHeight>textBody.clientHeight){e.stopPropagation();return}}const check=e.target.closest?.('[data-check-node]');if(!check&&e.target.closest?.('.stage-scroll-body')){const body=e.target.closest('.stage-scroll-body');const r=body.getBoundingClientRect();const onScrollbar=body.scrollHeight>body.clientHeight&&e.clientX>=r.right-16;if(onScrollbar){e.stopPropagation();return}if(e.target.closest('a,button,input,textarea,select,[contenteditable="true"]'))return;e.preventDefault()}if(check){e.preventDefault();e.stopPropagation();toggleStageCheck(check.dataset.checkNode,Number(check.dataset.checkIndex));return}const branch=e.target.closest?.('[data-branch-toggle]');if(branch){e.preventDefault();e.stopPropagation();toggleBranch(branch.dataset.branchToggle);return}const p=localPoint(e),tool=e.target.closest?.('[data-list-action]');if(tool){e.stopPropagation();handleListTool(tool.dataset.listAction,tool.dataset.listId);return}if(isHandMode()){drag={type:'pan',start:p,x:camera.x,y:camera.y};ui.viewport.setPointerCapture(e.pointerId);return}const port=hitPort(e),n=port||hitNode(e);if(!port&&!n){const edge=hitEdge(e);if(edge!==null){selectedEdge=edge;selected=[];setPropertyOpen(false);render();return}}if(port){selectedEdge=null;selected=[port.id];render();drag={type:'link',id:port.id,start:p};drawPreview(e)}else if(n){const multi=e.ctrlKey||e.metaKey;if(multi){choose(n.id,true);drag=null;return}if(!selected.includes(n.id))choose(n.id);drag={type:'node',start:p,moved:false,original:selected.filter(id=>!getNode(id)?.pinned).map(id=>({id,x:getNode(id).x,y:getNode(id).y}))}}else{selectedEdge=null;setPropertyOpen(false);drag={type:'marquee',start:p,end:p,base:[...selected],additive:e.ctrlKey||e.metaKey,moved:false};if(!drag.additive){selected=[];render()}}ui.viewport.setPointerCapture(e.pointerId)});
ui.viewport.addEventListener('pointermove',e=>{if(!drag)return;const p=localPoint(e),dx=p.x-drag.start.x,dy=p.y-drag.start.y;if(drag.type==='link')drawPreview(e);else if(drag.type==='pan'){camera.x=drag.x+dx*navPrefs.panSpeed/100;camera.y=drag.y+dy*navPrefs.panSpeed/100;applyCamera()}else if(drag.type==='marquee'){drag.end=p;drag.moved=Math.hypot(dx,dy)>5;drawSelectionBox()}else if(drag.type==='node'){if(Math.hypot(dx,dy)>4&&!drag.moved&&drag.original.length){snapshot();drag.moved=true}if(drag.moved){for(const n of drag.original){const node=getNode(n.id);if(node){node.x=stagePrefs.snapToGrid?snapCoord(n.x+dx/camera.z):Math.round(n.x+dx/camera.z);node.y=stagePrefs.snapToGrid?snapCoord(n.y+dy/camera.z):Math.round(n.y+dy/camera.z)}}render()}}});
function stopDrag(e){if(!drag)return;if(drag.type==='marquee'){if(e.type==='pointerup'&&drag.moved)selectByMarquee();else if(!drag.additive){selected=[];render()}$('selectionOverlay').replaceChildren()}if(drag.type==='link'&&e.type==='pointerup'){const source=getNode(drag.id),target=hitNode(e),distance=Math.hypot(localPoint(e).x-drag.start.x,localPoint(e).y-drag.start.y);if(source&&distance>8){if(target&&target.id!==source.id){const p=current();if(!p.edges.some(edge=>(edge.a===source.id&&edge.b===target.id)||(edge.b===source.id&&edge.a===target.id))){snapshot();p.edges.push({a:source.id,b:target.id});scheduleSave();notify('Nós conectados')}selected=[target.id]}else if(!target){snapshot();const p=current(),pos=localPoint(e),x=(pos.x-camera.x)/camera.z,y=(pos.y-camera.y)/camera.z;const n={id:uid(),x:Math.round(x-100),y:Math.round(y-35),title:'Novo nó',desc:'',color:'slate'};p.nodes.push(n);p.edges.push({a:source.id,b:n.id});selected=[n.id];scheduleSave();notify('Nó filho criado')}render()}else if(source){selected=[source.id];render()}}if(drag.moved&&drag.type==='node')scheduleSave();drag=null;$('connectionPreview').replaceChildren()}
ui.viewport.addEventListener('pointerup',stopDrag);ui.viewport.addEventListener('pointercancel',stopDrag);ui.viewport.addEventListener('lostpointercapture',e=>{if(drag)stopDrag(e)});
ui.viewport.addEventListener('wheel',e=>{const body=e.target.closest?.('.stage-scroll-body');if(body&&!e.ctrlKey&&!e.metaKey){const before=body.scrollTop;body.scrollTop+=e.deltaY;const moved=Math.abs(body.scrollTop-before)>0.1;if(moved||body.scrollHeight>body.clientHeight){e.preventDefault();return}}e.preventDefault();const p=localPoint(e);zoom(zoomFactor(e.deltaY<0?1.12:1/1.12),p.x,p.y)},{passive:false});
ui.viewport.addEventListener('dblclick',e=>{const n=hitNode(e);if(n){choose(n.id);if(n.kind==='list')openList(n.id);else if(n.kind==='text')editTextNode(n.id);else openProperties()}});
ui.nodes.addEventListener('keydown',e=>{const check=e.target.closest?.('[data-check-node]');if(check&&(e.key===' '||e.key==='Enter')){e.preventDefault();e.stopPropagation();toggleStageCheck(check.dataset.checkNode,Number(check.dataset.checkIndex));return}if(e.key==='Enter'){choose(e.target.closest('.node').dataset.id);openProperties();e.preventDefault()}});
function edit(prop,value){const n=selected.length===1&&getNode(selected[0]);if(!n||n[prop]===value)return;if(!edit._active){snapshot();edit._active=true}n[prop]=value;render();scheduleSave()}
for(const[id,prop]of [['nodeTitle','title'],['nodeDesc','desc']]){$(id).addEventListener('input',e=>edit(prop,e.target.value));$(id).addEventListener('blur',()=>edit._active=false)}$('nodeColor').addEventListener('change',e=>{edit._active=false;edit('color',e.target.value);edit._active=false});
function download(name,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
const safeName=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_-]+/gi,'-').replace(/^-|-$/g,'').slice(0,65)||'mentalista';
// v32.2 — Sistema e segurança: animações, indicador e lembretes locais.
const SECURITY_KEY='mentalista.security.v32.2';
const SECURITY_DEFAULTS={animation:'system',backupDays:7,showSave:true,lastBackup:0,lastDismiss:0};
let securityPrefs={...SECURITY_DEFAULTS};
function securityEffectiveMotion(){return securityPrefs.animation==='off'||securityPrefs.animation==='reduced'||(securityPrefs.animation==='system'&&window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)}
function applySecurityPrefs(){
 document.body.classList.toggle('access-reduced-motion',securityEffectiveMotion());
 document.body.classList.toggle('access-no-animation',securityPrefs.animation==='off');
 $('prefAnimationMode').value=securityPrefs.animation;
 $('prefBackupInterval').value=String(securityPrefs.backupDays);
 $('prefSaveIndicator').checked=securityPrefs.showSave;
 $('saveStatus').hidden=!securityPrefs.showSave;
 $('securitySaveStatus').textContent=securityPrefs.showSave?('Estado atual: '+$('saveStatus').textContent):'O indicador do rodapé está oculto; o salvamento automático continua ativo.';
 $('securityBackupStatus').textContent=securityPrefs.lastBackup?'Último backup geral registrado: '+new Date(securityPrefs.lastBackup).toLocaleString('pt-BR'):'Último backup geral: ainda não registrado neste navegador.';
 checkBackupReminder();
}
function storeSecurityPrefs(){try{localStorage.setItem(SECURITY_KEY,JSON.stringify(securityPrefs))}catch{notify('Não foi possível guardar as preferências')}applySecurityPrefs()}
function checkBackupReminder(){
 const box=$('backupReminder');if(!box)return;
 const now=Date.now(),days=securityPrefs.backupDays;
 const reference=securityPrefs.lastBackup||securityPrefs.startedAt||now;
 const due=days>0&&now-reference>=days*86400000&&now-(securityPrefs.lastDismiss||0)>=86400000;
 box.hidden=!due;
 if(due)$('backupReminderText').textContent='Seu último backup geral foi há '+Math.floor((now-reference)/86400000)+' dia(s). Salve uma cópia dos seus mapas e preferências.';
}
function markBackupDone(){securityPrefs.lastBackup=Date.now();securityPrefs.lastDismiss=0;storeSecurityPrefs()}
function initSecurityPrefs(){
 try{const x=JSON.parse(localStorage.getItem(SECURITY_KEY)||'null');if(x&&typeof x==='object'){
  if(['system','full','reduced','off'].includes(x.animation))securityPrefs.animation=x.animation;
  if([0,1,7,15,30].includes(x.backupDays))securityPrefs.backupDays=x.backupDays;
  if(typeof x.showSave==='boolean')securityPrefs.showSave=x.showSave;
  for(const key of ['lastBackup','lastDismiss','startedAt'])if(Number.isFinite(x[key])&&x[key]>=0)securityPrefs[key]=x[key];
 }}catch{}
 if(!securityPrefs.startedAt)securityPrefs.startedAt=Date.now();
 $('prefAnimationMode').addEventListener('change',e=>{securityPrefs.animation=e.target.value;storeSecurityPrefs()});
 $('prefBackupInterval').addEventListener('change',e=>{securityPrefs.backupDays=Number(e.target.value);storeSecurityPrefs()});
 $('prefSaveIndicator').addEventListener('change',e=>{securityPrefs.showSave=e.target.checked;storeSecurityPrefs()});
 $('securityBackupNow').addEventListener('click',()=>exportBackup());
 $('securityReset').addEventListener('click',()=>{const lastBackup=securityPrefs.lastBackup,startedAt=securityPrefs.startedAt;securityPrefs={...SECURITY_DEFAULTS,lastBackup,startedAt};storeSecurityPrefs();notify('Preferências de sistema restauradas')});
 $('backupReminderAction').addEventListener('click',()=>exportBackup());
 $('backupReminderDismiss').addEventListener('click',()=>{securityPrefs.lastDismiss=Date.now();storeSecurityPrefs()});
 window.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener?.('change',applySecurityPrefs);
 window.addEventListener('focus',checkBackupReminder);
 storeSecurityPrefs();
}
// v32: Exportação portátil do projeto e backup completo do ambiente.
const BACKUP_FORMAT='mentalista-backup',PROJECT_FORMAT='mentalista-map';
function exportPreferences(){return {appearance:clone(appearance),stage:clone(stagePrefs),edges:clone(edgePrefs),nodes:clone(nodePrefs),navigation:clone(navPrefs),security:clone(securityPrefs)}}
function validateSecurityPreferences(x){
 if(!x||typeof x!=='object'||!['system','full','reduced','off'].includes(x.animation)||![0,1,7,15,30].includes(x.backupDays)||typeof x.showSave!=='boolean')throw Error('Preferências de segurança inválidas');
 return {animation:x.animation,backupDays:x.backupDays,showSave:x.showSave,lastBackup:Number.isFinite(x.lastBackup)&&x.lastBackup>=0?x.lastBackup:0,lastDismiss:0,startedAt:Number.isFinite(x.startedAt)&&x.startedAt>=0?x.startedAt:Date.now()};
}
function validatedPreferences(data){
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Preferências inválidas');
 const number=(v,min,max,label)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)throw Error('Preferência inválida: '+label);return v};
 const bool=(v,label)=>{if(typeof v!=='boolean')throw Error('Preferência inválida: '+label);return v};
 const a=data.appearance,g=data.stage,e=data.edges,n=data.nodes,v=data.navigation;
 if(!a||!PALETTES[a.palette]||!['light','dark'].includes(a.mode))throw Error('Tema inválido');
 if(!g||!e||!n||!v)throw Error('Configurações incompletas');
 if(!['curve','straight','orthogonal'].includes(e.style))throw Error('Tipo de conexão inválido');
 if(!['Arial','Verdana','Georgia','Tahoma','Courier New'].includes(n.font))throw Error('Fonte inválida');
 return {
  appearance:{palette:a.palette,mode:a.mode},
  stage:{showGrid:bool(g.showGrid,'grade'),gridOpacity:number(g.gridOpacity,0,100,'intensidade'),snapToGrid:bool(g.snapToGrid,'encaixe')},
  edges:{style:e.style,width:number(e.width,1,6,'espessura')},
  nodes:{width:number(n.width,160,360,'largura'),font:n.font,fontSize:number(n.fontSize,12,22,'fonte'),spacing:number(n.spacing,0,3,'espaçamento')},
  navigation:{zoomSpeed:number(v.zoomSpeed,25,200,'zoom'),panSpeed:number(v.panSpeed,25,200,'movimentação'),largeControls:bool(v.largeControls,'controles'),reducedMotion:bool(v.reducedMotion,'animações')},
  security:data.security?validateSecurityPreferences(data.security):null
 };
}
function restorePreferences(prefs){
 const p=validatedPreferences(prefs);
 appearance=p.appearance;stagePrefs=p.stage;edgePrefs=p.edges;nodePrefs=p.nodes;navPrefs=p.navigation;if(p.security)securityPrefs=p.security;
 localStorage.setItem(APPEARANCE_KEY,JSON.stringify(appearance));
 localStorage.setItem(THEME,appearance.mode);
 localStorage.setItem(STAGE_PREFS_KEY,JSON.stringify(stagePrefs));
 localStorage.setItem(EDGE_PREFS_KEY,JSON.stringify(edgePrefs));
 localStorage.setItem(NODE_PREFS_KEY,JSON.stringify(nodePrefs));
 localStorage.setItem(NAV_PREFS_KEY,JSON.stringify(navPrefs));
 applyAppearance();applyStagePrefs();applyEdgePrefs();applyNodePrefs();applyNavPrefs();storeSecurityPrefs();render();
}
function exportJson(){
 const p=current();if(!p)return notify('Nenhum projeto selecionado');
 download(safeName(p.name)+'.json',JSON.stringify({format:PROJECT_FORMAT,version:2,exportedAt:new Date().toISOString(),project:clone(p),preferences:exportPreferences()},null,2),'application/json');
 notify('Projeto e configurações exportados');
}
function exportBackup(){
 if(saveTimer){clearTimeout(saveTimer);persist()}
 const draft=localStorage.getItem('mentalista.editor.v1')||'';
 download('mentalista-backup-geral-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify({format:BACKUP_FORMAT,version:1,exportedAt:new Date().toISOString(),projects:clone(projects),active,preferences:exportPreferences(),editorDraft:draft},null,2),'application/json');
 markBackupDone();notify('Backup geral exportado');
}
function validProject(p){return p&&typeof p.name==='string'&&p.name.length<=200&&Array.isArray(p.nodes)&&p.nodes.length<=20000&&Array.isArray(p.edges)&&p.edges.length<=50000&&p.nodes.every(n=>typeof n.id==='string'&&typeof n.title==='string'&&typeof n.x==='number'&&Number.isFinite(n.x)&&typeof n.y==='number'&&Number.isFinite(n.y))&&p.edges.every(e=>typeof e.a==='string'&&typeof e.b==='string')}
function cleanImportedProject(p){
 if(!validProject(p))throw Error('Projeto inválido');
 const ids=new Set(p.nodes.map(n=>n.id));if(ids.size!==p.nodes.length)throw Error('IDs de nós duplicados');
 return {id:uid(),name:p.name.slice(0,90),created:Number.isFinite(p.created)?p.created:Date.now(),updated:Date.now(),nodes:p.nodes.map(n=>({id:n.id,x:n.x,y:n.y,title:n.title.slice(0,120),desc:String(n.desc||'').slice(0,3000),kind:['list','text'].includes(n.kind)?n.kind:'node',html:n.kind==='text'?sanitizeEditor(String(n.html||'').slice(0,100000)):'',textPlain:n.kind==='text'?String(n.textPlain||'').slice(0,50000):'',textHeight:n.kind==='text'?Math.max(210,Math.min(620,Number(n.textHeight)||360)):undefined,items:n.kind==='list'&&Array.isArray(n.items)?n.items.filter(v=>typeof v==='string').slice(0,30).map(v=>v.slice(0,200)):[],listStyle:['bullet','number','check'].includes(n.listStyle)?n.listStyle:'bullet',checked:Array.isArray(n.checked)?n.checked.filter(i=>Number.isInteger(i)&&i>=0&&i<30):[],pinned:!!n.pinned,color:(/^#[0-9a-fA-F]{6}$/.test(n.color||'')||['violet','blue','green','orange','rose','slate','yellow'].includes(n.color))?n.color:'violet'})),edges:p.edges.filter(e=>ids.has(e.a)&&ids.has(e.b)&&e.a!==e.b).map(e=>({a:e.a,b:e.b}))};
}
async function readJsonFile(file){if(file.size>35e6)throw Error('Arquivo muito grande (limite 35 MB)');try{return JSON.parse(await file.text())}catch{throw Error('JSON inválido')}}
$('fileInput').addEventListener('change',async e=>{
 const f=e.target.files[0];e.target.value='';if(!f)return;
 try{
  const data=await readJsonFile(f);
  if(data.format!==PROJECT_FORMAT||!data.project)throw Error('Arquivo não é uma exportação de projeto');
  const copy=cleanImportedProject(data.project);copy.name+=' (importado)';
  const prefs=data.preferences?validatedPreferences(data.preferences):null;
  if(projects.some(p=>p.id===copy.id))copy.id=uid();
  projects.push(copy);openProject(copy.id);
  if(prefs&&confirm('O projeto inclui configurações de aparência, Palco e acessibilidade. Deseja aplicá-las também neste navegador?'))restorePreferences(prefs);
  notify('Projeto importado com sucesso');
 }catch(err){notify('Falha na importação: '+err.message)}
});
$('backupFileInput').addEventListener('change',async e=>{
 const f=e.target.files[0];e.target.value='';if(!f)return;
 try{
  const data=await readJsonFile(f);
  if(data.format!==BACKUP_FORMAT||!Array.isArray(data.projects)||!data.projects.length||data.projects.length>1000)throw Error('Arquivo não é um backup geral válido');
  const prefs=validatedPreferences(data.preferences);
  const cleaned=data.projects.map(cleanImportedProject);
  const ids=new Set(data.projects.map(p=>p.id));if(ids.size!==data.projects.length)throw Error('IDs de projetos duplicados');
  const selectedIndex=data.projects.findIndex(p=>p.id===data.active);
  const draft=typeof data.editorDraft==='string'?sanitizeEditor(data.editorDraft.slice(0,200000)):'';
  if(!confirm('ATENÇÃO: restaurar o backup geral SUBSTITUIRÁ todos os projetos e configurações atuais deste navegador. Faça um backup dos dados atuais antes de continuar. Deseja restaurar?'))return;
  // Preparar e validar tudo antes de modificar o armazenamento existente.
  const nextActive=cleaned[Math.max(0,selectedIndex)].id;
  localStorage.setItem(KEY,JSON.stringify({projects:cleaned,active:nextActive}));
  localStorage.setItem('mentalista.editor.v1',draft);
  projects=cleaned;active=nextActive;
  restorePreferences(prefs);openProject(nextActive);
  const edit=$('editorText');if(edit)edit.innerHTML=draft;
  notify('Backup geral restaurado com sucesso');
 }catch(err){notify('Falha na restauração: '+err.message)}
});
function svgExport(){const p=current();if(!p.nodes.length)return notify('Mapa vazio');const xs=p.nodes.map(n=>n.x),ys=p.nodes.map(n=>n.y),minX=Math.min(...xs)-40,minY=Math.min(...ys)-40,maxX=Math.max(...p.nodes.map(n=>n.x+nodeWidth(n)))+40,maxY=Math.max(...p.nodes.map(n=>n.y+nodeHeight(n)))+40;const cloneSvg=ui.canvas.cloneNode(true);cloneSvg.setAttribute('xmlns',NS);cloneSvg.setAttribute('viewBox',`${minX} ${minY} ${maxX-minX} ${maxY-minY}`);cloneSvg.setAttribute('width',maxX-minX);cloneSvg.setAttribute('height',maxY-minY);cloneSvg.querySelector('#scene').removeAttribute('transform');cloneSvg.querySelector('#gridBg').remove();cloneSvg.querySelectorAll('.node').forEach(n=>n.classList.remove('selected','match'));cloneSvg.querySelectorAll('.list-tool,.node-port,.node-footer-divider,.pinned-indicator,.branch-toggle,.branch-count').forEach(n=>n.remove());const css=`.edge{fill:none;stroke:#7d8aa4;stroke-width:${edgePrefs.width}}.node rect{fill:#4b3d83;stroke:#a391ff;stroke-width:1.5}.node text{fill:#fff;font:600 15px sans-serif}.node .list-line{font:12px sans-serif}.node .sub{fill:#eee;font:11px sans-serif}.node[data-color=blue] rect{fill:#234c79}.node[data-color=green] rect{fill:#225c4d}.node[data-color=orange] rect{fill:#77502b}.node[data-color=rose] rect{fill:#753956}.node[data-color=slate] rect{fill:#ffffff;stroke:#adb5bd}.node[data-color=slate] text{fill:#263143}.node[data-color=yellow] rect{fill:#eab308}`;const style=el('style',{},css);cloneSvg.prepend(style);download(safeName(p.name)+'.svg',new XMLSerializer().serializeToString(cloneSvg),'image/svg+xml;charset=utf-8');notify('SVG exportado')}
function printMap(){const old={...camera};fit();window.print();camera=old;applyCamera()}
function setPropertyOpen(open){propertyOpen=!!open&&selected.length===1;const panel=$('propertyPanel');if(panel)panel.hidden=!propertyOpen;const trigger=$('quickProperties');if(trigger)trigger.setAttribute('aria-expanded',String(propertyOpen))}function openProperties(){if(selected.length!==1)return;if(getNode(selected[0])?.kind==='list'){openList(selected[0]);return}if(getNode(selected[0])?.kind==='text'){editTextNode(selected[0]);return}setPropertyOpen(!propertyOpen);if(propertyOpen)requestAnimationFrame(()=>{$('nodeTitle').focus();$('nodeTitle').select()})}
function paint(color){const n=selected.length===1&&getNode(selected[0]);if(!n)return;snapshot();n.color=color;render();scheduleSave()}
const customColor=$('customNodeColor');if(customColor){customColor.addEventListener('input',e=>{customColor.style.setProperty('--picked-color',e.target.value)});customColor.addEventListener('change',e=>{paint(e.target.value);notify('Cor personalizada aplicada')})}
document.querySelectorAll('[data-paint]').forEach(b=>b.addEventListener('click',()=>paint(b.dataset.paint)));
for(const [id,fn] of Object.entries({quickList:()=>createList(),quickEditor:openEditor,quickNode:()=>addNode(),quickChild:()=>addNode('child'),quickSibling:()=>addNode('sibling'),quickEdit:openProperties,quickDelete:removeSelected,quickUndo:undo,quickRedo:redo,fitQuick:centerSelectedOrFit,zoomInMenu:()=>zoom(zoomFactor(1.2)),zoomOutMenu:()=>zoom(zoomFactor(1/1.2)),fullscreen:()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.()}}))$(id).addEventListener('click',fn);
document.querySelectorAll('.menu').forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)document.querySelectorAll('.menu').forEach(other=>{if(other!==menu)other.open=false})}));
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.menu'))document.querySelectorAll('.menu').forEach(m=>m.open=false)});
const actions={myProjects:showMyProjects,newProject:addProject,renameProject,deleteProject,addNode:()=>addNode(),addList:()=>createList(),addChild:()=>addNode('child'),addSibling:()=>addNode('sibling'),connect,organizeTree:()=>organizeMap('tree'),organizeHierarchy:()=>organizeMap('hierarchy'),organizeRadial:()=>organizeMap('radial'),openEditorMenu:openEditor,removeLinkMenu:removeSelectedEdge,deleteNode:removeSelected,undo,redo,fit,center:()=>{const n=current()?.nodes[0];if(!n)return;const r=ui.viewport.getBoundingClientRect();camera.x=r.width/2-(n.x+nodeWidth(n)/2)*camera.z;camera.y=r.height/2-(n.y+nodeHeight(n)/2)*camera.z;applyCamera()},zoomIn:()=>zoom(zoomFactor(1.2)),zoomOut:()=>zoom(zoomFactor(1/1.2)),exportJson,exportBackup,restoreBackup:()=>$('backupFileInput').click(),importJson:()=>$('fileInput').click(),exportSvg:svgExport,print:printMap,help:()=>$('helpDialog').showModal(),openSettings:openSettings};
for(const[id,fn]of Object.entries(actions))$(id).addEventListener('click',fn);$('projects').addEventListener('change',e=>openProject(e.target.value));
document.addEventListener('keydown',e=>{const ctrl=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();if(ctrl&&e.shiftKey&&k==='e'){e.preventDefault();openEditor();return}if(ctrl&&e.shiftKey&&k==='l'){e.preventDefault();createList();return}if(ctrl&&k==='f'){e.preventDefault();openFind();return}if(ctrl&&k==='a'&&!e.target.closest('input,textarea,select,[contenteditable]')&&!document.querySelector('dialog[open]')&&($('floatingEditor').hidden||!$('floatingEditor').contains(document.activeElement))){e.preventDefault();selected=current()?.nodes.map(n=>n.id)||[];selectedEdge=null;render();return}if($('findPanel').hidden===false){if(e.key==='Escape'){e.preventDefault();closeFind();return}if(e.target===$('findInput')&&['ArrowDown','ArrowUp','Enter'].includes(e.key)){e.preventDefault();navigateFind(e.key);return}}const input=e.target.closest('input,textarea,select,[contenteditable]');if(!ctrl&&!e.altKey&&!e.repeat&&k==='v'&&!e.target.closest('input,textarea,select,[contenteditable]')){setInteractionMode('pointer');return}if(!ctrl&&!e.altKey&&!e.repeat&&k==='h'&&!e.target.closest('input,textarea,select,[contenteditable]')){setInteractionMode('hand');return}if(!ctrl&&!e.altKey&&!e.shiftKey&&e.code==='Space'&&!e.target.closest('input,textarea,select,button,a,summary,[role=button],[contenteditable]')&&!document.querySelector('dialog[open]')&&($('floatingEditor').hidden||!$('floatingEditor').contains(document.activeElement))){e.preventDefault();if(!e.repeat)setInteractionMode(interactionMode==='pointer'?'hand':'pointer');return}if(input||$('helpDialog').open||$('shortcutsDialog').open||$('listDialog').open||!$('floatingEditor').hidden&&$('floatingEditor').contains(document.activeElement))return;if(ctrl&&k==='z'){e.preventDefault();e.shiftKey?redo():undo()}else if(ctrl&&k==='y'){e.preventDefault();redo()}else if(e.key==='Insert'){e.preventDefault();addNode()}else if(e.key==='Tab'){e.preventDefault();addNode('child')}else if(e.key==='Enter'){e.preventDefault();addNode('sibling')}else if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();removeSelected()}else if(e.key==='Escape'){selected=[];selectedEdge=null;render()}});
// Editor flutuante independente dos nós: conteúdo local e cópia com formatação.
const editor=$('floatingEditor'),editArea=$('editorText'),editorKey='mentalista.editor.v1';let editorSave;
function openEditor(){editor.hidden=false;editor.classList.remove('minimized');editArea.focus()}
let editingTextNode=null;
function integrateEditor(){const plain=editArea.innerText.trim();if(!plain)return notify('Escreva algum texto antes de integrar');const p=current();if(!p)return;const html=sanitizeEditor(editArea.innerHTML);const title=plain.split(/\n/).map(v=>v.trim()).find(Boolean)?.slice(0,120)||'Texto integrado';snapshot();let n=editingTextNode&&getNode(editingTextNode);if(!n){const r=ui.viewport.getBoundingClientRect();n={id:uid(),kind:'text',x:Math.round((r.width/2-camera.x)/camera.z-180),y:Math.round((r.height/2-camera.y)/camera.z-180),color:'slate',title,desc:'',textHeight:360};p.nodes.push(n)}n.html=html;n.textPlain=plain.slice(0,50000);n.title=title;selected=[n.id];selectedEdge=null;editingTextNode=n.id;render();centerSelectedOrFit();scheduleSave();editor.hidden=true;notify('Texto integrado ao mapa; conecte pelo botão +')}
$('editorIntegrate').addEventListener('click',integrateEditor);
function editTextNode(id){const n=getNode(id);if(!n)return;editingTextNode=id;editArea.innerHTML=sanitizeEditor(n.html||'');openEditor();$('editorStatus').textContent='Editando caixa de texto integrada';}
$('editorNewDraft').addEventListener('click',()=>{if(editArea.innerText.trim()&&!confirm('Criar um novo rascunho? O texto atual será substituído.'))return;editingTextNode=null;editArea.replaceChildren();$('editorMatches').textContent='';saveEditor();openEditor();notify('Novo rascunho')});
$('editorClose').addEventListener('click',()=>editor.hidden=true);
$('editorMin').addEventListener('click',()=>editor.classList.toggle('minimized'));
const editorMax=$('editorMax');
function toggleEditorMax(){
  const expanded=editor.classList.toggle('maximized');
  if(expanded){editor.classList.remove('minimized');editorMax.textContent='❐';editorMax.title='Restaurar tamanho';}
  else{editorMax.textContent='□';editorMax.title='Maximizar editor';}
  editorMax.setAttribute('aria-label',editorMax.title);
  editorMax.setAttribute('aria-pressed',String(expanded));
}
editorMax.addEventListener('click',toggleEditorMax);
$('editorDrag').addEventListener('dblclick',e=>{if(!e.target.closest('button'))toggleEditorMax()});
$('removeEdge').addEventListener('click',removeSelectedEdge);
$('cancelEdge').addEventListener('click',()=>{selectedEdge=null;render()});
function saveEditor(){clearTimeout(editorSave);editorSave=setTimeout(()=>{try{localStorage.setItem(editorKey,editArea.innerHTML);$('editorStatus').textContent='Rascunho salvo'}catch{$('editorStatus').textContent='Sem espaço para salvar'}},350)}
// Sanitiza HTML ao carregar: elimina scripts, handlers e elementos não editoriais.
function sanitizeEditor(html){const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('script,style,iframe,object,embed,form,svg,math,link,meta').forEach(n=>n.remove());doc.body.querySelectorAll('*').forEach(n=>{for(const a of [...n.attributes])if(a.name.startsWith('on')||['href','src','style','contenteditable'].includes(a.name))n.removeAttribute(a.name)});return doc.body.innerHTML}
try{editArea.innerHTML=sanitizeEditor(localStorage.getItem(editorKey)||'')}catch{}
editArea.addEventListener('input',saveEditor);
editArea.addEventListener('paste',e=>{e.preventDefault();const plain=e.clipboardData.getData('text/plain');document.execCommand('insertText',false,plain);saveEditor()});
function formatEditor(cmd,value){editArea.focus();document.execCommand(cmd,false,value||null);saveEditor()}
editor.querySelectorAll('[data-format]').forEach(b=>b.addEventListener('mousedown',e=>e.preventDefault()));
editor.querySelectorAll('[data-format]').forEach(b=>b.addEventListener('click',()=>formatEditor(b.dataset.format,b.dataset.value)));
$('editorFont').addEventListener('change',e=>formatEditor('fontName',e.target.value));
$('editorSize').addEventListener('change',e=>formatEditor('fontSize',e.target.value));
$('editorClean').addEventListener('click',()=>formatEditor('removeFormat'));
// Mantém uma cópia da seleção enquanto o usuário alcança o botão Del.
let editorSelectedRange=null;
function rememberEditorSelection(){
  const sel=window.getSelection();
  if(!sel||sel.rangeCount===0||sel.isCollapsed)return;
  const range=sel.getRangeAt(0);
  const inside=node=>node===editArea||editArea.contains(node);
  if(inside(range.startContainer)&&inside(range.endContainer))editorSelectedRange=range.cloneRange();
}
document.addEventListener('selectionchange',rememberEditorSelection);
editArea.addEventListener('keyup',rememberEditorSelection);
editArea.addEventListener('pointerup',rememberEditorSelection);
$('editorDeleteSelection').addEventListener('pointerdown',e=>{rememberEditorSelection();e.preventDefault()});
$('editorDeleteSelection').addEventListener('mousedown',e=>e.preventDefault());
$('editorDeleteSelection').addEventListener('click',()=>{
  rememberEditorSelection();
  const range=editorSelectedRange;
  if(!range||range.collapsed||!editArea.contains(range.startContainer)||!editArea.contains(range.endContainer)){
    notify('Selecione um trecho dentro do Editor');return;
  }
  try{
    range.deleteContents();range.collapse(true);
    const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);
    editorSelectedRange=null;editArea.focus();saveEditor();
    notify('Trecho excluído');
  }catch{editorSelectedRange=null;notify('Selecione novamente o trecho desejado')}
});
async function copyText(text){try{await navigator.clipboard.writeText(text);notify('Copiado')}catch{const ta=document.createElement('textarea');ta.value=text;document.body.append(ta);ta.select();const ok=document.execCommand('copy');ta.remove();notify(ok?'Copiado':'Cópia indisponível')}}
$('editorCopy').addEventListener('click',async()=>{const plain=editArea.innerText;try{if(navigator.clipboard.write&&window.ClipboardItem){await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([sanitizeEditor(editArea.innerHTML)],{type:'text/html'}),'text/plain':new Blob([plain],{type:'text/plain'})})]);notify('Texto formatado copiado')}else await copyText(plain)}catch{await copyText(plain)}});
const extractPatterns={phone:/(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,3}\)?[\s.-]?)?\d{4,5}[\s.-]?\d{4}\b/g,email:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,url:/\b(?:https?:\/\/|www\.)[^\s<>"']+/gi};
function extractEditor(type){const box=$('editorMatches');box.replaceChildren();const source=editArea.innerText;const types=type==='all'?['phone','email','url']:[type];const hits=[];for(const kind of types){const regex=extractPatterns[kind];regex.lastIndex=0;for(const match of source.matchAll(regex)){let val=match[0].replace(/[.,;!?]+$/,'');if(kind==='phone'&&val.replace(/\D/g,'').length<8)continue;if(!hits.some(h=>h.value===val))hits.push({kind,value:val})}}if(!hits.length){box.textContent='Nenhuma ocorrência encontrada.';return}const titles={phone:'Telefone',email:'E-mail',url:'URL'};for(const hit of hits.slice(0,100)){const row=document.createElement('div');row.className='editor-match';const label=document.createElement('span');label.textContent=titles[hit.kind]+': '+hit.value;const button=document.createElement('button');button.textContent='Copiar';button.title='Copiar '+hit.value;button.addEventListener('click',()=>copyText(hit.value));row.append(label,button);box.append(row)}}
editor.querySelectorAll('[data-extract]').forEach(b=>b.addEventListener('click',()=>extractEditor(b.dataset.extract)));
$('editorAll').addEventListener('click',()=>extractEditor('all'));
// Gerador local de texto demonstrativo: nenhuma API, sem chamadas externas.
const starts=['No contexto das ideias contemporâneas','Sob uma perspectiva multidisciplinar','A partir de uma análise criteriosa','No desenvolvimento de soluções criativas','Em um cenário de transformação contínua','Considerando os desafios atuais','Diante das novas possibilidades','Na construção de caminhos inovadores'];
const mids=['a integração de processos amplia horizontes e fortalece conexões significativas','a articulação de perspectivas favorece resultados consistentes e sustentáveis','o alinhamento entre objetivos e práticas revela oportunidades relevantes','a valorização do conhecimento contribui para decisões mais conscientes','a dinâmica das relações estimula a evolução de métodos e estratégias','a reflexão sobre prioridades impulsiona novas formas de colaboração'];
const ends=['para o futuro das organizações','em diferentes áreas de atuação','ao longo de todo o processo','com foco na qualidade das experiências','de maneira integrada e progressiva','em benefício de uma visão mais abrangente'];
let seed=Date.now()>>>0;const pick=a=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return a[seed%a.length]};
function makeLero(){const words=Math.max(0,Math.min(5000,Number($('leroWords').value)||0)),sentences=Math.max(0,Math.min(200,Number($('leroSentences').value)||0)),headings=Math.max(0,Math.min(30,Number($('leroTitles').value)||0)),paragraphs=Math.max(0,Math.min(50,Number($('leroParagraphs').value)||0));if(!(words+sentences+headings+paragraphs))return notify('Informe uma quantidade para gerar');const blocks=[];const count=sentences||Math.max(paragraphs,Math.ceil(words/17));let phrases=[];for(let i=0;i<count;i++)phrases.push(pick(starts)+', '+pick(mids)+' '+pick(ends)+'.');if(words){let tokens=phrases.join(' ').split(/\s+/);while(tokens.length<words)tokens.push(...(pick(starts)+' '+pick(mids)+' '+pick(ends)).split(/\s+/));tokens=tokens.slice(0,words);phrases=tokens.join(' ').replace(/\s+([,.!?])/g,'$1').split(/(?<=[.!?])\s+/)}const paraCount=paragraphs||Math.max(1,Math.ceil(phrases.length/4));const titles=['Perspectivas em movimento','Novos caminhos para o amanhã','Conexões e possibilidades','Uma visão integrada','Desafios e oportunidades'];
// Distribui os títulos ao longo do texto, antes de parágrafos distintos sempre que possível.
const titleSlots=new Map();for(let i=0;i<headings;i++){const slot=Math.floor(i*paraCount/Math.max(1,headings));titleSlots.set(slot,(titleSlots.get(slot)||0)+1)}
for(let i=0;i<paraCount;i++){
  for(let j=0;j<(titleSlots.get(i)||0);j++)blocks.push('<h2>'+pick(titles)+'</h2>');
  const start=Math.floor(i*phrases.length/paraCount),end=Math.floor((i+1)*phrases.length/paraCount);
  if(end>start)blocks.push('<p>'+phrases.slice(start,end).join(' ')+'</p>');
}
if(!blocks.length)return notify('Nenhum texto gerado');editArea.insertAdjacentHTML('beforeend',blocks.join(''));saveEditor();notify('Texto demonstrativo gerado no editor')}
$('leroGenerate').addEventListener('click',makeLero);
// Mover a janela sem interferir no conteúdo do editor.
let moving=null;$('editorDrag').addEventListener('pointerdown',e=>{if(e.target.closest('button')||editor.classList.contains('maximized'))return;moving={x:e.clientX,y:e.clientY,left:editor.getBoundingClientRect().left,top:editor.getBoundingClientRect().top};$('editorDrag').setPointerCapture(e.pointerId)});
$('editorDrag').addEventListener('pointermove',e=>{if(!moving||editor.classList.contains('maximized'))return;editor.style.left=Math.max(0,Math.min(window.innerWidth-120,moving.left+e.clientX-moving.x))+'px';editor.style.top=Math.max(0,Math.min(window.innerHeight-60,moving.top+e.clientY-moving.y))+'px';editor.style.right='auto'});
$('editorDrag').addEventListener('pointerup',()=>moving=null);$('editorDrag').addEventListener('pointercancel',()=>moving=null);

try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&Array.isArray(saved.projects)){projects=saved.projects.filter(validProject);active=saved.active}}catch{}if(!projects.length)projects=[newMap()];if(!projects.some(p=>p.id===active))active=projects[0].id;initializeAppearance();openProject(active);window.addEventListener('resize',applyCamera);window.addEventListener('beforeunload',()=>{if(saveTimer){clearTimeout(saveTimer);persist()}});if('serviceWorker'in navigator&&location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));


// Listas rápidas: caixas de primeira classe no mesmo grafo, com conexões normais.
let editingList=null,recognizer=null,listSession=null;
function createList(){const p=current(),r=ui.viewport.getBoundingClientRect();snapshot();const n={id:uid(),x:Math.round((r.width/2-camera.x)/camera.z-100),y:Math.round((r.height/2-camera.y)/camera.z-45),title:'Nova lista',desc:'',color:'slate',kind:'list',items:[],listStyle:'bullet',checked:[],pinned:false};p.nodes.push(n);selected=[n.id];render();scheduleSave();openList(n.id,true)}
function openList(id,isNew=false){const n=getNode(id);if(!n||n.kind!=='list')return;listSession={id,isNew,original:isNew?null:JSON.parse(JSON.stringify(n))};editingList=id;$('listTitle').value=n.title;$('listStyle').value=n.listStyle||'bullet';$('listInput').value='';renderListItems();$('listDialog').showModal();$('listInput').focus()}
function toggleStageCheck(id,index){const n=getNode(id);if(!n||n.kind!=='list'||n.listStyle!=='check'||!n.items?.[index])return;snapshot();const checked=new Set(n.checked||[]);if(checked.has(index))checked.delete(index);else checked.add(index);n.checked=[...checked].sort((a,b)=>a-b);render();scheduleSave()}
function renderListItems(){const n=getNode(editingList),box=$('listItems');box.replaceChildren();if(!n)return;(n.items||[]).forEach((item,i)=>{const li=document.createElement('li'),input=document.createElement('input'),del=document.createElement('button');input.value=item;input.maxLength=200;input.setAttribute('aria-label','Tópico '+(i+1));input.addEventListener('change',()=>{const v=input.value.trim();snapshot();if(v)n.items[i]=v;else n.items.splice(i,1);n.checked=(n.checked||[]).filter(v=>v!==i).map(v=>v>i?v-1:v);render();scheduleSave();renderListItems()});del.type='button';del.textContent='×';del.title='Remover tópico';del.setAttribute('aria-label','Remover tópico '+(i+1));del.addEventListener('click',()=>{snapshot();n.items.splice(i,1);n.checked=(n.checked||[]).filter(v=>v!==i).map(v=>v>i?v-1:v);render();scheduleSave();renderListItems();$('listInput').focus()});if((n.listStyle||'bullet')==='check'){const cb=document.createElement('input');cb.type='checkbox';cb.className='topic-check';cb.checked=(n.checked||[]).includes(i);cb.setAttribute('aria-label','Concluir tópico '+(i+1));cb.addEventListener('change',()=>{snapshot();n.checked=n.checked||[];n.checked=cb.checked?[...new Set([...n.checked,i])]:n.checked.filter(v=>v!==i);render();scheduleSave()});li.append(cb)}else{const mark=document.createElement('span');mark.className='topic-marker';mark.textContent=n.listStyle==='number'?(i+1)+'.':'•';li.append(mark)}li.append(input,del);box.append(li)});$('listCounter').textContent=(n.items||[]).length+' de 30 tópicos'}
function addListItems(text){const n=getNode(editingList);if(!n)return;const values=text.split(/\r?\n/).map(v=>v.trim()).filter(Boolean).map(v=>v.slice(0,200));if(!values.length)return;if(n.items.length>=30)return notify('Limite de 30 tópicos por lista');snapshot();n.items.push(...values.slice(0,30-n.items.length));$('listInput').value='';renderListItems();render();scheduleSave();$('listInput').focus()}
function listText(n){return n.title+'\n'+(n.items||[]).map((v,i)=>n.listStyle==='number'?`${i+1}. ${v}`:n.listStyle==='check'?`${(n.checked||[]).includes(i)?'☑':'☐'} ${v}`:`• ${v}`).join('\n')}
async function copyList(n){try{await navigator.clipboard.writeText(listText(n));notify('Lista copiada')}catch{const t=document.createElement('textarea');t.value=listText(n);document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();notify(ok?'Lista copiada':'Não foi possível copiar')}}
function handleListTool(action,id){const n=getNode(id);if(!n)return;
if(action==='copy'){if(n.kind==='list')copyList(n);else if(n.kind==='text')copyText(n.textPlain||n.title);else copyText([n.title,n.desc].filter(Boolean).join('\n'));return}
if(action==='edit'){choose(id);if(n.kind==='list')openList(id);else if(n.kind==='text')editTextNode(id);else openProperties();return}
if(action==='style'&&n.kind!=='list')return;
snapshot();if(action==='pin'){n.pinned=!n.pinned;notify(n.pinned?'Caixa fixada':'Caixa desafixada')}
if(action==='style'){const opts=['bullet','number','check'];n.listStyle=opts[(opts.indexOf(n.listStyle||'bullet')+1)%3]}
render();scheduleSave()}
$('listStyle').addEventListener('change',e=>{const n=getNode(editingList);if(!n)return;snapshot();n.listStyle=e.target.value;render();renderListItems();scheduleSave()});
$('listCopy').addEventListener('click',()=>{const n=getNode(editingList);if(n)copyList(n)});
$('listClearDone').addEventListener('click',()=>{const n=getNode(editingList);if(!n||!(n.checked||[]).length)return;snapshot();const done=new Set(n.checked);n.items=n.items.filter((_,i)=>!done.has(i));n.checked=[];render();renderListItems();scheduleSave()});
$('listAdd').addEventListener('click',()=>addListItems($('listInput').value));
$('listInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();addListItems(e.target.value)}});
$('listTitle').addEventListener('change',e=>{const n=getNode(editingList);if(n&&e.target.value.trim()&&n.title!==e.target.value.trim()){snapshot();n.title=e.target.value.trim();render();scheduleSave()}});
function dismissList(commit=false){
 const session=listSession;
 if(!commit&&session){
  const p=current();
  if(session.isNew){p.nodes=p.nodes.filter(n=>n.id!==session.id);p.edges=p.edges.filter(e=>e.a!==session.id&&e.b!==session.id);selected=selected.filter(id=>id!==session.id);}
  else if(session.original){const i=p.nodes.findIndex(n=>n.id===session.id);if(i>=0)p.nodes[i]=session.original;}
  render();scheduleSave();
 }
 listSession=null;
 if($('listDialog').open)$('listDialog').close();
}
$('listClose').addEventListener('click',()=>dismissList(true));
$('listExit').addEventListener('click',()=>dismissList(false));
$('listDialog').addEventListener('cancel',e=>{e.preventDefault();dismissList(false)});
$('listDialog').addEventListener('close',()=>{try{recognizer?.stop()}catch{}if(listSession) dismissList(false);editingList=null;ui.viewport.focus()});
const SpeechAPI=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SpeechAPI){$('listVoice').disabled=true;$('voiceStatus').textContent='Voz indisponível neste navegador. Use o teclado.'}
$('listVoice').addEventListener('click',()=>{if(!SpeechAPI)return;if(recognizer){recognizer.stop();return}try{const rec=new SpeechAPI();recognizer=rec;rec.lang='pt-BR';rec.interimResults=false;rec.maxAlternatives=1;$('voiceStatus').textContent='Ouvindo… fale um tópico';rec.onresult=e=>{const t=e.results?.[0]?.[0]?.transcript;if(t)addListItems(t)};rec.onerror=e=>{$('voiceStatus').textContent='Voz indisponível: '+e.error};rec.onend=()=>{recognizer=null;if($('voiceStatus').textContent==='Ouvindo… fale um tópico')$('voiceStatus').textContent='Ditado encerrado'};rec.start()}catch{$('voiceStatus').textContent='Não foi possível iniciar o microfone'}});


// Busca rápida local: título e descrição; nenhum dado sai do navegador.
let findIndex=0,findMatches=[];
const normalizeFind=t=>String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
function openFind(){document.querySelectorAll('.menu').forEach(m=>m.open=false);$('findPanel').hidden=false;$('findInput').focus();$('findInput').select();refreshFind()}
function closeFind(){$('findPanel').hidden=true;$('findInput').value='';search='';findMatches=[];findIndex=0;render();ui.viewport.focus()}
function refreshFind(){const term=normalizeFind($('findInput').value.trim());search=$('findInput').value.trim().toLocaleLowerCase('pt-BR');findMatches=term?current().nodes.filter(n=>normalizeFind(n.title+' '+(n.desc||'')+' '+(n.items||[]).join(' ')+' '+(n.textPlain||'')).includes(term)):[];findIndex=0;const results=$('findResults');results.replaceChildren();$('findCount').textContent=!term?'Digite para buscar por título ou descrição':findMatches.length+' nó(s) encontrado(s)';findMatches.slice(0,250).forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.className='find-result';b.setAttribute('role','option');b.dataset.index=i;const title=document.createElement('strong');title.textContent=n.title||'Sem título';const desc=document.createElement('small');desc.textContent=n.kind==='list'?(n.items||[]).join(' · '):(n.textPlain||n.desc||'Sem descrição');b.append(title,desc);b.addEventListener('click',()=>focusFind(i));results.append(b)});if(findMatches.length>250){const note=document.createElement('p');note.textContent='Mostrando os primeiros 250 resultados. Refine a busca.';results.append(note)}markFind();render()}
function markFind(){document.querySelectorAll('.find-result').forEach((b,i)=>{b.classList.toggle('active',i===findIndex);b.setAttribute('aria-selected',String(i===findIndex))})}
function focusFind(i){const n=findMatches[i];if(!n)return;findIndex=i;selected=[n.id];const r=ui.viewport.getBoundingClientRect();camera.x=r.width/2-(n.x+nodeWidth(n)/2)*camera.z;camera.y=r.height/2-(n.y+nodeHeight(n)/2)*camera.z;render();markFind();$('findResults').querySelector(`[data-index="${i}"]`)?.scrollIntoView({block:'nearest'});$('findInput').focus()}
function navigateFind(key){if(!findMatches.length)return;if(key==='ArrowDown')findIndex=(findIndex+1)%Math.min(250,findMatches.length);if(key==='ArrowUp')findIndex=(findIndex+Math.min(250,findMatches.length)-1)%Math.min(250,findMatches.length);focusFind(findIndex)}
// v36 — substituição literal, sem regex, com prévia e confirmação; uma operação = um Ctrl+Z.
const replaceFields=['title','desc','items'];
function replacementPlan(){const query=$('findInput').value,by=$('replaceInput').value;if(!query)return {matches:[],count:0};const matches=[];let count=0;for(const n of current()?.nodes||[]){const updates={};for(const field of replaceFields){const source=n[field];if(field==='items'&&!Array.isArray(source))continue;if(field!=='items'&&typeof source!=='string')continue;const values=field==='items'?source:[source];let occurrences=0;const next=values.map(value=>{const parts=String(value).split(query);occurrences+=parts.length-1;return parts.join(by)});if(occurrences){updates[field]=field==='items'?next:next[0];count+=occurrences}}if(Object.keys(updates).length)matches.push({n,updates})}return {matches,count}}
function showReplacePreview(){const query=$('findInput').value;if(!query){$('replaceSummary').textContent='Digite primeiro o texto a pesquisar.';return}const plan=replacementPlan();$('replaceSummary').textContent=plan.count+' ocorrência(s) exata(s) em '+plan.matches.length+' caixa(s). Maiúsculas e acentos são diferenciados. Nenhuma alteração foi feita.'}
$('replacePreview').addEventListener('click',showReplacePreview);
$('replaceApply').addEventListener('click',()=>{const plan=replacementPlan();if(!plan.count){showReplacePreview();return}if(!confirm('Substituir '+plan.count+' ocorrência(s) em '+plan.matches.length+' caixa(s)? É possível desfazer com Ctrl+Z.'))return;snapshot();for(const {n,updates} of plan.matches)Object.assign(n,updates);scheduleSave();refreshFind();$('replaceSummary').textContent=plan.count+' ocorrência(s) substituída(s). Use Ctrl+Z para desfazer.';miniQueue()});
$('findInput').addEventListener('input',refreshFind);
$('closeFind').addEventListener('click',closeFind);
$('findNodeMenu').addEventListener('click',openFind);
$('findNodeConfig').addEventListener('click',openFind);
$('shortcuts').addEventListener('click',()=>{document.querySelectorAll('.menu').forEach(m=>m.open=false);$('shortcutsDialog').showModal()});
})();

// Calculadora gerenciada pelo módulo independente calculator.js.

// Espaço alterna permanentemente entre Ponteiro e Mãozinha; keyup não modifica o modo.

// Ajuda institucional — v23
for(const [buttonId,dialogId] of [['githubHelp','githubDialog'],['aboutHelp','aboutDialog']]){document.getElementById(buttonId)?.addEventListener('click',()=>{document.querySelectorAll('.menu').forEach(m=>m.open=false);document.getElementById(dialogId)?.showModal()})}
document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.closeDialog)?.close()));

// Catálogo de ícones e botões — manter sincronizado com cada alteração de interface.
const iconMapDialog=document.getElementById('iconMapDialog');
document.getElementById('iconMapOpen')?.addEventListener('click',()=>{document.querySelectorAll('.menu').forEach(m=>m.open=false);document.getElementById('iconMapSearch').value='';document.querySelectorAll('.icon-map-entry,.icon-map-section').forEach(el=>el.hidden=false);iconMapDialog.showModal();});
document.getElementById('iconMapSearch')?.addEventListener('input',e=>{const query=e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();let visible=0;document.querySelectorAll('.icon-map-section').forEach(section=>{let count=0;section.querySelectorAll('.icon-map-entry').forEach(entry=>{const value=entry.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();entry.hidden=!value.includes(query);if(!entry.hidden){count++;visible++;}});section.hidden=!count;});document.getElementById('iconMapEmpty').hidden=visible>0;});

// v26: apenas um grupo expandido por menu, preservando os comandos existentes.
document.querySelectorAll('.menu-group').forEach(group=>group.addEventListener('toggle',()=>{
 if(group.open)group.closest('.dropdown')?.querySelectorAll('.menu-group').forEach(other=>{if(other!==group)other.open=false});
}));

// v30.2: os dois botões utilizam diretamente openCalculator, sem acionadores duplicados.
