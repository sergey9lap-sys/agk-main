import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';import {writeFile,mkdir} from 'node:fs/promises';
import https from 'node:https';
// Test the new server during DNS propagation; Node still validates the real hostname certificate.
const direct=path=>new Promise((resolve,reject)=>{const request=https.get({hostname:'agk-edu.ru',path,lookup:(_host,options,cb)=>options.all?cb(null,[{address:'179.252.219.213',family:4}]):cb(null,'179.252.219.213',4),timeout:20000},response=>{const chunks=[];response.on('data',s=>chunks.push(s));response.on('end',()=>{const headers={...response.headers};delete headers['transfer-encoding'];delete headers.connection;resolve({status:response.statusCode,headers,body:Buffer.concat(chunks)})})});request.on('error',reject);request.on('timeout',()=>request.destroy(Error('origin timeout')))});
const base='https://agk-edu.ru',out='output/timeweb-20261103';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--host-resolver-rules=MAP agk-edu.ru 179.252.219.213, MAP www.agk-edu.ru 179.252.219.213']}),rows=[],errors=[],bad=[];
try{for(const width of [1440,390])for(const slug of ['web121126','web121126_r','web121126_short','web121126_r_short','sale2026','premium-programs','sales']){
 const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push({slug,width,error:e.message}));p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)bad.push({slug,width,url:r.url(),status:r.status()})});await p.route(/mc\.yandex|facebook\.net|facebook\.com/,r=>r.abort());
 await p.route(base+'/**',async route=>{const u=new URL(route.request().url());await route.fulfill(await direct(u.pathname+u.search))});
 await p.goto(`${base}/${slug}/?utm_source=readonly-qa&utm_campaign=timeweb-migration`,{waitUntil:'domcontentloaded'});
 await p.locator('h1').waitFor();await p.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,10000))]));
 const reject=p.locator('[data-premium-reject]:visible,[data-cookie-reject]:visible');if(await reject.count())await reject.first().click();
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,slug+'/'+width);
 if(slug.startsWith('web121126')){
  const wrapper=await (await p.locator('[data-widget] iframe').first().elementHandle()).contentFrame(),official=wrapper.locator('#widget>iframe');await official.waitFor({timeout:30000});const u=new URL(await official.getAttribute('src'));assert.equal(u.searchParams.get('id'),slug.startsWith('web121126_r')?'1677842':'1677820');assert.equal(u.searchParams.get('utm_source'),'readonly-qa');await p.waitForFunction(()=>document.querySelector('[data-widget]').dataset.ready==='true',{},{timeout:30000});
 }
 await p.screenshot({path:`${out}/${slug}-${width}.png`});rows.push({slug,width,url:p.url()});await p.close();console.log(slug,width,'PASS');
}assert.deepEqual(bad,[]);assert.deepEqual(errors,[]);await writeFile(`${out}/browser-results.json`,JSON.stringify({rows,bad,errors},null,2));console.log('TIMEWEB_BROWSER_PASS',rows.length)}finally{await browser.close()}
