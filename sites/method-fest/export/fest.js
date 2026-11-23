const q=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];all('[data-open]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.open).showModal());all('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());

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

const giftDeadline = Date.parse('2026-12-01T00:00:00+03:00');
function updateGiftOffer() {
  const minutes = Math.max(0, Math.ceil((giftDeadline - Date.now()) / 60000));
  for (const offer of document.querySelectorAll('[data-offer]')) offer.hidden = minutes === 0;
  const remaining = Math.floor(minutes / 1440) + ' д · ' + Math.floor(minutes % 1440 / 60) + ' ч · ' + minutes % 60 + ' мин';
  for (const clock of document.querySelectorAll('[data-clock]')) clock.textContent = remaining;
}
updateGiftOffer();
setInterval(updateGiftOffer, 1000 * 15);
