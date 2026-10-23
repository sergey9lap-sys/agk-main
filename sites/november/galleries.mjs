// Native scrolling keeps touch momentum, accessibility and no-script reading intact.
export function setupGalleries(root=document){
 const comparison=root.querySelector('.compare-section');
 if(comparison){delete comparison.dataset.comparePlan;comparison.querySelector('.compare-switch').hidden=true;}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 root.querySelectorAll('[data-gallery]').forEach(gallery=>{
  const track=gallery.querySelector('.gallery-track'),controls=gallery.querySelector('[data-gallery-controls]');
  if(!track||!controls)return;
  const cards=[...track.children],prev=controls.querySelector('[data-gallery-prev]'),next=controls.querySelector('[data-gallery-next]'),count=controls.querySelector('.gallery-count'),all=controls.querySelector('[data-gallery-all]');
  const stacked=()=>gallery.classList.contains('plan-gallery')&&matchMedia('(max-width:760px)').matches;
  const syncStack=()=>{controls.hidden=stacked();track.tabIndex=stacked()?-1:0;if(stacked())track.scrollLeft=0;};
  matchMedia('(max-width:760px)').addEventListener('change',syncStack);syncStack();let frame=0;
  const position=()=>{
   const start=track.scrollLeft,end=start+track.clientWidth;
   const indices=cards.map((card,i)=>({i,left:card.offsetLeft-track.offsetLeft,right:card.offsetLeft-track.offsetLeft+card.offsetWidth})).filter(c=>c.left>=start-3&&c.right<=end+3).map(c=>c.i);
   const first=indices[0]??cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-track.offsetLeft-start)<Math.abs(cards[best].offsetLeft-track.offsetLeft-start)?i:best,0);
   return {first,last:indices.at(-1)??first};
  };
  function update(){frame=0;const {first,last}=position();count.textContent=first===last?`${first+1} из ${cards.length}`:`${first+1}–${last+1} из ${cards.length}`;prev.disabled=track.scrollLeft<=3;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-3;}
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  function move(index,instant=false){const card=cards[Math.max(0,Math.min(cards.length-1,index))];track.scrollTo({left:card.offsetLeft-track.offsetLeft,behavior:instant||reduced.matches?'instant':'smooth'});}
  prev.addEventListener('click',()=>{const {first,last}=position();move(first-(last-first+1));});
  next.addEventListener('click',()=>move(position().last+1));
  track.addEventListener('keydown',event=>{if(stacked()||event.target!==track||gallery.classList.contains('is-expanded'))return;const key=event.key;if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;event.preventDefault();const {first,last}=position();move(key==='Home'?0:key==='End'?cards.length-1:key==='ArrowRight'?last+1:first-1,true);});
  all.addEventListener('click',()=>{const expanded=gallery.classList.toggle('is-expanded');all.setAttribute('aria-expanded',String(expanded));all.textContent=expanded?'Свернуть в слайдер':'Показать все';if(!expanded)track.scrollLeft=0;update();});
  track.addEventListener('scroll',schedule,{passive:true});new ResizeObserver(schedule).observe(track);update();
 });
}
