import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {withAnalytics} from './analytics.mjs';
import {withCampaignConsent} from './campaign-consent.mjs';

test('campaigns and masterclass contain exactly one regional counter and no checkout PageView',async()=>{
 for(const edition of ['com','ru'])for(const slug of ['sale2026','november','mkclients']){
  const html=await readFile(`dist/${edition}/${slug}/index.html`,'utf8');
  assert.equal(html.split(`ym(${edition==='com'?'110484887':'110484880'},'init'`).length-1,1);
  assert.equal(html.split("fbq('init', '1923709794923109')").length-1,edition==='com'?1:0);
  assert.ok(html.includes(`agk_cookie_consent_${slug}`));
  assert.ok(html.includes('data-cookie-notice'));
  if(slug!=='mkclients')for(const key of ['1','2','3','help']){
   const checkout=await readFile(`dist/${edition}/${slug}/forms/${key}/index.html`,'utf8').catch(()=>null);
   if(checkout)assert.ok(!checkout.includes('fbq('),'isolated checkout must not duplicate landing tracking');
  }
 }
});

test('Meta PageView waits for consent, initializes once, and never invents a Lead',()=>{
 for(const choice of ['', 'rejected','accepted']){
  const appended=[],events={};
  const context={document:{cookie:choice?`agk_cookie_consent_sale2026=${choice}`:'',scripts:[],referrer:'',createElement:()=>({}),getElementsByTagName:()=>[{parentNode:{insertBefore:n=>appended.push(n.src)}}]},location:{href:'https://www.agkedu.com/sale2026/'},addEventListener:(name,fn)=>events[name]=fn};context.window=context;
  const html=withAnalytics('<head></head>','com',{consentCookie:'agk_cookie_consent_sale2026'});
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
  assert.equal(appended.length,choice==='accepted'?2:0);
  if(!choice){context.document.cookie='agk_cookie_consent_sale2026=accepted';events['agk:cookie-consent']();events['agk:cookie-consent']();assert.equal(appended.length,2);}
  if(choice!=='rejected')assert.equal(JSON.stringify(context.fbq.queue.map(args=>Array.from(args))),JSON.stringify([['init','1923709794923109'],['track','PageView']]));
 }
});

test('campaign consent remembers rejection, can reopen, and unloads tracking on withdrawal',()=>{
 const handlers={},elements={};let cookie='';
 const element=key=>elements[key]??={focus(){},addEventListener:(_,fn)=>handlers[key]=fn};
 const notice={hidden:true,querySelector:element};
 const document={querySelector:s=>s==='.campaign-cookie'?notice:{append:e=>{elements.settings=e;}},createElement:()=>({dataset:{},focus(){},addEventListener:(_,fn)=>handlers.settings=fn})};
 Object.defineProperty(document,'cookie',{get:()=>cookie,set:v=>{cookie=v.split(';')[0];}});
 const context={document,location:{protocol:'https:',reload:()=>context.reloaded=true},CustomEvent:class{constructor(type){this.type=type;}}};context.window=context;context.dispatchEvent=()=>context.dispatched=true;
 const html=withCampaignConsent('<head></head><body><div class="legal-links"></div></body>','sale2026','com');
 vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
 assert.equal(notice.hidden,false);handlers['[data-cookie-reject]']();assert.equal(cookie,'agk_cookie_consent_sale2026=rejected');assert.equal(context.dispatched,undefined);
 handlers.settings();assert.equal(notice.hidden,false);handlers['[data-cookie-accept]']();assert.equal(cookie,'agk_cookie_consent_sale2026=accepted');assert.equal(context.dispatched,true);
 handlers.settings();handlers['[data-cookie-reject]']();assert.equal(context.reloaded,true);
});
