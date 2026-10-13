(() => {
  const notice = document.querySelector('[data-cookie-notice]');
  if (!notice) return;
  const key = 'agk_cookie_consent_mentor_consultation';
  const current = () => document.cookie.split('; ').find(item => item.startsWith(key + '='))?.split('=')[1];
  const save = value => {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${key}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  };
  notice.hidden = ['accepted','rejected'].includes(current());
  let opener;
  function close() { notice.hidden = true; opener?.focus(); }
  function reject() {
    const previouslyAccepted = current() === 'accepted';
    save('rejected'); close();
    // Unload any already-initialized counter; the next document starts rejected.
    if (previouslyAccepted) location.reload();
  }
  notice.querySelector('[data-cookie-dismiss]').addEventListener('click', reject);
  notice.querySelector('[data-cookie-reject]').addEventListener('click', reject);
  notice.querySelector('[data-cookie-accept]').addEventListener('click', () => {
    save('accepted'); close();
    window.dispatchEvent(new CustomEvent('agk:cookie-consent'));
  });
  document.querySelector('[data-cookie-settings]')?.addEventListener('click', event => {
    opener = event.currentTarget; notice.hidden = false;
    notice.querySelector('[data-cookie-accept]').focus();
  });
})();
