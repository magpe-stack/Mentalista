/* Mentalista v30.4 — calculadora independente, móvel e funcional. */
(() => {
'use strict';
function init() {
 const panel=document.getElementById('calculator');
 if(!panel || panel.dataset.initialized==='true') return;
 panel.dataset.initialized='true';
 document.body.appendChild(panel);
 const display=document.getElementById('calculatorDisplay');
 const history=document.getElementById('calculatorHistory');
 const message=document.getElementById('calculatorMessage');
 const header=document.getElementById('calculatorDrag');
 let value='0', memory=null, operation=null, fresh=false, repeat=null, position=null;
 const symbols={add:'+',subtract:'−',multiply:'×',divide:'÷'};
 const ops={add:(a,b)=>a+b,subtract:(a,b)=>a-b,multiply:(a,b)=>a*b,divide:(a,b)=>a/b};
 const fmt=n=>Number.isFinite(n)?String(Number(n.toPrecision(12))).replace('.',','):'Erro';
 function paint(){display.textContent=value.replace('.',',');history.textContent=operation&&memory!==null?`${fmt(memory)} ${symbols[operation]}`:'';}
 function setResult(n){if(!Number.isFinite(n)){value='Erro';memory=null;operation=null;message.textContent='Operação inválida';}else value=String(Number(n.toPrecision(12)));fresh=true;}
 function press(k){
   message.textContent='';
   if(value==='Erro' && k!=='clear'){value='0';memory=null;operation=null;}
   if(/^[0-9]$/.test(k)){if(fresh){value=k;fresh=false;}else if(value.replace(/[-.]/g,'').length<15)value=value==='0'?k:value==='-0'?'-'+k:value+k;}
   else if(k==='decimal'){if(fresh){value='0.';fresh=false;}else if(!value.includes('.'))value+='.';}
   else if(k==='clear'){value='0';memory=null;operation=null;fresh=false;repeat=null;}
   else if(k==='ce'){value='0';fresh=false;}
   else if(k==='back'){if(fresh)fresh=false;else value=value.length<=1||value.length===2&&value.startsWith('-')?'0':value.slice(0,-1);}
   else if(k==='sign'){if(Number(value)!==0)value=value.startsWith('-')?value.slice(1):'-'+value;}
   else if(['percent','reciprocal','square','sqrt'].includes(k)){
      let n=Number(value);
      if(k==='percent')n=memory!==null&&['add','subtract'].includes(operation)?memory*n/100:n/100;
      if(k==='reciprocal')n=1/n;
      if(k==='square')n=n*n;
      if(k==='sqrt')n=Math.sqrt(n);
      setResult(n);
   }
   else if(ops[k]){
      if(operation!==null&&!fresh){const n=ops[operation](memory,Number(value));setResult(n);if(value==='Erro'){paint();return;}}
      memory=Number(value);operation=k;fresh=true;repeat=null;
   }
   else if(k==='equals'){
      if(operation!==null){const a=memory,b=fresh?memory:Number(value),op=operation;setResult(ops[op](a,b));repeat={op,b};memory=null;operation=null;history.textContent=`${fmt(a)} ${symbols[op]} ${fmt(b)} =`;display.textContent=value.replace('.',',');return;}
      if(repeat)setResult(ops[repeat.op](Number(value),repeat.b));
   }
   paint();
 }
 function constrain(){
   const r=panel.getBoundingClientRect();
   const left=Math.max(0,Math.min(window.innerWidth-r.width, r.left));
   const top=Math.max(0,Math.min(window.innerHeight-Math.min(r.height,44),r.top));
   panel.style.left=left+'px';panel.style.top=top+'px';panel.style.right='auto';
   position={left,top};
 }
 function open(){
   panel.hidden=false;
   panel.style.removeProperty('display');
   panel.style.removeProperty('visibility');
   panel.style.removeProperty('opacity');
   if(position){panel.style.left=position.left+'px';panel.style.top=position.top+'px';panel.style.right='auto';}
   else{panel.style.left=Math.max(8,window.innerWidth-panel.offsetWidth-22)+'px';panel.style.top=Math.min(105,Math.max(8,window.innerHeight-100))+'px';panel.style.right='auto';}
   constrain();
 }
 function close(){panel.hidden=true;}
 for(const id of ['calculatorOpen','editorCalculator'])document.getElementById(id)?.addEventListener('click',e=>{e.preventDefault();open();});
 document.getElementById('calculatorClose')?.addEventListener('click',close);
 panel.querySelector('.calculator-grid')?.addEventListener('click',e=>{
   const b=e.target.closest('button[data-calc]');
   if(!b)return;
   e.preventDefault();e.stopPropagation();press(b.dataset.calc);
 });
 document.getElementById('calculatorCopy')?.addEventListener('click',async()=>{
   try{await navigator.clipboard.writeText(value);message.textContent='Resultado copiado';}
   catch{message.textContent='Não foi possível copiar automaticamente';}
 });
 panel.addEventListener('keydown',e=>{
   if(e.target.tagName==='BUTTON' && (e.key==='Enter'||e.key===' '))return;
   const keys={'+':'add','-':'subtract','*':'multiply','/':'divide',',':'decimal','.':'decimal','=':'equals','Enter':'equals','Backspace':'back','Escape':'close','%':'percent'};
   const k=/^\d$/.test(e.key)?e.key:keys[e.key];
   if(k){e.preventDefault();e.stopPropagation();if(k==='close')close();else press(k);}
 });
 let drag=null;
 header.addEventListener('pointerdown',e=>{
   if(e.button!==0||e.target.closest('button'))return;
   const r=panel.getBoundingClientRect();
   drag={id:e.pointerId,dx:e.clientX-r.left,dy:e.clientY-r.top};
   header.setPointerCapture(e.pointerId);
   e.preventDefault();
 });
 header.addEventListener('pointermove',e=>{
   if(!drag||drag.id!==e.pointerId)return;
   const left=Math.max(0,Math.min(window.innerWidth-panel.offsetWidth,e.clientX-drag.dx));
   const top=Math.max(0,Math.min(window.innerHeight-40,e.clientY-drag.dy));
   panel.style.left=left+'px';panel.style.top=top+'px';panel.style.right='auto';
   position={left,top};
 });
 for(const event of ['pointerup','pointercancel','lostpointercapture'])header.addEventListener(event,()=>{drag=null;});
 window.addEventListener('resize',()=>{if(!panel.hidden)constrain();});
 paint();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
