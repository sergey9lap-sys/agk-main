import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';
const out='output/premium-widget-qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
try{for(const [edition,port]of [['com',4460],['ru',4461]])for(const [suffix,width]of [['',1440],['pricing/',390]]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/mc\.yandex|facebook\.net|facebook\.com/,r=>r.abort());
 await page.goto(`http://127.0.0.1:${port}/premium-programs/${suffix}?utm_source=widget-qa&utm_campaign=premium`,{waitUntil:'networkidle'});
 const reject=page.locator('[data-premium-reject]');if(await reject.isVisible())await reject.click();
 const trigger=page.getByRole('button',{name:'Получить доступ'});assert.ok(await trigger.isEnabled());await trigger.click();await page.getByRole('dialog',{name:'Оплата тарифа'}).waitFor();
 const outer=page.frameLocator('.gc-modal-frame');const official=outer.locator('#widget>iframe');await official.waitFor({timeout:30000});
 const src=await official.getAttribute('src');const url=new URL(src);assert.equal(url.searchParams.get('id'),'1677460');assert.equal(url.searchParams.get('utm_source'),'widget-qa');assert.equal(url.searchParams.get('utm_campaign'),'premium');
 const form=outer.frameLocator('#widget>iframe');await form.locator('form').first().waitFor({timeout:30000});
 const text=await form.locator('body').innerText();const inputs=await form.locator('input').count();assert.ok(inputs>0);
 await page.screenshot({path:`${out}/${edition}-${width}.png`});
 await page.getByRole('button',{name:'Закрыть',exact:true}).click();assert.equal(await page.locator('.gc-modal').count(),0);assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
 assert.deepEqual(errors,[]);results.push({edition,suffix,width,inputs,providerText:text.slice(0,1800),utm:url.searchParams.get('utm_source')});console.log(edition,width,'OK');await page.close();
}await writeFile(`${out}/results.json`,JSON.stringify(results,null,2));}finally{await browser.close()}
