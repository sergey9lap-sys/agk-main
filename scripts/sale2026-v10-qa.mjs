import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='.impeccable/review/sale2026-v10';await mkdir(out,{recursive:true});
const base=process.env.NOVEMBER_QA_BASE||'http://127.0.0.1:4413';
const browser=await chromium.launch({channel:'msedge',headless:true});
const report={widths:[],checks:[],errors:[],failedRequests:[]};
const sections=['.cover','.tariffs','.new-section','.masterclasses','.guide-section','.extras','.speaker-section','.compare-section','.faq-section','footer'];
try{
 for(const [width,height]of [[1280,800],[390,844],[320,740],[768,1024],[1024,768],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  page.on('pageerror',e=>report.errors.push({width,error:e.message}));
  page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))report.failedRequests.push({width,url:r.url(),status:r.status()});});
  await page.goto(base+'/sale2026/?v=revision-10',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{await document.fonts.ready;for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
  const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,
   title:document.querySelector('h1').innerText,
   classes:document.querySelectorAll('.class-entry').length,guides:document.querySelectorAll('.guides li').length,
   calendarEvents:document.querySelectorAll('.calendar-event').length,
   broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),
   buttons:[...document.querySelectorAll('.button')].filter(e=>!e.closest('dialog')).map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{text:e.innerText,w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.x),primary:e.classList.contains('primary'),radius:s.borderRadius,bg:s.backgroundColor,visible:!!e.offsetWidth};}),
   sections:[...document.querySelectorAll('main>section')].map(e=>({name:e.className,height:Math.round(e.getBoundingClientRect().height)})),
   imageFit:[...document.querySelectorAll('.class-visual,.guide-cover img')].map(e=>({src:e.getAttribute('src'),fit:getComputedStyle(e).objectFit})),
   deadline:document.querySelector('.cover .deadline').getBoundingClientRect().bottom,
   heroButtonBottom:document.querySelector('.cover .button').getBoundingClientRect().bottom,
   overflowingText:[...document.querySelectorAll('.calendar-day,.class-entry h3,.guide-caption,.plan h3,.button')].filter(e=>e.offsetWidth&&e.scrollWidth>e.clientWidth+2).map(e=>e.textContent)
  }));
  const flow=await page.evaluate(()=>{const r=e=>e.getBoundingClientRect(),h=r(document.querySelector('.cover h1')),p=r(document.querySelector('.cover-photo')),plans=[...document.querySelectorAll('.plan')].map(e=>({x:r(e).x,y:r(e).y,w:r(e).width})),cal=document.querySelector('.calendar-layout');return{heroOverlap:h.right>p.left+1,heroTopDifference:Math.abs(h.top-p.top),plans,calendarOverflow:cal.scrollWidth>cal.clientWidth+1,comparisonHidden:[...document.querySelectorAll('tbody td')].filter(e=>getComputedStyle(e).display==='none').length,comparisonTextOverflow:[...document.querySelectorAll('.comparison-scroll td,.comparison-scroll th')].filter(e=>e.offsetWidth&&e.scrollWidth>e.clientWidth+2).map(e=>e.innerText),shadow:getComputedStyle(document.querySelector('.cover .button')).boxShadow,extrasBorder:getComputedStyle(document.querySelector('.extras-grid article')).borderColor};});
  if(width<=760){assert.equal(flow.heroOverlap,false,'hero overlap '+width);assert.ok(flow.heroTopDifference<2,'hero top '+width);assert.ok(flow.plans[1].y>flow.plans[0].y&&flow.plans[2].y>flow.plans[1].y,'stacked plans');assert.ok(flow.plans.every(p=>Math.abs(p.x-flow.plans[0].x)<1));assert.equal(flow.calendarOverflow,false);assert.equal(await page.locator('.plan-gallery .gallery-controls').isVisible(),false);}
  assert.equal(flow.comparisonHidden,0);assert.deepEqual(flow.comparisonTextOverflow,[],'comparison text '+width);assert.notEqual(flow.shadow,'none');
  const polish=await page.evaluate(()=>{const box=e=>e.getBoundingClientRect();return{headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,headingColor:getComputedStyle(document.querySelector('h1')).color,heroPhoto:document.querySelector('.cover-photo img').getAttribute('src'),authorPhoto:document.querySelector('.speaker-grid>figure img').getAttribute('src'),ctaInsets:[...document.querySelectorAll('.plan')].map(e=>{const r=box(e),b=box(e.querySelector('.button'));return{left:b.left-r.left,right:r.right-b.right};}),priceColors:[...document.querySelectorAll('.price strong,.sale-row td')].map(e=>getComputedStyle(e).color),buttonTextOverflow:[...document.querySelectorAll('.button')].filter(e=>e.offsetWidth&&(e.scrollHeight>e.clientHeight+2||e.scrollWidth>e.clientWidth+2)).map(e=>e.innerText)};});
  assert.match(polish.headingFont,/SaleDisplay/);assert.match(polish.heroPhoto,/assets\/v10\/alexandra-room/);assert.match(polish.authorPhoto,/assets\/v8\/alexandra-author/);assert.deepEqual(polish.buttonTextOverflow,[]);
  if(width<=760)assert.ok(polish.ctaInsets.every(x=>x.left>=20&&x.right>=20),'button insets '+width);
  report.widths.push({width,height,...metrics,flow,polish});
  if(width===1280||width===390){
   await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/hero-${width}.png`});
   if(width===390)await page.locator('.plan').first().screenshot({path:out+'/plan-390.png'});
   for(let i=0;i<sections.length;i++){const element=page.locator(sections[i]);await element.scrollIntoViewIfNeeded();await element.screenshot({path:`${out}/${width}-${i+1}.png`});}
   await page.locator('[data-open-consultation]').click();await page.locator('#consultation-dialog').screenshot({path:`${out}/form-${width}.png`});
   assert.equal(await page.locator('#consultation-name').evaluate(e=>document.activeElement===e),true);
   await page.fill('#consultation-name','Проверка без отправки');await page.fill('#consultation-phone','+7 900 000-00-00');await page.check('input[name=channel][value=telegram]');
   assert.equal(await page.locator('#consultation-form button[type=submit]').isDisabled(),true);assert.equal(await page.locator('.preview-notice,.pending-note,.order-note,.gallery-disclaimer').count(),0);assert.equal(await page.locator('[data-open-consultation]').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(214, 255, 63)');
   for(const day of [3,10])assert.equal(await page.locator('#event-'+day).evaluate(e=>e.parentElement.className),'calendar-days');
   assert.equal(await page.locator('#consultation-dialog').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
   await page.keyboard.press('Escape');assert.equal(await page.locator('#consultation-dialog').evaluate(e=>e.open),false);
   assert.equal(await page.locator('[data-open-consultation]').evaluate(e=>document.activeElement===e),true);
   await page.locator('[data-open-consultation]').click();await page.locator('[data-close-consultation]').click();
   report.checks.push('consultation placeholder/focus/close '+width);
   for(const selector of ['.classes-gallery','.guides-gallery']){
    const gallery=page.locator(selector),track=gallery.locator('.gallery-track');await track.focus();await page.keyboard.press('End');await page.waitForTimeout(60);
    assert.equal(await track.evaluate(e=>e.scrollLeft>=e.scrollWidth-e.clientWidth-3),true);
    const count=await gallery.locator('.gallery-count').innerText();assert.ok(count.includes(selector.includes('classes')?'12':'14'));
    await gallery.screenshot({path:`${out}/${selector.slice(1)}-last-${width}.png`});
    await gallery.locator('[data-gallery-all]').click();assert.equal(await gallery.evaluate(e=>e.classList.contains('is-expanded')),true);
    await gallery.locator('[data-gallery-all]').click();await track.focus();await page.keyboard.press('Home');
   }
   await page.locator('[data-plan="1"]').first().click();for(let i=0;i<3;i++)await page.locator('.class-selection input').nth(i).check();
   assert.match(await page.locator('.selection-status').innerText(),/Выбрано\s3\sиз\s3/);assert.equal(await page.locator('.class-selection input:disabled').count(),9);
   await page.locator('.close-order').click();await page.locator('[data-plan="2"]').first().click();for(let i=0;i<8;i++)await page.locator('.class-selection input').nth(i).check();
   assert.match(await page.locator('[data-order-title]').innerText(),/Мастер/);assert.equal(await page.locator('.class-selection input:disabled').count(),4);
   await page.locator('.close-order').click();await page.locator('[data-plan="3"]').first().click();assert.equal(await page.locator('.class-selection').isVisible(),false);assert.match(await page.locator('[data-order-description]').innerText(),/все\s12/);await page.locator('.close-order').click();
   for(let i=0;i<2;i++){const trigger=page.locator('.program-trigger').nth(i),card=page.locator('.event-card').nth(i);const before=await card.evaluate(e=>e.offsetHeight);await trigger.click();const dialog=page.locator('.program-dialog').nth(i);assert.equal(await dialog.evaluate(e=>e.open),true);assert.equal(await dialog.locator('li').count(),i===0?5:6);assert.equal(await card.evaluate(e=>e.offsetHeight),before);assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');await dialog.screenshot({path:out+'/topics-open-'+width+'-'+i+'.png'});await page.keyboard.press('Escape');assert.equal(await trigger.evaluate(e=>document.activeElement===e),true);await trigger.click();await dialog.locator('.program-close').click();assert.equal(await dialog.evaluate(e=>e.open),false);}assert.equal(new Set(polish.priceColors).size,1,'uniform price colors');assert.equal(polish.priceColors[0],'rgb(150, 47, 37)');
   const faq=page.locator('.faq-section');const before=await faq.evaluate(e=>{const s=getComputedStyle(e);return{image:s.backgroundImage,size:s.backgroundSize,position:s.backgroundPosition};});
   await page.locator('.faq-list details').first().evaluate(e=>e.open=true);const after=await faq.evaluate(e=>{const s=getComputedStyle(e);return{image:s.backgroundImage,size:s.backgroundSize,position:s.backgroundPosition};});assert.deepEqual(after,before);assert.notEqual(after.size,'cover');
   assert.ok(await page.locator('.calendar-board').evaluate(e=>e.getBoundingClientRect().width>document.querySelector('.new-section .wrap').getBoundingClientRect().width*.95));
   assert.equal(await page.locator('.cover-photo').evaluate(e=>getComputedStyle(e).borderRadius),'0px');
   await faq.screenshot({path:`${out}/faq-open-${width}.png`});
   report.checks.push('gallery endpoints, 3/8 selection, all 12, FAQ material '+width);
  }
  await page.close();
 }
 const errorPage=await browser.newPage({viewport:{width:390,height:844}});await errorPage.goto(base+'/sale2026/404.html');await errorPage.screenshot({path:out+'/404-390.png'});assert.equal(await errorPage.locator('.notfound .button').getAttribute('href'),'/sale2026/');await errorPage.setViewportSize({width:1280,height:800});await errorPage.screenshot({path:out+'/404-1280.png'});const rootError=await readFile('dist/com/404.html','utf8');await errorPage.route('**/sale2026/missing/',route=>route.fulfill({status:404,contentType:'text/html',body:rootError}));await errorPage.goto(base+'/sale2026/missing/');await errorPage.waitForSelector('.notfound');assert.equal(await errorPage.locator('.notfound .button').getAttribute('href'),'/sale2026/');report.checks.push('root404 November recovery with simulated404response');await errorPage.close();
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.failedRequests,[]);
 for(const item of report.widths){assert.equal(item.overflow,false,`overflow ${item.width}`);assert.deepEqual(item.broken,[]);assert.deepEqual(item.overflowingText,[],`text ${item.width}`);assert.equal(item.classes,12);assert.equal(item.guides,14);assert.equal(item.calendarEvents,2);assert.ok(item.imageFit.every(x=>x.fit==='contain'));const buttons=item.buttons.filter(x=>x.visible&&x.primary);assert.equal(new Set(buttons.map(x=>[x.w,x.h,x.radius,x.bg].join('|'))).size,1,`CTA geometry ${item.width}`);}
}finally{await writeFile(out+'/qa.json',JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({widths:report.widths.map(x=>({width:x.width,overflow:x.overflow,heroCTA:x.heroButtonBottom,deadline:x.deadline,overflowingText:x.overflowingText})),checks:report.checks,errors:report.errors,failedRequests:report.failedRequests},null,2));
