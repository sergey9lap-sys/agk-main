// The sale landing did not previously have an analytics consent surface.
// Keep the official checkout isolated; this panel controls only landing analytics.
export function withCampaignConsent(html, slug, edition) {
  if (!['sale2026', 'november'].includes(slug)) throw Error('Unsupported campaign');
  const services = edition === 'com' ? 'Яндекс.Метрику и Meta Pixel' : 'Яндекс.Метрику';
  return html.replace('</head>', `<style>
.campaign-cookie[hidden]{display:none}.campaign-cookie{position:fixed;z-index:200;left:20px;bottom:20px;box-sizing:border-box;width:min(440px,calc(100% - 40px));max-height:calc(100dvh - 40px);overflow:auto;padding:24px;border-radius:24px;background:#141c3a;color:#fbf6ee;box-shadow:0 16px 40px #0004;font:400 15px/1.55 Manrope,Arial,sans-serif}.campaign-cookie p{margin:0;font-size:15px}.campaign-cookie a{color:inherit;text-underline-offset:3px}.campaign-cookie-actions{display:grid;gap:12px;margin-top:18px}.campaign-cookie button{min-height:48px;padding:12px 18px;border:1px solid #d6ff3f;border-radius:24px;font:700 15px/1.35 Manrope,Arial,sans-serif;cursor:pointer}.campaign-cookie [data-cookie-accept]{background:#d6ff3f;color:#142024}.campaign-cookie [data-cookie-reject]{background:transparent;color:#fbf6ee}.campaign-cookie :focus-visible,.campaign-cookie-settings:focus-visible{outline:3px solid #d6ff3f;outline-offset:3px}.campaign-cookie-settings{display:block;padding:8px 0;margin-top:12px;border:0;background:none;color:inherit;font:inherit;text-decoration:underline;cursor:pointer}@media(max-width:520px){.campaign-cookie{left:12px;bottom:12px;width:calc(100% - 24px);padding:22px}}
</style></head>`).replace('</body>', `<aside class="campaign-cookie" data-cookie-notice hidden aria-label="Настройки аналитики"><p>Для аналитики используем ${services}. Подробнее — в <a href="https://agkedu.getcourse.ru/personaldata" target="_blank" rel="noopener">политике конфиденциальности</a>.</p><div class="campaign-cookie-actions"><button type="button" data-cookie-accept>Разрешить аналитику</button><button type="button" data-cookie-reject>Только необходимые</button></div></aside><script>
(() => {
 const notice=document.querySelector('.campaign-cookie');
 const key='agk_cookie_consent_${slug}';
 const choice=()=>document.cookie.split('; ').find(item=>item.startsWith(key+'='))?.split('=')[1];
 notice.hidden=['accepted','rejected'].includes(choice());
 let opener;
 const save=value=>{const accepted=choice()==='accepted';document.cookie=key+'='+value+'; Path=/; Max-Age=31536000; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');notice.hidden=true;opener?.focus();if(value==='accepted')window.dispatchEvent(new CustomEvent('agk:cookie-consent'));else if(accepted)location.reload();};
 notice.querySelector('[data-cookie-accept]').addEventListener('click',()=>save('accepted'));
 notice.querySelector('[data-cookie-reject]').addEventListener('click',()=>save('rejected'));
 const settings=document.createElement('button');settings.type='button';settings.className='campaign-cookie-settings';settings.textContent='Настройки cookie';settings.dataset.cookieSettings='';settings.addEventListener('click',()=>{opener=settings;notice.hidden=false;notice.querySelector('button').focus();});document.querySelector('.legal-links').append(settings);
})();
</script></body>`);
}
