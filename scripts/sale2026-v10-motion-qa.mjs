import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 await page.goto('http://127.0.0.1:4413/sale2026/?v=revision-10');
 for(const selector of ['.cover .button','.program-trigger','.classes-gallery [data-gallery-next]','.classes-gallery [data-gallery-prev]']){
  const button=page.locator(selector).first();await button.hover();await page.waitForTimeout(200);
  const transform=await button.locator('svg').evaluate(e=>getComputedStyle(e).transform);assert.notEqual(transform,'none',selector);
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.cover .button').hover();
 assert.equal(await page.locator('.cover .button svg').evaluate(e=>getComputedStyle(e).transform),'none');
 const prices=await page.locator('.plan .price').evaluateAll(nodes=>nodes.map(e=>({bg:getComputedStyle(e).backgroundColor,label:getComputedStyle(e.querySelector(':scope>span')).backgroundColor,amount:getComputedStyle(e.querySelector('strong')).color})));
 assert.ok(prices.every(p=>p.bg==='rgb(245, 231, 207)'&&p.label==='rgb(150, 47, 37)'&&p.amount==='rgb(150, 47, 37)'));
 console.log('Arrow hover/reduced-motion and beige price-label checks passed');
}finally{await browser.close();}
