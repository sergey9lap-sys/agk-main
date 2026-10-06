const clients = document.querySelector('.clients');
if (clients) {
  const track = clients.querySelector('.clients-track');
  const group = clients.querySelector('.clients-group');
  const toggle = clients.querySelector('.clients-toggle');
  const copy = group.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.classList.add('clients-copy');
  track.append(copy);
  clients.classList.add('clients-enhanced');
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const paused = clients.classList.toggle('clients-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Продолжить строку' : 'Остановить строку';
  });
  const observer = new IntersectionObserver(([entry]) => {
    clients.classList.toggle('clients-offscreen', !entry.isIntersecting);
  });
  observer.observe(clients);
}

// GetCourse owns submission and redirects; observe only embed readiness.
const registration = document.querySelector('.registration-widget');
if (registration) {
  const embed = registration.querySelector('.registration-widget-embed');
  const status = registration.querySelector('.registration-status');
  const timeout = setTimeout(() => {
    if (!status.hidden) status.textContent = 'Не удалось загрузить форму. Проверьте подключение к интернету и обновите страницу.';
  }, 15000);
  const observer = new MutationObserver(check);
  function check() {
    const frame = embed.querySelector('iframe');
    if (!frame) return;
    frame.title = 'Форма регистрации на вебинар «Прививка от выгорания»';
    if (frame.getBoundingClientRect().height > 50) {
      status.hidden = true;
      clearTimeout(timeout);
      observer.disconnect();
    }
  }
  observer.observe(embed, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'height'] });
  check();
}
