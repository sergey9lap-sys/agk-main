export function withAnalytics(html, edition) {
  const id = edition === 'ru' ? '110484880' : '110484887';
  const meta = edition === 'com' ? `<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1923709794923109');fbq('track', 'PageView');
</script>` : '';
  const metrika = `<script type="text/javascript">
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}','ym');
ym(${id},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
</script>`;
  const fallback = `<noscript><div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute;left:-9999px;" alt="" /></div></noscript>` + (edition === 'com' ? '<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=1923709794923109&amp;ev=PageView&amp;noscript=1" /></noscript>' : '');
  return html.replace('</head>', meta + metrika + '</head>').replace(/<body\b[^>]*>/i, tag => tag + fallback);
}
