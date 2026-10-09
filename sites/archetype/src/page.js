import { tiers, priceStage, priceFor, formatPrice } from './pricing.js';
// Recognisable schematic star figures, not an observing chart or astrology.
const figures = {
  ursa: { stars: [[110,20,4],[86,66,2],[64,105,2],[52,149,2],[100,170,3],[91,214,2],[43,194,3]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]] },
  lyra: { stars: [[35,20,4],[63,70,2],[113,81,3],[85,154,3],[35,145,2]], edges: [[0,1],[0,4],[1,2],[2,3],[3,4],[4,1]] }
};
for (const [index, holder] of [...document.querySelectorAll('[data-stars]')].entries()) {
  const figure = figures[holder.dataset.stars];
  const id = `star-light-${index}`;
  holder.innerHTML = `<svg viewBox="0 0 155 250" aria-hidden="true"><defs><radialGradient id="${id}"><stop stop-color="#ffeac0" stop-opacity=".36"/><stop offset=".32" stop-color="#d8aa58" stop-opacity=".13"/><stop offset="1" stop-color="#d8aa58" stop-opacity="0"/></radialGradient></defs>${figure.edges.map(([a,b]) => `<path class="star-connection" d="M${figure.stars[a][0]} ${figure.stars[a][1]}L${figure.stars[b][0]} ${figure.stars[b][1]}"/>`).join('')}${figure.stars.map(([x,y,size],i)=>`<g class="${i===0?'star-shimmer':''}"><circle class="star-halo" cx="${x}" cy="${y}" r="${size*8}" style="fill:url(#${id})"/><path class="star-ray" d="M${x-size*4} ${y}h${size*8}M${x} ${y-size*4}v${size*8}"/><circle class="star-core" cx="${x}" cy="${y}" r="${size*.65}"/></g>`).join('')}</svg>`;
}
const icons = {
  people:'<circle cx="12" cy="7" r="3"/><path d="M6 21v-4a6 6 0 0 1 12 0v4M5 7a2.5 2.5 0 1 0 0 5M2 20v-3a4 4 0 0 1 3-4m14-6a2.5 2.5 0 1 1 0 5m3 8v-3a4 4 0 0 0-3-4"/>',
  heart:'<path d="M12 21S2 14 2 7a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 7-10 14-10 14Z"/>',
  book:'<path d="M12 6v16M2 4c4-1 7 0 10 2 3-2 6-3 10-2v16c-4-1-7 0-10 2-3-2-6-3-10-2Z"/>',
  compass:'<circle cx="12" cy="12" r="10"/><path d="m8 16 2-6 6-2-2 6Z"/>',
  crown:'<path d="m3 6 4 4 5-7 5 7 4-4-3 13H6ZM6 22h12"/>',
  mask:'<path d="M3 4c6 3 12 3 18 0v8c0 5-4 8-9 10-5-2-9-5-9-10ZM6 10h3m6 0h3m-10 6c2 2 6 2 8 0"/>',
  tools:'<path d="m3 21 13-13m-5-3 8-2 3 3-2 8M3 5l16 16M2 2l5 2-3 3Z"/>',
  eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/>',
  star:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
  flag:'<path d="M4 22V3c6-4 10 4 16 0v11c-6 4-10-4-16 0"/>',
  gift:'<rect x="3" y="10" width="18" height="12" rx="1"/><path d="M2 6h20v4H2ZM12 6v16M12 6C5 6 5 1 8 1c3 0 4 5 4 5s1-5 4-5c3 0 3 5-4 5"/>'
};
for(const icon of document.querySelectorAll('[data-icon]')) icon.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[icon.dataset.icon]??icons.star}</svg>`;

const dialog = document.querySelector('#registration');
const select = document.querySelector('#registration-tariff');
let opener;
const checkoutPanels = [...document.querySelectorAll('[data-checkout]')];
function loadCheckout(panel) {
  if (panel.dataset.loaded) return;
  panel.dataset.loaded = 'loading';
  const status = document.createElement('p');
  status.className = 'checkout-status';
  status.setAttribute('role', 'status');
  status.textContent = 'Загружаем форму…';
  const embed = document.createElement('div');
  embed.className = 'checkout-embed';
  const fallback = document.createElement('a');
  fallback.className = 'checkout-fallback';
  fallback.href = `https://agkedu.getcourse.ru/pl/lite/widget/widget?id=${panel.dataset.widget}`;
  fallback.target = '_blank';
  fallback.rel = 'noopener noreferrer';
  fallback.textContent = 'Открыть форму в отдельной вкладке';
  panel.append(status, embed, fallback);
  const script = document.createElement('script');
  script.id = panel.dataset.scriptId;
  script.src = `https://agkedu.getcourse.ru/pl/lite/widget/script?id=${panel.dataset.widget}`;
  script.onload = () => {
    // GetCourse explicitly exposes this event for loading after DOMContentLoaded.
    document.dispatchEvent(new Event(`StartWidget${panel.dataset.scriptId}`));
    const frame = embed.querySelector('iframe');
    if (!frame) { failed(); return; }
    frame.title = `Форма записи — ${tiers[panel.dataset.checkout].name ?? select.options[Number(panel.dataset.checkout)-1].text}`;
    frame.addEventListener('load', () => { status.hidden = true; panel.dataset.loaded = 'ready'; }, { once: true });
  };
  function failed() {
    panel.dataset.loaded = 'error';
    status.textContent = 'Не удалось загрузить форму. Попробуйте ещё раз или откройте её в отдельной вкладке';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'checkout-retry';
    retry.textContent = 'Повторить загрузку';
    retry.onclick = () => { panel.replaceChildren(); delete panel.dataset.loaded; loadCheckout(panel); };
    status.append(document.createElement('br'), retry);
  }
  script.onerror = failed;
  embed.append(script);
}
function showCheckout() {
  for (const panel of checkoutPanels) panel.hidden = panel.dataset.checkout !== select.value;
  loadCheckout(checkoutPanels.find(panel => !panel.hidden));
  dialog.scrollTop = 0;
}
function updatePrices() {
  const stage = priceStage();
  for(const [id, tier] of Object.entries(tiers)) {
    document.querySelector(`[data-price="${id}"]`).textContent = formatPrice(tier.prices[stage]);
    const history = document.querySelector(`[data-price-history="${id}"]`);
    history.hidden = stage === 0;
    history.textContent = stage ? formatPrice(tier.prices[stage-1]) : '';
    const next = document.querySelector(`[data-price-next="${id}"]`);
    next.replaceChildren();
    for(let i=stage+1;i<tier.prices.length;i++) {
      const line = document.createElement('p');
      line.textContent = `с ${i===1?'16':'19'} октября ${formatPrice(tier.prices[i])}`;
      next.append(line);
    }
  }
  document.querySelector('.dialog-price').textContent = formatPrice(priceFor(select.value));
}
for(const button of document.querySelectorAll('[data-register]')) {
  button.addEventListener('click', ()=> {
    opener=button;
    select.value=button.dataset.tariff??'2';
    updatePrices();
    dialog.showModal();
    showCheckout();
    select.focus();
  });
}
select.addEventListener('change',()=> { updatePrices(); showCheckout(); });
document.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updatePrices();});
updatePrices();
