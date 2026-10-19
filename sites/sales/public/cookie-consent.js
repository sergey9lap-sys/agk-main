(() => {
  const notice = document.querySelector('[data-cookie-notice]');
  if (!notice) return;
  const key = 'agk_cookie_consent_sales';
  const choice = () => document.cookie.split('; ').find(item => item.startsWith(key+'='))?.split('=')[1];
  notice.hidden = ['accepted','rejected'].includes(choice());
  document.querySelector('[data-cookie-settings]')?.addEventListener('click',()=>{notice.hidden=false;notice.querySelector('button').focus();});
  const save = value => {
    const wasAccepted = choice() === 'accepted';
    document.cookie = `${key}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`;
    notice.hidden=true;
    if (value === 'accepted') window.dispatchEvent(new CustomEvent('agk:cookie-consent'));
    else if (wasAccepted) location.reload();
  };
  notice.querySelector('[data-cookie-accept]').addEventListener('click',()=>save('accepted'));
  notice.querySelector('[data-cookie-reject]').addEventListener('click',()=>save('rejected'));
})();
