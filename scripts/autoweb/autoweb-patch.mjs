import{readFile,writeFile,copyFile}from'node:fs/promises';import{resolve,dirname}from'node:path';import{fileURLToPath}from'node:url';
const here=dirname(fileURLToPath(import.meta.url));
const badge='<span class="autoweb-badge" data-autoweb><time><b data-date>Ближайший запуск</b></time><span>· начинаем через <b data-countdown>10:00</b></span></span>';
export function patchPage(input,slug,thanks=false){
 if(input.includes('autoweb-live-20261112'))return input;
 let h=input;const iframes=h.match(/<iframe[^>]*>/g)||[];
 if(!thanks){let count=0;h=h.replace(/<p class="event-date">[\s\S]*?<\/p>/g,()=>{count++;return '<p class="event-date">'+badge+'</p>';});if(count!==2)throw Error('Expected exactly two date badges: '+slug+' got '+count);
 h=h.replace(/>Зарегистрироваться(<(?:svg|\/a|\/button))/g,'>Зарегистрироваться и смотреть$1').replaceAll('Регистрация на вебинар 12 ноября','Регистрация на автовебинар');
 }else{
 const gift=slug==='web121126'?'чек-лист «Где найти платёжеспособную аудиторию»':'«15 способов сделать планёрку с командой результативнее»';
 const start=h.indexOf('<div class="thanks-panel">'),end=h.indexOf('<nav class="messengers">',start);if(start<0||end<0)throw Error('Unknown thanks structure');
 const art=h.slice(start,end).match(/<img[^>]*class="gift-art[^>]*>/)?.[0]||'';
 h=h.slice(0,start)+`<div class="thanks-panel"><h1>Вы зарегистрированы! Остался один шаг</h1>${badge}<p>Ссылка на трансляцию придёт в мессенджер. Подключите его прямо сейчас, это займёт меньше минуты, и мы сразу пришлём туда ссылку и ваш подарок: ${gift}.</p>${art?'<div class="autoweb-gift">'+art+'</div>':''}`+h.slice(end);
 h=h.replace('>Telegram<svg','>Получить ссылку в Telegram<svg').replace('>MAX<svg','>Получить ссылку в MAX<svg').replace('>ВКонтакте<svg','>Получить ссылку во ВКонтакте<svg');
 }
 if(!thanks&&JSON.stringify(iframes.map(x=>x.replaceAll('12 ноября','автовебинар')))!==JSON.stringify((h.match(/<iframe[^>]*>/g)||[]).map(x=>x.replaceAll('на автовебинар','на вебинар автовебинар')))){
 // Only the human-readable iframe title may differ. All source/data-source URLs remain exact.
 const urls=s=>(s.match(/(?:data-src|src)="[^"]*"/g)||[]).join('|');if(urls(iframes.join(''))!==urls((h.match(/<iframe[^>]*>/g)||[]).join('')))throw Error('Widget changed');
 }
 return h.replace('</head>',`<!-- autoweb-live-20261112 --><link rel="stylesheet" href="/${slug}/autoweb-live.css?v=20261112"><script type="module" src="/${slug}/autoweb-clock.mjs?v=20261112"></script></head>`);
}
export async function applyAutoweb(output){for(const slug of ['web121126','web121126_r']){const root=resolve(output,slug);for(const suffix of ['index.html','thanks/index.html','spasibo/index.html']){const file=resolve(root,suffix);const old=await readFile(file,'utf8');await writeFile(file,patchPage(old,slug,suffix!=='index.html'));}for(const f of ['autoweb-clock.mjs','autoweb-live.css'])await copyFile(resolve(here,f),resolve(root,f));}console.log('AUTOWEB_PATCH_OK');}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){if(!process.argv[2])throw Error('Pass release directory');await applyAutoweb(resolve(process.argv[2]));}
