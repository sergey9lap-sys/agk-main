(() => {
  const notice = document.querySelector('[data-cookie-notice]');
  if (!notice) return;
  const consentCookie = 'agk_cookie_consent_praktikum';
  const accepted = document.cookie.split('; ').some(item => item === `${consentCookie}=accepted`);
  if (accepted) return;

  notice.hidden = false;
  notice.querySelector('[data-cookie-dismiss]').addEventListener('click', () => {
    notice.hidden = true;
  });
  notice.querySelector('[data-cookie-accept]').addEventListener('click', () => {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${consentCookie}=accepted; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
    notice.hidden = true;
    window.dispatchEvent(new CustomEvent('agk:cookie-consent'));
  });
})();
