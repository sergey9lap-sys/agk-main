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
