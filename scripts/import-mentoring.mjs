// Mechanical structural import: every supplied paragraph is retained verbatim.
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const source=resolve('sites/mentor-consultation/source/index.html');
const root=resolve('sites/mentor-consultation');
const original=await readFile(source,'utf8');
function children(html){let depth=0,start=0;const out=[];for(const m of html.matchAll(/<\/?(?:div|figure)\b[^>]*>/g)){if(m[0].startsWith('</')){if(--depth===0)out.push(html.slice(start,m.index+m[0].length));}else {if(depth++===0)start=m.index;}}return out;}
const inner=original.match(/<main class="article" id="article">\s*<div class="wrap">([\s\S]*?)\s*<\/div>\s*<\/main>/)[1];
const nodes=children(inner),texts=nodes.filter(n=>n.startsWith('<div class="text">')).map(n=>n.slice('<div class="text">'.length,-6)),figures=nodes.filter(n=>n.startsWith('<figure>'));
if(texts.length!==6||figures.length!==5)throw Error('Unexpected supplied structure');
const split=text=>{const i=text.indexOf('<h2 class="sec">');if(i<0)throw Error('Missing heading');return [text.slice(0,i),text.slice(i)];};
const [situations,capital]=split(texts[1]),[market,method]=split(texts[2]),[methodDetails,start]=split(texts[3]),[startDetails,economics]=split(texts[4]),[caseStudy,next]=split(texts[5]);
const capitalParagraphs=[...capital.matchAll(/<p>[\s\S]*?<\/p>/g)].map(m=>m[0]);
if(capitalParagraphs.length!==4)throw Error('Changed comparison source');
const capitalLead=capitalParagraphs.slice(1).reduce((s,p)=>s.replace(p,''),capital);
const comparison=`<div class="comparison-grid"><article class="comparison-item">${capitalParagraphs[1]}</article><article class="comparison-item">${capitalParagraphs[2]}</article></div><div class="comparison-summary">${capitalParagraphs[3]}</div>`;
const nextParts=next.match(/^([\s\S]*?)(<ul class="nums">[\s\S]*?<\/ul>)([\s\S]*)$/);
if(!nextParts)throw Error('Changed consultation outcomes');
const scene=(id,copy,figure,extra='',className='')=>`<section class="editorial-section ${className}" id="${id}"><div class="wrap"><div class="scene"><div class="prose">${copy}</div>${figure}</div>${extra}</div></section>`;
const prose=html=>`<div class="prose continuation">${html}</div>`;
const article=`<main id="article">
${scene('audience',texts[0],figures[0],`<div class="situations">${situations}</div>`,'audience')}
${scene('capital',capitalLead,figures[1],comparison+prose(market),'capital')}
${scene('method',method,figures[2],prose(methodDetails),'method')}
${scene('start',start,figures[3],prose(startDetails),'start')}
${scene('economics',economics,figures[4],caseStudy,'economics')}
<section class="editorial-section next" id="next"><div class="wrap"><div class="prose next-copy"><div class="next-intro">${nextParts[1]}</div><div class="consultation-outcomes">${nextParts[2]}</div><div class="next-conditions">${nextParts[3]}</div></div></div></section>
</main>`;
let html=original.replace(/<style>[\s\S]*?<\/style>/,'<link rel="stylesheet" href="./src/page.css">')
 .replace(/<link[^>]+href="https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>/g,'')
 .replace(/<main class="article"[\s\S]*?<\/main>/,article)
 .replace(/<script>[\s\S]*?<\/script>/,'<script type="module" src="./src/page.js"></script>')
 .replace('<body>','<body><a class="skip-link" href="#article">Перейти к содержанию</a>')
 .replaceAll('action="#" method="post"','novalidate')
 .replaceAll('class="btn" type="submit"','class="btn" type="button" data-preview-submit')
 .replaceAll('<a href="#">','<span class="document-placeholder">').replaceAll('персональных данных</a>','персональных данных</span>').replaceAll('конфиденциальности</a>','конфиденциальности</span>');
const widget=`<div class="registration-widget" data-registration-widget="1667814"><p class="widget-status" data-widget-status role="status">Загружаем форму записи…</p><div class="widget-embed" data-widget-embed></div><button class="widget-retry" data-widget-retry type="button" hidden>Повторить загрузку формы</button><noscript>Для загрузки формы включите JavaScript</noscript></div>`;
html=html.replace(/<form\b[\s\S]*?<\/form>/g,widget);
html=html.replace(/(<p class="lead">[\s\S]*?<\/p>)/,'$1<a class="btn hero-jump" href="#form">Записаться на консультацию</a>');
html=html.replace(/<footer>[\s\S]*?<\/footer>/,`<footer class="site-footer"><div class="wrap footer-main"><img src="img/logo-full.png" alt="Академия методологии Александры Горевой-Куртышевой" width="250" loading="lazy"><div class="footer-legal"><p>ИП Горева-Куртышева Александра Александровна<br>ИНН 246212538610</p><nav aria-label="Контакты и документы"><a href="tel:+79895421560">+7 989 542-15-60</a><a href="https://agkedu.getcourse.ru/personaldata" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a></nav></div></div><div class="wrap footer-bottom"><span>© 2026 Академия Александры Горевой-Куртышевой</span><a href="https://agkedu.ru/" target="_blank" rel="noopener noreferrer">agkedu.ru</a><a href="https://t.me/lp_sergey" target="_blank" rel="noopener noreferrer">Разработка сайта</a><a href="#top">Наверх ↑</a></div></footer>`);
const imageNames=['crossroads','capital','mentoring','start','iceberg'];
for(let i=0;i<imageNames.length;i++)html=html.replaceAll(`img/0${i+2}-${imageNames[i]}.jpg`,`img/${imageNames[i]}-editorial.webp`);
// The source's 05-start name is retained above; no source portrait is regenerated.
html=html.replaceAll('<i>✦</i>','<i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></i>');
html=html.replace('<div class="frame"></div>','<div class="frame" aria-hidden="true"></div>');
html=html.replaceAll('widget-fallback','registration-alternative');
// Reading refinement preserves sentences verbatim; spans only group them.
const readingBreaks=[
 ['ответ на вопрос, какой именно продукт','ответ на вопрос, какой именно продукт'],
 ['В статье это не разобрать','В статье это не разобрать'],
 ['У каждого есть бывшие коллеги','У каждого есть бывшие коллеги'],
 ['Потому что когда эксперт сразу','Потому что когда эксперт сразу'],
 ['он собирается из того опыта','он собирается из того опыта'],
 ['Это 30 минут один на один','Это 30 минут один на один'],
 ['<mark>Экспертизы много','<mark>Экспертизы много'],
 ['А те, кто уже пробовал консультировать','А те, кто уже пробовал консультировать'],
 ['Не разовый разговор, а трек','Не разовый разговор, а трек'],
 ['Вот так разовая консультация превращается','Вот так разовая консультация превращается'],
 ['<strong>Если вы сейчас в найме','<strong>Если вы сейчас в найме'],
 ['Это ваши <strong>текущие активы','Это ваши <strong>текущие активы'],
 ['Клиент приходит и спрашивает','Клиент приходит и спрашивает'],
 ['Разовой консультацией на этот вопрос','Разовой консультацией на этот вопрос'],
];
html=html.replace(/<p\b([^>]*)>([\s\S]*?)<\/p>/g,(whole,attrs,body)=>{
 const breaks=readingBreaks.map(([needle])=>body.indexOf(needle)).filter(i=>i>0).sort((a,b)=>a-b);
 if(!breaks.length)return whole;
 let last=0;return `<p${attrs} class="reading-paragraph"><span class="reading-part">`+breaks.map(i=>{const chunk=body.slice(last,i);last=i;return chunk;}).join('</span><span class="reading-part">')+'</span><span class="reading-part">'+body.slice(last)+'</span></p>';
});
const kicker='<div class="kicker">Кому и зачем нужна эта консультация</div>';
html=html.replace(kicker,'').replace('alt="Эксперт на развилке нескольких карьерных дорог" loading="lazy"></figure>','alt="Эксперт на развилке нескольких карьерных дорог" loading="lazy"><figcaption>Кому и зачем нужна эта консультация</figcaption></figure>');
for(const phrase of ['Несколько корпоративных треков','основная работа никуда не делась','клиенты приходят случайно','Рынок за последний год очень сильно поменялся','Логичный вопрос: если уж делать продукт, почему не курс, не клуб, не что-то посерьёзнее?'])html=html.replace(phrase,`<strong>${phrase}</strong>`);
html=html.replace('Почему с него стоит начинать, а не с курса или клуба','Почему стоит начинать с него, а не с курса или клуба');
// Open reading chapters: all supplied copy is immediately available, no disclosure.
const labels={audience:[['Несколько','Большой опыт и выбор направления'],['При этом','Своя практика и работа в найме']],capital:[['И есть второй','Почему клиенту важен результат'],['Получается','Какой формат решает обе задачи']],method:[['Менторинг это','Как устроен менторский трек'],['Главное отличие','Что делает клиент и что получаете вы']],start:[['Логичный вопрос','Почему не курс или клуб'],['Менторинг же','Как начать рядом с основной работой'],['Первые клиенты','С кого начать: первые клиенты'],['А дальше','Как вырастает следующий продукт']],next:[['Можно закрыть','Почему нельзя просто продолжать размышлять'],['Поэтому мы','Что будет на диагностической консультации']]};
for(const [id,titles]of Object.entries(labels)){
 html=html.replace(new RegExp(`(<section[^>]+id="${id}"[^>]*>)([\\s\\S]*?)(</section>)`),(whole,open,content,close)=>open+content.replace(/<p\b[^>]*>[\s\S]*?<\/p>/g,p=>{
  const plain=p.replace(/<[^>]*>/g,'').trim(),label=titles.find(([prefix])=>plain.startsWith(prefix))?.[1];if(plain.length<240||!label)return p;
  return `<div class="reading-chapter"><h3 class="reading-topic">${label}</h3>${p}</div>`;
 })+close);
}
await writeFile(resolve(root,'index.html'),html.replace(/^[ \t]+$/gm,''));
console.log('Imported eight complete semantic sections, author, case and both forms');
