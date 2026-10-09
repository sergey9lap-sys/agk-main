import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const runtime=resolve(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const {chromium}=await import(pathToFileURL(resolve(runtime,'playwright/index.mjs')));
const browser=await chromium.launch({channel:'msedge',headless:true});
const report=[];
try{for(const width of [1536,390,320]){
 const page=await browser.newPage({viewport:{width,height:width===320?740:844},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:4362/archetype/',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;await document.querySelector('.portrait-arch img').decode();});
 const info=await page.evaluate(()=>{
  const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
  return {heading:rect('.hero h1'),photo:rect('.portrait-arch img'),button:rect('.hero .cta'),overflow:document.documentElement.scrollWidth>innerWidth,prices:[...document.querySelectorAll('[data-price]')].map(e=>e.textContent),titleOverflow:document.querySelector('.hero h1 span').getBoundingClientRect().right>document.querySelector('.hero h1').getBoundingClientRect().right,ctas:[...document.querySelectorAll('.cta')].map(b=>{const r=b.getBoundingClientRect(),s=getComputedStyle(b);return [r.width,r.height,s.borderRadius,s.backgroundColor];})};
 });
 console.log(JSON.stringify({width,...info}));
 await page.screenshot({path:resolve(`sites/archetype/.impeccable/review/hero-mobile-v8-${width}.png`)});
 assert.equal(info.overflow,false);
 if(width<600){assert.ok(info.photo.x>info.heading.x);assert.ok(info.photo.y<info.heading.bottom);assert.equal(info.titleOverflow,false);assert.ok(info.button.bottom< (width===320?740:844));}
 assert.equal(new Set(info.ctas.map(c=>JSON.stringify(c.map(v=>typeof v==='number'?Math.round(v):v)))).size,1);
 assert.ok(info.prices.every(p=>p.endsWith(' Р')));
 await page.screenshot({path:resolve(`sites/archetype/.impeccable/review/hero-mobile-v8-${width}.png`)});
 report.push({width,...info});await page.close();
}await writeFile(resolve('sites/archetype/.impeccable/review/hero-mobile-v8.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}finally{await browser.close();}
