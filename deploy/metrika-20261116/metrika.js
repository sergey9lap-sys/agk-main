(() => {
  'use strict';
  if (window.agkCampaignMetrika) return;
  const site = location.pathname.split('/')[1];
  if (!['moderator', 'method-fest'].includes(site)) return;
  window.agkCampaignMetrika = true;
  const prefix = site === 'moderator' ? 'moderator' : 'methodfest';
  const cookie = 'agk_cookie_consent';
  const accepted = () => document.cookie.split(';').some(c => c.trim() === cookie + '=accepted');
  const choice = () => document.cookie.split(';').some(c => new RegExp('^' + cookie + '=(accepted|rejected)$').test(c.trim()));
  let started = false;
  const goal = (name, params = {}) => {
    if (started && accepted()) window.ym(110484880, 'reachGoal', prefix + '_' + name, params);
  };
  function start() {
    if (started || !accepted()) return;
    started = true;
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = window.ym.l || Date.now();
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js?id=110484880';
    document.head.append(script);
    window.ym(110484880, 'init', {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:false});
    if (/\/thanks(?:\/|$)/.test(location.pathname)) goal('thanks_view');
  }
  const notice = document.createElement('section');
  notice.id = 'agk-metrika-consent';
  notice.setAttribute('aria-label', 'Настройки аналитики');
  notice.innerHTML = '<p>Разрешить Яндекс Метрику? Она помогает нам понимать, как используют сайт. <a href="https://agkedu.getcourse.ru/personaldata" target="_blank" rel="noopener">Политика конфиденциальности</a></p><div><button type="button" data-accept>Разрешить аналитику</button><button type="button" data-reject>Только необходимые</button></div>';
  const style = document.createElement('style');
  style.textContent = `#agk-metrika-consent{position:fixed;inset:auto 16px 16px;z-index:10000;max-width:700px;margin:auto;padding:18px;background:${site === 'moderator' ? '#370d20' : '#141414'};color:#fff5df;border:1px solid #d9ba7d;border-radius:20px;box-shadow:0 8px 40px #0006;font:15px/1.5 Arial,sans-serif;box-sizing:border-box;max-height:85dvh;overflow:auto}#agk-metrika-consent[hidden]{display:none!important}#agk-metrika-consent p{margin:0 0 12px;color:inherit;font:inherit}#agk-metrika-consent a{color:inherit;text-decoration:underline}#agk-metrika-consent div{display:flex;gap:10px;flex-wrap:wrap}#agk-metrika-consent button{flex:1;min-width:200px;min-height:44px;padding:10px 14px;border:1px solid #e3c68c;border-radius:14px;background:#e3c68c;color:#271018;font:600 14px/1.4 Arial,sans-serif;cursor:pointer}#agk-metrika-consent button[data-reject]{background:transparent;color:#fff5df}#agk-metrika-consent button:focus-visible,#agk-cookie-settings:focus-visible{outline:3px solid #fff;outline-offset:3px}#agk-cookie-settings{display:block;margin:16px auto;padding:10px;background:transparent;border:0;color:inherit;text-decoration:underline;font:inherit;cursor:pointer;min-height:44px}`;
  document.head.append(style);
  document.body.append(notice);
  const settings = document.createElement('button');
  settings.id = 'agk-cookie-settings'; settings.type = 'button'; settings.textContent = 'Настройки cookie';
  (document.querySelector('footer') || document.body).append(settings);
  settings.addEventListener('click', () => {notice.hidden=false; notice.querySelector('button').focus();});
  function save(value) {
    document.cookie = cookie + '=' + value + '; Max-Age=31536000; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
    notice.hidden = true;
    settings.focus({preventScroll:true});
    if (value === 'accepted') start();
    else if (started) location.reload();
  }
  notice.querySelector('[data-accept]').addEventListener('click', () => save('accepted'));
  notice.querySelector('[data-reject]').addEventListener('click', () => save('rejected'));
  notice.hidden = choice();
  document.addEventListener('click', event => {
    const target = event.target.closest('a,button');
    if (!target) return;
    if (target.matches('[data-tariff]')) goal('tariff_click', {tariff: target.dataset.tariff});
    if (target.matches('.buy[data-plan]')) goal('tariff_click', {tariff: target.dataset.plan});
    if (target.matches('a')) {
      const url = new URL(target.href, location.href);
      if (url.hostname === 't.me' && url.pathname === '/gkalex_academy') goal('care_telegram');
      if (url.hostname === 'max.ru') goal('care_max');
    }
  }, true);
  start();
})();
