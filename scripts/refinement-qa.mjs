import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const runtime=resolve(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const {chromium}=await import(pathToFileURL(resolve(runtime,'playwright/index.mjs')));
const browser=await chromium.launch({channel:'msedge',headless:true});const report=[];
try{
 for(const site of ['mentor-consultation','archetype']){
  await mkdir(`sites/${site}/.impeccable/review`,{recursive:true});
  for(const width of [1280,390,320]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(`http://127.0.0.1:4362/${site}/`,{waitUntil:'domcontentloaded'});
   await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
   if(site==='mentor-consultation')await page.waitForFunction(()=>document.querySelector('[data-registration-widget]')?.dataset.widgetReady==='true',{},{timeout:20000});
   const inspect=()=>page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,missing:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),cta:[...document.querySelectorAll('.cta,.btn,.sticky a')].filter(e=>e.getBoundingClientRect().height).map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return [Math.round(r.width),Math.round(r.height),s.borderRadius,s.backgroundColor,s.fontSize].join('|');}),animations:document.getAnimations().filter(a=>a.playState==='running').length}));
   let info=await inspect();assert.equal(info.overflow,false);assert.deepEqual(info.missing,[]);assert.ok(new Set(info.cta).size<=1);assert.deepEqual(errors,[]);
   // The existing archetype decorative star shimmer is independent of this
   // helper; check no helper animations run under reduced motion.
   assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a instanceof Animation&&a.effect?.target?.dataset.motionSeen).length),0);
   await page.screenshot({path:`sites/${site}/.impeccable/review/refined-hero-${width}.png`});
   for(const id of site==='mentor-consultation'?['audience','capital','method','start','economics','next','form-bottom']:['tariffs','author']){
    await page.evaluate(id=>scrollTo(0,document.getElementById(id).getBoundingClientRect().top+scrollY),id);
    if(site==='mentor-consultation'&&id==='form-bottom')await page.waitForFunction(()=>document.querySelectorAll('[data-registration-widget]')[1].dataset.widgetReady==='true',{},{timeout:20000});
    await page.screenshot({path:`sites/${site}/.impeccable/review/refined-${id}-${width}.png`});
    info=await inspect();assert.equal(info.overflow,false);assert.ok(new Set(info.cta).size<=1);
   }
   if(site==='mentor-consultation'){
    const widgets=await page.locator('[data-registration-widget]').evaluateAll(list=>list.map(h=>({ready:h.dataset.widgetReady,frameId:h.querySelector('iframe').id,height:h.querySelector('iframe').clientHeight})));
    assert.ok(widgets.every(w=>w.ready==='true'&&w.height>200));assert.equal(new Set(widgets.map(w=>w.frameId)).size,2);
   }
   report.push({site,width,info,errors});await page.close();
  }
  const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'no-preference'});
  await page.addInitScript(()=>{window.observedEntrances=[];const original=Element.prototype.animate;Element.prototype.animate=function(frames,options){if(this.dataset.motionPrepared)window.observedEntrances.push({tag:this.tagName,delay:options.delay||0,duration:options.duration});return original.call(this,frames,options);};});
  await page.goto(`http://127.0.0.1:4362/${site}/`,{waitUntil:'domcontentloaded'});await page.waitForTimeout(900);
  const initial=await page.evaluate(()=>window.observedEntrances);assert.ok(initial.length>0);assert.ok(initial.every(a=>a.duration===800&&a.delay<=400));assert.equal(initial[0].tag,'H1');
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.getAnimations().filter(a=>a.effect?.target?.dataset.motionSeen&&a.playState==='running').length===0);await page.close();
 }
 await writeFile('output/refinement-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}
