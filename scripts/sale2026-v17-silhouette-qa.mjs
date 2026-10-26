import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const b=await chromium.launch({channel:'msedge',headless:true}),report=[];
try{for(const width of [320,360,375,390,430,600,760]){
 const p=await b.newPage({viewport:{width,height:900}});await p.goto('http://127.0.0.1:4413/sale2026/?v=revision-17',{waitUntil:'networkidle'});
 const m=await p.evaluate(async()=>{
  await document.fonts.ready;const img=document.querySelector('.cover-photo img');await img.decode();const r=img.getBoundingClientRect(),canvas=document.createElement('canvas');canvas.width=innerWidth;canvas.height=900;const ctx=canvas.getContext('2d');const scale=Math.min(r.width/img.naturalWidth,r.height/img.naturalHeight),w=img.naturalWidth*scale,h=img.naturalHeight*scale;ctx.drawImage(img,r.left+(r.width-w)/2,r.top,w,h);
  const root=document.querySelector('h1'),walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node,overlap=0;const rects=[];while(node=walker.nextNode()){if(!node.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(node);for(const t of range.getClientRects()){rects.push({x:t.x,y:t.y,w:t.width,h:t.height});const x=Math.max(0,Math.floor(t.left)),y=Math.max(0,Math.floor(t.top)),tw=Math.min(canvas.width-x,Math.ceil(t.width)),th=Math.min(canvas.height-y,Math.ceil(t.height));if(tw<=0||th<=0)continue;const pixels=ctx.getImageData(x,y,tw,th).data;for(let a=3;a<pixels.length;a+=4)if(pixels[a]>100)overlap++;}}
  return{right:r.right,left:r.left,overlap,rects,yearBottom:root.querySelector('span').getBoundingClientRect().bottom,descriptionTop:document.querySelector('.cover-description').getBoundingClientRect().top};
 });report.push({width,...m});assert.ok(m.right<=width+1,'right elbow '+width);assert.equal(m.overlap,0,'silhouette overlaps text '+width);assert.ok(m.descriptionTop-m.yearBottom<55,'gap after year '+width);if([320,390].includes(width))await p.screenshot({path:'.impeccable/review/sale2026-v17/hero-'+width+'.png'});await p.close();
}}finally{await writeFile('.impeccable/review/sale2026-v17/silhouette.json',JSON.stringify(report,null,2));await b.close();}
console.log('Silhouette / elbow / headline gap checked at seven mobile widths');
