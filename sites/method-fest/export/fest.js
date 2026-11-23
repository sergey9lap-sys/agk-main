const q=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];all('[data-open]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.open).showModal());all('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
function tick(){const now=Date.now(),delta=Math.max(0,Math.ceil((Date.parse('2026-12-01T00:00:00+03:00')-now)/60000));q('#author-price').textContent=now>=Date.parse('2026-11-23T00:00:00+03:00')?'3 900 руб.':'2 900 руб.';all('[data-clock]').forEach(el=>el.textContent=`${Math.floor(delta/1440)} д · ${Math.floor(delta/60)%24} ч · ${delta%60} мин`);all('#gift,[data-offer]').forEach(el=>el.hidden=!delta)}tick();setInterval(tick,15000);
const rail=q('.reel'),photos=[...rail.children],motion=matchMedia('(prefers-reduced-motion: reduce)');let paused=motion.matches,visible=false,timer;const step=()=>photos[1].offsetLeft-photos[0].offsetLeft,idx=()=>Math.min(9,Math.round(rail.scrollLeft/step())),move=n=>rail.scrollTo({left:step()*((n+10)%10),behavior:motion.matches?'instant':'smooth'});function schedule(){clearInterval(timer);if(!paused&&visible&&!document.hidden)timer=setInterval(()=>move(idx()+1),4200);q('#play').textContent=paused?'Автопоказ':'Пауза';q('#play').setAttribute('aria-pressed',String(paused))}q('#play').onclick=()=>{paused=!paused;schedule()};all('[data-dir]').forEach(b=>b.onclick=()=>{move(idx()+Number(b.dataset.dir));schedule()});rail.onscroll=()=>q('#count').textContent=`${idx()+1} / 10`;new IntersectionObserver(([e])=>{visible=e.isIntersecting;schedule()}).observe(rail);document.addEventListener('visibilitychange',schedule);new IntersectionObserver(([e])=>q('.sticky').hidden=e.isIntersecting).observe(q('#tickets'));

// Keep the selected question under the pointer when a preceding answer closes.
document.querySelectorAll('#faq summary').forEach(summary => {
  summary.addEventListener('click', event => {
    event.preventDefault();
    const row = summary.parentElement;
    const top = summary.getBoundingClientRect().top;
    const opening = !row.open;
    if (opening) {
      document.querySelectorAll('#faq details[open]').forEach(other => { other.open = false; });
    }
    row.open = opening;
    const shift = summary.getBoundingClientRect().top - top;
    if (shift) window.scrollBy({top: shift, behavior: 'instant'});
  });
});
