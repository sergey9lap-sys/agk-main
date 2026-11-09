document.querySelectorAll('[data-placeholder]').forEach(form=>form.addEventListener('submit',e=>e.preventDefault()));
const widgetHosts = [...document.querySelectorAll('[data-widget]')];

addEventListener('message', event => {
  const height = event.data?.height;
  if (event.origin !== location.origin || event.data?.type !== 'agk:webinar-size' ||
      !Number.isInteger(height) || height < 80 || height > 6000) return;

  const host = widgetHosts.find(widget => widget.querySelector('iframe').contentWindow === event.source);
  if (!host) return;
  host.querySelector('iframe').height = height;
  host.dataset.ready = 'true';
  host.querySelector('.widget-status').hidden = true;
});

for (const host of widgetHosts) {
  // The embedded wrapper already reads the parent campaign before loading GetCourse.
  // Preserve the same campaign and placement on the independent GetCourse link.
  const placement = new URL(host.querySelector('iframe').src);
  placement.search = location.search;
  const link = host.querySelector('.widget-recovery a');
  const direct = new URL(link.href);
  const widgetId = direct.searchParams.get('id');
  direct.search = location.search;
  direct.searchParams.set('id', widgetId);
  direct.searchParams.set('ref', location.href);
  direct.searchParams.set('loc', placement.href);
  link.href = direct.href;

  setTimeout(() => {
    if (!host.dataset.ready) {
      host.querySelector('.widget-status').textContent = 'Если форма не появилась, откройте её по ссылке выше.';
    }
  }, 18000);
}
