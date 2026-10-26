import { setupGalleries } from './galleries.mjs';
import './consultation.mjs';
import './program-dialogs.mjs';
import { protectRussianText } from '../shared/russian-typography.js';
setupGalleries();
const calendar=document.querySelector('.calendar-layout');
if(calendar) calendar.scrollLeft=0;
const panel = document.querySelector('#order');
const fieldset = panel.querySelector('fieldset');
const status = panel.querySelector('.selection-status');
const checks = [...fieldset.querySelectorAll('input')];
const titles = {1:'Эксперт',2:'Мастер',3:'Масштаб'};
let currentPlan = 1;
let lastTrigger;
const selected = {1:new Set(),2:new Set()};
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateSelection() {
  const limit = currentPlan === 1 ? 3 : 8;
  const set = selected[currentPlan];
  for (const input of checks) {
    input.checked = set.has(input.value);
    input.disabled = set.size >= limit && !input.checked;
  }
  status.textContent = protectRussianText(`Выбрано ${set.size} из ${limit}${set.size === limit ? ' — подборка готова' : ''}`);
}
document.querySelectorAll('[data-plan]').forEach(trigger => trigger.addEventListener('click', event => {
  event.preventDefault();
  lastTrigger = trigger;
  currentPlan = Number(trigger.dataset.plan);
  panel.hidden = false;
  panel.querySelector('[data-order-title]').textContent = `Тариф ${currentPlan} · ${titles[currentPlan]}`;
  panel.querySelector('[data-order-description]').textContent = protectRussianText(currentPlan === 3
    ? 'В этот тариф входят все 12 мастер-классов. Выбирать отдельные программы не нужно.'
    : `Отметьте ${currentPlan === 1 ? 3 : 8} мастер-классов для вашей подборки.`);
  fieldset.hidden = currentPlan === 3;
  status.hidden = currentPlan === 3;
  if(currentPlan !== 3) updateSelection();
  panel.scrollIntoView({behavior:reduce()?'instant':'smooth',block:'start'});
  panel.focus({preventScroll:true});
}));
checks.forEach(input => input.addEventListener('change', () => {
  const set = selected[currentPlan];
  if(input.checked) set.add(input.value); else set.delete(input.value);
  updateSelection();
}));
panel.querySelector('.close-order').addEventListener('click', () => {
  panel.hidden = true;
  lastTrigger?.focus();
});
export function countdown(now = Date.now()) {
  const remaining = Date.parse('2026-11-03T23:59:59+03:00') - now;
  if(remaining <= 0) return 'Распродажа завершена';
  const minutes = Math.floor(remaining / 60000);
  return `${Math.floor(minutes / 1440)} дн · ${Math.floor(minutes / 60) % 24} ч · ${minutes % 60} мин`;
}
function updateTimer() { document.querySelectorAll('[data-countdown]').forEach(el => { el.textContent = countdown(); }); }
updateTimer();
setInterval(updateTimer,60000);
document.addEventListener('visibilitychange', () => { if(!document.hidden) updateTimer(); });

// One material motion family: calendar leaves settle once; the illustrated spread opens.
// Content is always visible and remains usable if the enhancement is unavailable.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const activeAnimations = new Set();
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const materials = [...document.querySelectorAll('.guide-still img')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (motionPreference.matches) continue;
      const resting = getComputedStyle(entry.target).transform;
      const animation = entry.target.animate([
        {transform:`translateY(22px) rotate(-2deg) ${resting === 'none' ? '' : resting}`},
        {transform:resting}
      ], {duration:700,easing:'cubic-bezier(.16,1,.3,1)'});
      activeAnimations.add(animation);
      animation.finished.finally(()=>activeAnimations.delete(animation)).catch(()=>{});
    }
  }, {threshold:.25});
  materials.forEach(element=>observer.observe(element));
  motionPreference.addEventListener('change',event=>{
    if(event.matches){observer.disconnect();activeAnimations.forEach(animation=>animation.cancel());}
  });
}
