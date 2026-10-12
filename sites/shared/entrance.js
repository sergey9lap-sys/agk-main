// Prepare offscreen elements before visibility, then reveal exactly once.
export function setupEntrances({hero,sections,items}){
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduce.matches||!Element.prototype.animate)return;
 const active=new Map(),seen=new WeakSet(),waiting=new Set();
 const easing=getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim()||'cubic-bezier(0.23, 1, 0.32, 1)';
 let observer,stopped=false;
 const booting=()=>document.documentElement.classList.contains('site-booting');
 function priority(node){return node.matches('h1,h2')?0:node.matches('p,.hero-offer,.section-intro,.author-intro-name,.author-intro-details')?1:node.matches('figure,.hero-visual,.author-photo,.closing-photo')?2:3;}
 const heroes=[...document.querySelectorAll(hero)],nodes=new Set(heroes);
 for(const section of document.querySelectorAll(sections))for(const node of section.querySelectorAll(items))nodes.add(node);
 const targets=[...nodes].filter(node=>!node.matches('.card')&&![...nodes].some(parent=>parent!==node&&parent.contains(node))).sort((a,b)=>priority(a)-priority(b));
 for(const node of targets){
  const r=node.getBoundingClientRect();
  if(!booting()&&r.top<innerHeight&&r.bottom>0){seen.add(node);continue;}
  node.dataset.motionPrepared='true';
  const animation=node.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:800,easing,fill:'both'});
  animation.pause();animation.currentTime=0;active.set(node,animation);
 }
 function enter(node,delay){
  if(stopped||seen.has(node))return;
  if(booting()){waiting.add(node);return;}
  seen.add(node);node.dataset.motionSeen='true';observer?.unobserve(node);
  const animation=active.get(node);if(!animation)return;
  animation.effect.updateTiming({delay});animation.play();
  animation.finished.then(()=>{animation.cancel();active.delete(node);}).catch(()=>{});
 }
 function reveal(list){[...list].sort((a,b)=>priority(a)-priority(b)).forEach((node,index)=>enter(node,Math.min(index*80,400)));}
 function ready(){const visible=targets.filter(n=>{const r=n.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;});reveal(new Set([...visible,...waiting]));waiting.clear();}
 if('IntersectionObserver' in window){
  observer=new IntersectionObserver(entries=>reveal(entries.filter(e=>e.isIntersecting).map(e=>e.target)),{threshold:0,rootMargin:'0px 0px -5% 0px'});
  for(const node of targets)if(!seen.has(node))observer.observe(node);
 }else {for(const animation of active.values())animation.cancel();active.clear();}
 if(booting())document.addEventListener('site:ready',ready,{once:true});else ready();
 function cancel(){stopped=true;observer?.disconnect();for(const animation of active.values())animation.cancel();active.clear();}
 reduce.addEventListener('change',()=>{if(reduce.matches)cancel();});
 document.addEventListener('focusin',cancel);
 window.addEventListener('pagehide',cancel,{once:true});
 window.addEventListener('pageshow',event=>{if(event.persisted)cancel();});
}
