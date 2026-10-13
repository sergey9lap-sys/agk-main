import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {withAnalytics} from './analytics.mjs';
test('consultation RU analytics waits for consent; COM has no new tracking',async()=>{
 const ru=await readFile('dist/ru/mentor-consultation/index.html','utf8');
 const com=await readFile('dist/com/mentor-consultation/index.html','utf8');
 assert.ok(ru.includes('agk_cookie_consent_mentor_consultation=accepted'));
 assert.ok(ru.includes("ym(110484880,'init'"));
 assert.ok(ru.includes('data-cookie-settings')&&ru.includes('data-cookie-reject'));
 assert.ok(!ru.includes('connect.facebook.net'));
 assert.ok(!com.includes('mc.yandex.ru/metrika')&&!com.includes('data-cookie-notice'));
 for(const choice of ['','rejected','accepted']){
  const appended=[],events={};
  const context={document:{cookie:choice?`agk_cookie_consent_mentor_consultation=${choice}`:'',scripts:[],referrer:'',createElement:()=>({}),getElementsByTagName:()=>[{parentNode:{insertBefore:node=>appended.push(node.src)}}]},location:{href:'https://agk-edu.ru/mentor-consultation/'},addEventListener:(name,fn)=>events[name]=fn};
  context.window=context;
  const html=withAnalytics('<head></head>','ru',{includeMetaPixel:false,consentCookie:'agk_cookie_consent_mentor_consultation'});
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
  assert.equal(appended.length,choice==='accepted'?1:0);
  if(choice===''){events['agk:cookie-consent']();events['agk:cookie-consent']();assert.equal(appended.length,1);}
 }
});
test('cookie UI stores rejection, permits later acceptance and reloads on withdrawal',async()=>{
 const code=await readFile('sites/mentor-consultation/public/cookie-consent.js','utf8');
 const listeners={},elements={};
 const element=key=>elements[key]??= {focus(){},addEventListener:(event,fn)=>listeners[key]=fn};
 const notice={hidden:true,querySelector:element};
 const context={document:{cookie:'',querySelector:key=>key==='[data-cookie-notice]'?notice:element(key)},location:{protocol:'https:',reload(){context.reloaded=true;}},window:{dispatchEvent(){context.dispatched=true;}},CustomEvent:class {}};
 vm.runInNewContext(code,context);
 assert.equal(notice.hidden,false);
 listeners['[data-cookie-reject]']();
 assert.match(context.document.cookie,/=rejected;/);assert.equal(context.dispatched,undefined);
 listeners['[data-cookie-settings]']({currentTarget:element('settings')});assert.equal(notice.hidden,false);
 listeners['[data-cookie-accept]']();assert.match(context.document.cookie,/=accepted;/);assert.equal(context.dispatched,true);
 listeners['[data-cookie-dismiss]']();assert.equal(context.reloaded,true);
});
