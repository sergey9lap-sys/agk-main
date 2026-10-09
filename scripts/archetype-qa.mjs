import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const runtime = process.env.AGK_QA_RUNTIME ?? resolve(process.env.USERPROFILE??process.env.HOME??'.','.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const { chromium } = await import(pathToFileURL(resolve(runtime, 'playwright/index.mjs')));
const require = createRequire(resolve(runtime, 'runtime-entry.cjs'));
const sharp = require('sharp');
const out = resolve('sites/archetype/.impeccable/review');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const heroOnly = process.argv.includes('--hero');
const report = [];
async function captureDocument(page, path, width, viewportHeight) {
  const documentHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
  const tiles=[];
  for(let top=0;top<documentHeight;top+=viewportHeight){
    const actualTop=await page.evaluate(async target=>{scrollTo(0,target);await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));return scrollY;},top);
    const buffer=await page.screenshot({fullPage:false});
    const tileHeight=Math.min(viewportHeight,documentHeight-top);
    const input=await sharp(buffer).extract({left:0,top:Math.round(top-actualTop),width,height:tileHeight}).png().toBuffer();
    tiles.push({input,left:0,top});
  }
  await sharp({create:{width,height:documentHeight,channels:4,background:'#0b1c34'}}).composite(tiles).png().toFile(path);
  await page.evaluate(()=>scrollTo(0,0));
}
try {
  for (const [name,width,height] of heroOnly ? [['hero-repro',1536,1024]] : [['desktop',1536,1024],['laptop',1280,720],['mobile',390,844],['narrow',320,740]]) {
    let page = await browser.newPage({ viewport:{width,height}, reducedMotion:'reduce' });
    const errors = [], failed = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if(response.status()>=400) failed.push(`${response.status()} ${response.url()}`); });
    await page.goto('http://127.0.0.1:4362/archetype/', {waitUntil:'networkidle'});
    await page.evaluate(async()=> {await document.fonts.ready;document.querySelectorAll('img[loading="lazy"]').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));});
    if(heroOnly) await page.screenshot({path:resolve(out,`${name}.png`)});
    else await captureDocument(page,resolve(out,`${name}.png`),width,height);
    const info = await page.evaluate(()=>({
      overflow:document.documentElement.scrollWidth > innerWidth,
      missingImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),
      h1:document.querySelector('h1')?.textContent,
      ctas:[...document.querySelectorAll('.cta')].map(b=>{const r=b.getBoundingClientRect(),s=getComputedStyle(b);return {label:b.textContent.trim(),width:Math.round(r.width),height:r.height,radius:s.borderRadius,background:s.backgroundColor,font:s.font,icon:b.querySelector('svg')?.getAttribute('viewBox')};}),
      sections:[...document.querySelectorAll('main section')].map(s=>s.id)
    }));
    const states = {};
    if(!heroOnly){
      await page.locator('[data-tariff="2"]').first().click();
      states.selectedFull=await page.locator('#registration-tariff').inputValue();
      await page.screenshot({path:resolve(out,`${name}-dialog.png`)});
      await page.keyboard.press('Escape');
      states.escapeClosed=await page.locator('#registration').evaluate(el=>!el.open);
      await page.locator('#faq details').first().locator('summary').click();
      states.faqOpens=await page.locator('#faq details').first().evaluate(el=>el.open);
      states.noLocalForm=await page.locator('form,input').count()===0;
      await page.keyboard.press('Tab');
      states.focusStyle=await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle);
    }
    report.push({name,width,height,...info,errors,failed,states});
    if(!heroOnly){
      // Keep keyboard-state evidence separate from clean composition captures.
      await page.close();
      page = await browser.newPage({ viewport:{width,height}, reducedMotion:'reduce' });
      await page.goto('http://127.0.0.1:4362/archetype/', {waitUntil:'networkidle'});
      await page.evaluate(async()=> {await document.fonts.ready;document.querySelectorAll('img[loading="lazy"]').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})));});
      for(const section of ['hero','method','program','bonuses','closing','problem','tariffs','author','archetypes','reviews']){
        const locator=page.locator(section==='hero'?'.hero':`#${section}`);
        const bounds=await locator.evaluate(element=>{const r=element.getBoundingClientRect();return {left:Math.floor(r.left+scrollX),top:Math.floor(r.top+scrollY),width:Math.floor(r.width),height:Math.floor(r.height)};});
        // Chromium element screenshots repaint an offscreen fixed skip-link inside tall crops.
        // Crop exact pixels from the valid, unfocused full-page capture instead; no masking.
        await sharp(resolve(out,`${name}.png`)).extract(bounds).png().toFile(resolve(out,`${name}-${section}.png`));
      }
    }
    await page.close();
  }
  await writeFile(resolve(out,heroOnly?'hero-report.json':'qa-report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  // Contact sheet retains the entire inspected document; individual sections stay legible separately.
  if(!heroOnly){
    for(const name of ['desktop','mobile']){
      const image=sharp(resolve(out,`${name}.png`));const meta=await image.metadata();
      const chunks=[];
      for(let top=0;top<meta.height;top+=2000) chunks.push({input:await sharp(resolve(out,`${name}.png`)).extract({left:0,top,width:meta.width,height:Math.min(2000,meta.height-top)}).resize({width:350}).png().toBuffer(),left:Math.floor(top/2000)*350,top:0});
      await sharp({create:{width:350*chunks.length,height:Math.ceil(2000*350/meta.width),channels:4,background:'#f6f1e8'}}).composite(chunks).png().toFile(resolve(out,`${name}-contact.png`));
    }
  }
} finally { await browser.close(); }
