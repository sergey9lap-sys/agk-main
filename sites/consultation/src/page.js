// GetCourse owns data collection, submission and the configured redirect.
const embed = document.querySelector('.consultation-widget-embed');
const status = document.querySelector('.consultation-widget-status');
if (embed && status) {
  const timeout = setTimeout(() => {
    if (!status.hidden) status.textContent = 'Не удалось загрузить форму. Проверьте подключение к интернету и обновите страницу.';
  }, 15000);
  const observer = new MutationObserver(check);
  function check() {
    const frame = embed.querySelector('iframe');
    if (!frame) return;
    frame.title = 'Форма заявки на диагностику продуктовой линейки';
    if (frame.getBoundingClientRect().height > 50) {
      status.hidden = true;
      clearTimeout(timeout);
      observer.disconnect();
    }
  }
  observer.observe(embed, {childList:true, subtree:true, attributes:true, attributeFilter:['style','height']});
  check();
}
