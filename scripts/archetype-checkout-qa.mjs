import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const runtime=resolve(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const {chromium}=await import(pathToFileURL(resolve(runtime,'playwright/index.mjs')));
const out=resolve('sites/archetype/.impeccable/review');
await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const report=[];
try{
 for(const width of [1536,1280,390,320]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4362/archetype/',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.checkout-embed iframe').count(),0,'Lazy load before interaction');
  const forms=[];
  for(const [tariff,widget] of [['1','1667037'],['2','1667040'],['3','1667041']]){
   if(tariff==='1')await page.locator(`[data-tariff="${tariff}"]`).click();
   else await page.locator('#registration-tariff').selectOption(tariff);
   const panel=page.locator(`[data-checkout="${tariff}"]`);
   const frame=panel.locator('iframe');
   await frame.waitFor({timeout:30000});
   assert.ok((await frame.getAttribute('src')).includes(`id=${widget}`));
   await panel.locator('.checkout-status').waitFor({state:'hidden',timeout:30000});
   const child=await (await frame.elementHandle()).contentFrame();
   const text=await child.locator('body').innerText();
   const inputs=await child.locator('input:not([type="hidden"])').count();
   assert.ok(inputs>0,'Real widget has visible inputs');
   forms.push({tariff,widget,inputs,text:text.slice(0,1800),height:await frame.evaluate(el=>el.getBoundingClientRect().height),frameOverflow:await child.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
   await page.screenshot({path:resolve(out,`checkout-${width}-t${tariff}.png`)});
  }
  await page.locator('#registration-tariff').selectOption('1');
  assert.equal(await page.locator('[data-checkout="1"] iframe').count(),1);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#registration').evaluate(el=>el.open),false);
  const returnedFocus=await page.evaluate(()=>document.activeElement.dataset.tariff);
  assert.equal(returnedFocus,'1');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.screenshot({path:resolve(out,`checkout-${width}-footer.png`)});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  const ctas=await page.locator('.cta').evaluateAll(buttons=>buttons.map(b=>{const r=b.getBoundingClientRect(),s=getComputedStyle(b);return [Math.round(r.width),r.height,s.borderRadius,s.backgroundColor,s.font];}));
  assert.equal(new Set(ctas.map(c=>JSON.stringify(c))).size,1);
  assert.equal(overflow,false);
  assert.deepEqual(errors,[]);
  report.push({width,forms,overflow,returnedFocus,ctas:ctas[0],errors});
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844}});
 await page.route('**/pl/lite/widget/script?*',route=>route.abort());
 await page.goto('http://127.0.0.1:4362/archetype/',{waitUntil:'domcontentloaded'});
 await page.locator('[data-tariff="1"]').click();
 await page.locator('.checkout-retry').waitFor();
 assert.ok(await page.locator('.checkout-fallback').isVisible());
 await page.screenshot({path:resolve(out,'checkout-load-error.png')});
 await page.unroute('**/pl/lite/widget/script?*');
 await page.locator('.checkout-retry').click();
 await page.locator('[data-checkout="1"] iframe').waitFor({timeout:30000});
 await page.locator('[data-checkout="1"] .checkout-status').waitFor({state:'hidden',timeout:30000});
 report.push({recovery:true});
 await writeFile(resolve(out,'checkout-report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
