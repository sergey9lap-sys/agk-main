(() => {
  const hosts = [...document.querySelectorAll('.registration-widget')];
  const timers = new Map();
  for (const host of hosts) {
    const frame = host.querySelector('iframe');
    const startTimer = () => {
      if (host.dataset.ready) return;
      clearTimeout(timers.get(frame));
      timers.set(frame,setTimeout(() => {
        host.querySelector('.widget-status').hidden = true;
        host.querySelector('.widget-recovery').hidden = false;
      },18000));
    };
    frame.addEventListener('load',startTimer);
    if (frame.loading !== 'lazy') startTimer();
  }
  addEventListener('message',event => {
    if (event.origin !== location.origin || event.data?.type !== 'agk:sales-widget-size') return;
    const host = hosts.find(node => node.querySelector('iframe').contentWindow === event.source);
    const height = event.data.height;
    if (!host || !Number.isInteger(height) || height <= 50 || height >= 4000) return;
    const frame = host.querySelector('iframe');
    host.dataset.ready = 'true';
    frame.height = String(height);
    clearTimeout(timers.get(frame));
    host.querySelector('.widget-status').hidden = true;
    host.querySelector('.widget-recovery').hidden = true;
  });
})();
