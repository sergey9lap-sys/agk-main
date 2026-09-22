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

const cookieNotice = document.querySelector('[data-cookie-notice]');

if (cookieNotice) {
  const consentCookie = 'agk_cookie_consent';
  const hasConsent = document.cookie.split('; ').some(item => item === `${consentCookie}=accepted`);

  const hideNotice = () => {
    cookieNotice.classList.add('cookie-notice--closing');
    window.setTimeout(() => {
      cookieNotice.hidden = true;
      cookieNotice.classList.remove('cookie-notice--closing');
    }, 180);
  };

  if (!hasConsent) cookieNotice.hidden = false;

  cookieNotice.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${consentCookie}=accepted; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent('agk:cookie-consent'));
    hideNotice();
  });

  cookieNotice.querySelector('[data-cookie-dismiss]')?.addEventListener('click', hideNotice);
}
