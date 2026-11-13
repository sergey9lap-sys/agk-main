import {readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const here=dirname(fileURLToPath(import.meta.url));
const slugs=['web121126_short','web121126_r_short'];
const badge='<span class="autoweb-badge" data-autoweb><time><b data-date>Ближайший запуск</b></time><span>· начинаем через <b data-countdown>10:00</b></span></span>';

export function shortAutoweb(html,slug){
 if(!slugs.includes(slug))throw Error('Unexpected short webinar');
 let count=0;
 const updated=html.replace(/<p class="event-date">[\s\S]*?<\/p>/g,()=>{count++;return `<p class="event-date">${badge}</p>`;})
  .replaceAll('вебинар 12 ноября','автовебинар каждые 10 минут')
  .replaceAll('Куртышевой 12 ноября','Куртышевой. Запуск каждые 10 минут');
 if(count!==1)throw Error(`Expected one date label for ${slug}; found ${count}`);
 if(updated.includes(`/${slug}/autoweb-clock.js`))throw Error('Clock already included');
 return updated.replace('</head>',`<link rel="stylesheet" href="/${slug}/autoweb-live.css?v=20261113"><script type="module" src="/${slug}/autoweb-clock.js?v=20261113"></script></head>`);
}

export async function applyShortAutoweb(output){
 for(const slug of slugs){
  const folder=resolve(output,slug);
  for(const [source,target] of [['autoweb-clock.mjs','autoweb-clock.js'],['autoweb-live.css','autoweb-live.css']])await copyFile(resolve(here,source),resolve(folder,target));
  const file=resolve(folder,'index.html');
  await writeFile(file,shortAutoweb(await readFile(file,'utf8'),slug));
  for(const alias of ['thanks','spasibo']){
   const confirmation=resolve(folder,alias,'index.html');
   const original=await readFile(confirmation,'utf8');
   const obsolete='Ссылка на трансляцию прямо перед началом вебинара 12 ноября в 12:00 МСК, повтор в 19:00 МСК';
   if(!original.includes(obsolete))throw Error(`Expected old webinar date on ${slug}/${alias}`);
   const updated=original.replace('</h1>',`</h1>${badge}`)
    .replace(obsolete,'Ссылка на трансляцию придёт в мессенджер перед ближайшим запуском.')
    .replace('</head>',`<link rel="stylesheet" href="/${slug}/autoweb-live.css?v=20261113"><script type="module" src="/${slug}/autoweb-clock.js?v=20261113"></script></head>`);
   await writeFile(confirmation,updated);
  }
  const registration=resolve(folder,'registration','index.html');
  await writeFile(registration,(await readFile(registration,'utf8')).replaceAll('Регистрация на вебинар 12 ноября','Регистрация на автовебинар'));
 }
}
