import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='output/thanks-typography-qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
try{
 for(const slug of ['web121126','web121126_r','web121126_short','web121126_r_short','sale2026','premium-programs'])for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route(/mc\.yandex|facebook\.net|facebook\.com/,r=>r.abort());
  await page.goto(`http://127.0.0.1:4460/${slug}/`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const reject=page.locator('[data-premium-reject],[data-campaign-reject]');if(await reject.first().isVisible())await reject.first().click();
  const data=await page.evaluate(()=>{
   const dangling=[];const words=/^(?:в|во|на|с|со|к|ко|у|о|об|от|до|по|за|из|без|для|при|под|над|и|а|но|или|не|ни|бы|же|ли)$/i;
   for(const block of document.querySelectorAll('h1,h2,h3,h4,p,li,button,label,summary,figcaption')){
    if(!block.getClientRects().length||getComputedStyle(block).visibility==='hidden')continue;
    const nodes=[];const w=document.createTreeWalker(block,NodeFilter.SHOW_TEXT);for(let n;(n=w.nextNode());)nodes.push(n);
    const text=nodes.map(n=>n.data).join(''),tokens=[...text.matchAll(/[а-яё]+/giu)];
    const at=index=>{for(const n of nodes){if(index<n.length)return[n,index];index-=n.length}return[nodes.at(-1),nodes.at(-1)?.length]};
    for(let i=0;i<tokens.length-1;i++){
     const t=tokens[i],next=tokens[i+1];if(!words.test(t[0])||!/^\s+$/.test(text.slice(t.index+t[0].length,next.index)))continue;
     const r=document.createRange(),n=document.createRange();r.setStart(...at(t.index));r.setEnd(...at(t.index+t[0].length));n.setStart(...at(next.index));n.setEnd(...at(next.index+1));
     const a=r.getBoundingClientRect(),b=n.getBoundingClientRect();if(a.width&&b.width&&b.top>a.top+a.height*.65)dangling.push({tag:block.tagName,text:t[0]+' '+next[0],context:text.slice(0,100)});
    }
   }
   return {overflow:document.documentElement.scrollWidth>innerWidth+1,dangling};
  });
  assert.deepEqual(errors,[],`${slug} ${width}`);
  if(slug==='web121126_r'&&width!==320)await page.locator('.audience').screenshot({path:`${out}/audience-${width}.png`});
  results.push({slug,width,...data});console.log(slug,width,JSON.stringify(data));await page.close();
 }
 for(const edition of ['com','ru'])for(const slug of ['web121126','web121126_r','sale2026','november','premium-programs'])for(const alias of ['thanks','spasibo']){
  const page=await browser.newPage({viewport:{width:390,height:844}});const prefix=edition==='com'?4460:4461;
  const response=await page.goto(`http://127.0.0.1:${prefix}/${slug}/${alias}/`,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);assert.ok(page.url().includes(`/${slug}/${alias}/`));
  const broken=await page.evaluate(()=>[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[]);
  if(edition==='ru'&&slug==='sale2026'&&alias==='spasibo')await page.screenshot({path:`${out}/sale-spasibo.png`});await page.close();
 }
 await writeFile(`${out}/results.json`,JSON.stringify(results,null,2));assert.equal(results.filter(r=>r.overflow).length,0,'Overflow remains');assert.equal(results.flatMap(r=>r.dangling).length,0,'Dangling words remain');
}finally{await browser.close()}
