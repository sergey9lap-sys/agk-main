import {readdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {withAnalytics} from './analytics.mjs';
import {withPremiumConsent} from './premium-surfaces.mjs';
export const importedProducts=['metodologiya','mentoring','method-club'];
export async function prepareImportedProduct(directory,edition,slug){
 const host=edition==='ru'?'https://agk-edu.ru':'https://agkedu.com';
 const source=await readFile(resolve(directory,'index.html'),'utf8');
 const [bg,accent,text]=slug==='metodologiya'?['#080808','#f07830','#e8e6e1']:slug==='method-club'?['#0e0e0e','#d6a65c','#fff2d8']:['#300b1a','#c3a876','#e6d9ca'];
 const title={'metodologiya':'Методология','mentoring':'Менторинг','method-club':'Метод-клуб'}[slug];
 const error=`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Страница не найдена — ${title}</title><style>body{margin:0;background:${bg};color:${text};font:18px/1.55 Arial,sans-serif}main{width:min(720px,calc(100% - 48px));min-height:100svh;margin:auto;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:22px}h1{font:400 clamp(34px,5vw,60px)/1.1 Georgia,serif;margin:0}p{margin:0}.code{font-size:80px;color:${accent}}a{display:inline-flex;padding:16px 26px;min-height:24px;border-radius:18px;background:${accent};color:${bg};font-weight:700;text-decoration:none}a:focus-visible{outline:3px solid ${text};outline-offset:5px}</style></head><body><main><p class="code">404</p><h1>Здесь пока нет страницы</h1><p>Вернитесь к программе «${title}».</p><a href="/${slug}/">На страницу программы →</a></main></body></html>`;
 await writeFile(resolve(directory,'404.html'),error);
 await writeFile(resolve(directory,'.htaccess'),`ErrorDocument 404 /${slug}/404.html\n`);
 const files=[];async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){if(e.isDirectory()&&e.name!=='_next')await walk(resolve(dir,e.name));else if(e.isFile()&&/\.(html|txt|xml|json|webmanifest)$/.test(e.name))files.push(resolve(dir,e.name));}}await walk(directory);
 for(const p of files){let html=await readFile(p,'utf8');html=html.replaceAll('https://agk-edu.ru/'+slug,host+'/'+slug);
  if(p.endsWith('.html')){
   html=html.replaceAll('href="/manifest.webmanifest"',`href="/${slug}/manifest.webmanifest"`);
   html=html.replace('</head>',`<script>window.__AGK_EDITION__=${JSON.stringify(edition)};</script></head>`);
   if(slug==='mentoring'||p===resolve(directory,'404.html'))html=withPremiumConsent(html,edition,{slug,webinar:true});
   html=withAnalytics(html,edition,{includeMetaPixel:true,consentCookie:`agk_cookie_consent_${slug}`});
  }
  await writeFile(p,html);
 }
 // Source layouts are preserved; this assertion prevents accidentally deploying the old subdomain.
 if(source.includes(`https://${slug}.agk-edu.ru`))throw Error('Stale imported canonical: '+slug);
}
