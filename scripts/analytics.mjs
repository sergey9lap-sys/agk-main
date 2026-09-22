export function withAnalytics(html, edition, { includeMetaPixel = edition === 'com' } = {}) {
  const id = edition === 'ru' ? '110484880' : '110484887';
  const meta = edition === 'com' && includeMetaPixel ? `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1923709794923109');fbq('track', 'PageView');` : '';
  const analytics = `<script>
(() => {
  let loaded = false;
  const loadAnalytics = () => {
    if (loaded) return;
    loaded = true;
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}','ym');
    ym(${id},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});${meta}
  };
  if (document.cookie.split('; ').some(item => item === 'agk_cookie_consent=accepted')) loadAnalytics();
  else window.addEventListener('agk:cookie-consent', loadAnalytics, { once: true });
})();
</script>`;
  return html.replace('</head>', analytics + '</head>');
}
