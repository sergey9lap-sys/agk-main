import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
const runtime=resolve(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const {chromium}=await import(pathToFileURL(resolve(runtime,'playwright/index.mjs')));
const browser=await chromium.launch({channel:'msedge',headless:true});
const report=[];
try{for(const width of [1536,1280,390,320]){
 const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4362/archetype/',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 const info=await page.evaluate(()=>{
  const bounds=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right};};
  const radius=s=>getComputedStyle(document.querySelector(s)).borderRadius;
  return {overflow:document.documentElement.scrollWidth>innerWidth,heading:bounds('#author h2'),intro:bounds('.author-intro-name'),photo:bounds('.author-photo'),image:bounds('.author-photo img'),closing:bounds('.closing-photo'),footer:bounds('footer'),bottomBorder:getComputedStyle(document.querySelector('.closing-photo')).borderBottomWidth,radii:{cta:radius('.hero .cta'),event:radius('.event'),plaques:[...document.querySelectorAll('.hero-results li')].map(e=>getComputedStyle(e).borderRadius),tariffs:[...document.querySelectorAll('.tariff-card')].map(e=>({card:getComputedStyle(e).borderBottomLeftRadius,button:getComputedStyle(e.querySelector('.cta')).borderBottomLeftRadius}))},approachTop:getComputedStyle(document.querySelector('.approach')).paddingTop,ctas:[...document.querySelectorAll('.cta')].map(b=>{const r=b.getBoundingClientRect(),s=getComputedStyle(b);return {text:b.textContent.trim(),width:Math.round(r.width),height:r.height,radius:s.borderRadius,color:s.backgroundColor,font:s.fontSize,opacity:s.opacity,filter:s.filter};}),cards:['.audience-grid','.approach-grid','.archetypes-grid','.program-grid'].map(selector=>({selector,heights:[...document.querySelectorAll(selector+' article')].map(a=>Math.round(a.getBoundingClientRect().height))})),missing:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)};
 });
 const signature=b=>[b.width,b.height,b.radius,b.color,b.font,b.opacity,b.filter].join('|');
 if(new Set(info.ctas.map(signature)).size!==1)throw new Error(`CTA drift at ${width}: ${JSON.stringify(info.ctas)}`);
 if(info.ctas.some(b=>b.height!==72||b.radius!=='36px'||b.color!=='rgb(184, 77, 53)'))throw new Error(`Incorrect CTA tokens at ${width}`);
 // Capture ordinary viewport pixels and crop them; tall element captures can
 // spuriously repaint the offscreen fixed skip-link inside the section.
 const {createRequire}=await import('node:module');
 const require=createRequire(resolve(runtime,'runtime-entry.cjs'));const sharp=require('sharp');
 for(const section of ['audience','approach','archetypes','program','tariffs','bonuses','reviews']){
  const bounds=await page.locator(section==='hero'?'.hero':`#${section}`).evaluate(e=>{const r=e.getBoundingClientRect();return {left:Math.floor(r.left+scrollX),top:Math.floor(r.top+scrollY),width:Math.floor(r.width),height:Math.floor(r.height)};});
  const tiles=[];
  for(let offset=0;offset<bounds.height;offset+=844){
   const y=await page.evaluate(async top=>{scrollTo(0,top);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return scrollY;},bounds.top+offset);
   tiles.push({input:await sharp(await page.screenshot()).extract({left:bounds.left,top:Math.round(bounds.top+offset-y),width:bounds.width,height:Math.min(844,bounds.height-offset)}).png().toBuffer(),left:0,top:offset});
  }
  await sharp({create:{width:bounds.width,height:bounds.height,channels:4,background:'#05172b'}}).composite(tiles).png().toFile(resolve(`sites/archetype/.impeccable/review/round-v13-${width}-${section}.png`));
 }
 report.push({width,errors,...info});await page.close();
}await writeFile(resolve('sites/archetype/.impeccable/review/round-v13-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}finally{await browser.close();}
