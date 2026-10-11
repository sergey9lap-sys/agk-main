import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'));
const dir='sites/archetype/.impeccable/review/';
const before=fs.readFileSync(dir+'source-before-v16.html','utf8');
const now=fs.readFileSync('sites/archetype/index.html','utf8');
const clean=s=>s.replace(/<!--[\s\S]*?-->/g,'').replace(/<picture class="(?:hero-map|section-map)[\s\S]*?<\/picture>/g,'').replace(/\s+/g,' ').trim();
if(clean(before)!==clean(now))throw new Error('Unexpected non-decoration HTML change');
const browser=await chromium.launch({channel:'msedge',headless:true});
const report=[];
for(const width of [1536,1280,390,320]){
 const page=await browser.newPage({viewport:{width,height:width<600?844:1024},deviceScaleFactor:1,reducedMotion:'reduce'});
 await page.route(/mc\.yandex\.|connect\.facebook\.|facebook\.com\/tr|agkedu\.getcourse\.ru/,r=>r.abort());
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4362/archetype/?preview=cold-celestial-v16',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;for(const p of document.images){p.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 for(const id of ['method','archetypes','tariffs','reviews','closing'])await page.locator('#'+id).scrollIntoViewIfNeeded();
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:dir+`cold-v16-hero-${width}.png`});
 if(width===1536||width===390){for(const id of ['method','archetypes','tariffs','reviews','closing'])await page.locator('#'+id).screenshot({path:dir+`cold-v16-${id}-${width}.png`,style:'.skip-link:not(:focus){visibility:hidden}'});}
 const metrics=await page.evaluate(()=>({
 overflow:document.documentElement.scrollWidth>innerWidth,
 missing:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')),
 backgrounds:[...document.querySelectorAll('.hero-map img,.section-map img')].map(i=>({src:i.currentSrc,loaded:i.naturalWidth>0})),
 ctas:[...document.querySelectorAll('.cta')].filter(e=>e.getBoundingClientRect().width).map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {width:r.width,height:r.height,radius:s.borderRadius,color:s.backgroundColor};}),
 headings:[...document.querySelectorAll('#method h2,#archetypes h2,#tariffs h2,#reviews h2,#closing h2')].map(e=>({color:getComputedStyle(e).color,text:e.textContent})),
 }));
 report.push({width,errors,...metrics});
 await page.close();
}
await browser.close();
fs.writeFileSync(dir+'cold-v16-report.json',JSON.stringify({contentPreserved:true,report},null,2));
console.log(JSON.stringify({contentPreserved:true,report}));
