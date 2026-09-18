const names = ['База', 'Практика', 'VIP — под ключ'];
document.querySelectorAll('.mk-tariff').forEach((card, index) => {
  const widget = card.querySelector('.mk-widget');
  const dialog = document.createElement('dialog');
  dialog.className = 'mk-modal';
  dialog.setAttribute('aria-labelledby', `checkout-title-${index}`);
  const panel = document.createElement('div');
  panel.className = 'mk-modal__panel';
  panel.innerHTML = `<button class="mk-modal__close" type="button" aria-label="Закрыть">×</button><h2 id="checkout-title-${index}">${names[index]}</h2>`;
  panel.append(widget);
  dialog.append(panel);
  document.body.append(dialog);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mk-button mk-tariff__button';
  button.textContent = `Выбрать «${names[index]}»`;
  button.setAttribute('aria-haspopup', 'dialog');
  card.append(button);
  let checkoutStarted = false;
  button.addEventListener('click', () => {
    dialog.showModal();
    // Moving an iframe into a dialog resets its browsing context.
    // Start it once in its final, visible container.
    const frame = widget.querySelector('iframe');
    if (frame && !checkoutStarted) {
      frame.src = frame.src;
      checkoutStarted = true;
    }
  });
  panel.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => button.focus({preventScroll:true}));
});

// One explanatory moment: the route connects copy that is already visible.
const funnelMap = document.querySelector('[data-funnel-map]');
if (funnelMap) {
  const routeObserver = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    funnelMap.classList.add('is-visible');
    observer.disconnect();
  }, {threshold: 0.28});
  routeObserver.observe(funnelMap);
}
