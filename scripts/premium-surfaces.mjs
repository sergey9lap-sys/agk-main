import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {withAnalytics} from './analytics.mjs';
import {withRussianTypography} from '../sites/shared/russian-typography.js';
const base='/premium-programs/';
export const premiumSurfaceCSS=`
*{box-sizing:border-box}body{margin:0;background:#f1e4d5;color:#29161d;font:18px/1.55 Arial,Helvetica,sans-serif;background-image:linear-gradient(#52334412 1px,transparent 1px),linear-gradient(90deg,#52334412 1px,transparent 1px);background-size:72px 72px}a{color:inherit}h1{font:400 clamp(40px,5vw,70px)/1.08 Georgia,serif;margin:16px 0 24px;max-width:15ch}p{max-width:52ch}main{width:min(1240px,calc(100% - 80px));min-height:90svh;margin:auto;display:grid;grid-template-columns:1.35fr 1fr;gap:60px;align-items:center;padding:70px 0}.brand{font-size:16px}.portrait{width:100%;max-height:650px;object-fit:contain;border-radius:20px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.action{display:inline-flex;justify-content:center;gap:20px;align-items:center;min-height:64px;padding:16px 24px;border-radius:20px;background:#d93626;color:#fff;text-decoration:none;font-weight:700;box-shadow:0 12px 28px #190c1830}.action:hover{background:#b9271b;color:#fff}.action svg{width:22px;height:22px;transition:transform .2s}.action:hover svg{transform:translateX(4px)}.secondary{display:inline-block;margin-top:24px;text-underline-offset:5px}.error-code{font:96px/1 Georgia,serif;color:#523344}footer{padding:24px 40px;font:14px/1.5 Arial;display:flex;gap:20px;flex-wrap:wrap}a:focus-visible,button:focus-visible{outline:3px solid #523344;outline-offset:5px}@media(max-width:700px){main{width:calc(100% - 36px);grid-template-columns:1fr;gap:28px;padding:40px 0;min-height:auto}.portrait{max-height:350px}.actions{display:grid}.action{width:100%}footer{padding:24px 18px}}
`;
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
export function premiumPage(kind){
 const thanks=kind==='thanks';
 return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${thanks?'Спасибо':'Страница не найдена'} — Методология премиальных программ</title><link rel="stylesheet" href="${base}surface.css"></head><body><main><div>${thanks?'':'<div class="error-code" aria-hidden="true">404</div>'}<h1>${thanks?'Спасибо! Продолжим общение':'Здесь пока нет страницы'}</h1><p>${thanks?'По вопросам участия и доступа к мастер-классу напишите в службу заботы. Выберите удобный мессенджер.':'Возможно, в адресе опечатка или ссылка устарела. Вернитесь к мастер-классу о премиальных программах.'}</p><nav class="actions" aria-label="${thanks?'Служба заботы':'Вернуться'}">${thanks?[['Телеграм','https://agkedu.getcourse.ru/tg_subscribe'],['MAX','https://agkedu.getcourse.ru/max_subscribe'],['ВКонтакте','https://agkedu.getcourse.ru/vk_subscribe']].map(([label,url])=>`<a class="action" href="${url}" target="_blank" rel="noopener">${label}${arrow}</a>`).join(''):`<a class="action" href="${base}">К мастер-классу${arrow}</a>`}</nav>${thanks?`<a class="secondary" href="${base}">Вернуться на сайт мастер-класса</a>`:''}</div><img class="portrait" src="${base}newphoto.jpg" width="900" height="1200" alt="Александра Горева-Куртышева"></main><footer><span>Методология премиальных программ</span><a href="https://agkedu.getcourse.ru/personaldata">Политика конфиденциальности</a><a href="https://t.me/lp_sergey">Разработка сайта</a></footer></body></html>`;
}
function baseConsent(html,edition){
 const services=edition==='com'?'Яндекс.Метрику и Meta Pixel':'Яндекс.Метрику';
 return html.replace('</head>',`<style>.premium-cookie[hidden]{display:none}.premium-cookie{position:fixed;z-index:99999;left:16px;bottom:16px;width:min(430px,calc(100% - 32px));max-height:calc(100svh - 32px);overflow:auto;padding:24px;border-radius:20px;background:#29161d;color:#f1e4d5;font:16px/1.5 Arial,sans-serif;box-shadow:0 14px 32px #0004}.premium-cookie p{margin:0 0 16px}.premium-cookie a{color:inherit}.premium-cookie button{display:block;width:100%;min-height:48px;padding:12px;margin-top:10px;border-radius:20px;border:1px solid #ffb02e;background:#ffb02e;color:#29161d;font:700 16px Arial;cursor:pointer}.premium-cookie [data-premium-reject]{background:transparent;color:#f1e4d5}.premium-cookie-settings{display:block;margin:16px 24px;padding:8px;border:0;background:none;color:inherit;text-decoration:underline;font:inherit;cursor:pointer}</style></head>`).replace('</body>',`<aside class="premium-cookie" hidden data-premium-cookie aria-label="Настройки аналитики"><p>Используем ${services} для аналитики. <a href="https://agkedu.getcourse.ru/personaldata">Политика конфиденциальности</a>.</p><button type="button" data-premium-accept>Разрешить аналитику</button><button type="button" data-premium-reject>Только необходимые</button></aside><script>(()=>{const key='agk_cookie_consent_premium_programs',panel=document.querySelector('[data-premium-cookie]');const choice=()=>document.cookie.split('; ').find(v=>v.startsWith(key+'='))?.split('=')[1];panel.hidden=['accepted','rejected'].includes(choice());function save(v){const old=choice();document.cookie=key+'='+v+'; Path=/; Max-Age=31536000; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');panel.hidden=true;if(v==='accepted')window.dispatchEvent(new Event('agk:cookie-consent'));else if(old==='accepted')location.reload()}panel.querySelector('[data-premium-accept]').onclick=()=>save('accepted');panel.querySelector('[data-premium-reject]').onclick=()=>save('rejected');const b=document.createElement('button');b.type='button';b.className='premium-cookie-settings';b.textContent='Настройки cookie';b.onclick=()=>{panel.hidden=false;panel.querySelector('button').focus()};(document.querySelector('footer')||document.body).append(b)})();</script></body>`);
}
export function withPremiumConsent(html,edition,{slug='premium_programs',webinar=false,theme=''}={}){
 let fragment=baseConsent('<head></head><body></body>',edition).replaceAll('agk_cookie_consent_premium_programs',`agk_cookie_consent_${slug}`);
 if(theme==='consultation')fragment=fragment.replaceAll('#29161d','#0A2342').replaceAll('#f1e4d5','#FBFAF6').replaceAll('#ffb02e','#F5CF5C');
 else if(webinar)fragment=fragment.replaceAll('#29161d','#0b162a').replaceAll('#f1e4d5','#fff2d8').replaceAll('#ffb02e','#ff624a');
 else fragment=fragment.replaceAll('#ffb02e','#d93626').replaceAll('background:#d93626;color:#29161d','background:#d93626;color:#fff');
 const css=fragment.match(/<style>([\s\S]*?)<\/style>/)[1],panel=fragment.match(/<aside[\s\S]*?<\/aside>/)[0],logic=fragment.match(/<script>([\s\S]*?)<\/script>/)[1];
 const bootstrap=`<script>(()=>{let started=false;function start(){if(started)return;started=true;const style=document.createElement('style');style.textContent=${JSON.stringify(css)};document.head.append(style);const holder=document.createElement('div');holder.innerHTML=${JSON.stringify(panel)};document.body.append(holder.firstElementChild);${logic}}${webinar?"document.addEventListener('DOMContentLoaded',start,{once:true})":"window.addEventListener('premium:ready',start,{once:true});document.addEventListener('DOMContentLoaded',()=>{if(!document.querySelector('script[src*=\"/_next/\"]'))start()},{once:true})"}})();</script>`;
 return html.replace('</head>',bootstrap+'</head>');
}
export function withWebinarAnalytics(html,edition,slug){
 const family=slug.replace(/_short$/,'');
 const key=`agk_cookie_consent_${family}`;
 const legacyKey=`${key}_short`;
 // Both variants return to the same confirmation page. Preserve an older
 // choice and give refusal priority if the two old preferences disagree.
 const migration=`<script>(() => {
  const key=${JSON.stringify(key)}, legacyKey=${JSON.stringify(legacyKey)};
  const read=name=>document.cookie.split('; ').find(item=>item.startsWith(name+'='))?.slice(name.length+1);
  const legacy=read(legacyKey);
  if(legacy!=='accepted'&&legacy!=='rejected')return;
  const current=read(key);
  const choice=current==='rejected'||legacy==='rejected'?'rejected':'accepted';
  const scope='; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');
  if(current!==choice)document.cookie=key+'='+choice+'; Max-Age=31536000'+scope;
  document.cookie=legacyKey+'=; Max-Age=0'+scope;
 })();</script>`;
 const migrated=html.replace('</head>',migration+'</head>');
 return withAnalytics(withPremiumConsent(migrated,edition,{slug:family,webinar:true}),edition,{consentCookie:key});
}

export async function preparePremiumSurfaces(directory,edition){
 await writeFile(resolve(directory,'surface.css'),premiumSurfaceCSS);
 for(const alias of ['thanks','spasibo']){await mkdir(resolve(directory,alias),{recursive:true});await writeFile(resolve(directory,alias,'index.html'),premiumPage('thanks'))}
 await writeFile(resolve(directory,'404.html'),premiumPage('404'));
 await writeFile(resolve(directory,'.htaccess'),'ErrorDocument 404 /premium-programs/404.html\n');
 for(const path of ['index.html','pricing/index.html','thanks/index.html','spasibo/index.html','404.html']){
  const file=resolve(directory,path);let html=await readFile(file,'utf8');
  if(!['index.html','pricing/index.html'].includes(path))html=withRussianTypography(html);
  html=withAnalytics(withPremiumConsent(html,edition),edition,{includeMetaPixel:true,consentCookie:'agk_cookie_consent_premium_programs'});
  await writeFile(file,html);
 }
}
export function shortWebinar(content){
 return content.replace(/<section class="section (?:audience|gift|speaker|final)\b[\s\S]*?<\/section>/g,'').replaceAll('href="#registration"','href="#hero-registration"').replace('class="hero"','class="hero short-hero"').replace('<main id="main">','<main id="main" data-short-webinar>');
}
