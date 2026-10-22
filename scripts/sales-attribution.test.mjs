import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const contextScript = await readFile('sites/sales/public/registration-context.js','utf8');
const hostScript = await readFile('sites/sales/public/registration-host.js','utf8');

function embed({query='',ownQuery='',direct=false,crossOrigin=false,denied=false}={}) {
  const location = new URL('https://agk-edu.ru/sales/registration/'+ownQuery);
  const window = {};
  const parent = direct ? window : {location:new URL((crossOrigin?'https://other.example':'https://agk-edu.ru')+'/sales/'+query+'#register')};
  if (denied) Object.defineProperty(parent,'location',{get(){throw new Error('SecurityError');}});
  const changes=[];
  const history={state:{preserved:true},replaceState(state,title,url){
    assert.equal(state,history.state);
    changes.push(url);
    location.href=url;
  }};
  runInNewContext(contextScript,{window,parent,location,history,URL});
  return {location,changes};
}

test('both sales editions run attribution synchronously before GetCourse',async()=>{
  for (const edition of ['com','ru']) {
    const html=await readFile(`dist/${edition}/sales/registration/index.html`,'utf8');
    const attribution=html.indexOf('<script src="../registration-context.js"></script>');
    assert.ok(attribution>=0 && attribution<html.indexOf('widget/script?id='));
    assert.equal(await readFile(`dist/${edition}/sales/registration-context.js`,'utf8'),contextScript);
  }
});

for (const query of [
  '?utm_source=vk&utm_medium=cpc&utm_campaign=sales_oct27&utm_content=video_1&utm_term=warm',
  '?utm_source=telegram&utm_campaign=%D0%BE%D1%81%D0%B5%D0%BD%D1%8C%20%26%20%D0%B7%D0%B8%D0%BC%D0%B0&gcpc=partner&yclid=123&fbclid=abc',
  '?utm_source=first&utm_source=second&empty=&utm_content=a%2Bb+space%26value'
]) test(`nested registration preserves query exactly: ${query}`,()=>{
  const {location,changes}=embed({query});
  assert.equal(location.search,query);
  assert.equal(location.pathname,'/sales/registration/');
  assert.equal(location.hash,'');
  assert.equal(changes.length,1);
});

test('untagged parent clears stale child attribution without inventing a source',()=>{
  assert.equal(embed({ownQuery:'?utm_source=old'}).location.search,'');
  assert.equal(embed().changes.length,0);
});
test('standalone recovery keeps its own campaign',()=>{
  const {location,changes}=embed({direct:true,ownQuery:'?utm_source=direct'});
  assert.equal(location.search,'?utm_source=direct');
  assert.equal(changes.length,0);
});
test('already matching query does not navigate or replace history',()=>{
  assert.equal(embed({query:'?utm_source=vk',ownQuery:'?utm_source=vk'}).changes.length,0);
});
test('foreign or inaccessible parent cannot modify form attribution',()=>{
  assert.equal(embed({crossOrigin:true,query:'?utm_source=foreign'}).changes.length,0);
  assert.equal(embed({denied:true}).changes.length,0);
});

test('both recovery links keep campaign; trusted sizing and lazy loading stay intact',()=>{
  const location = new URL('https://www.agkedu.com/sales/?utm_source=vk&utm_campaign=a%2Bb#register');
  const hosts=[false,true].map(lazy=>{
    const frame={loading:lazy?'lazy':'eager',contentWindow:{},addEventListener(){}};
    const link={href:'https://www.agkedu.com/sales/registration/'};
    const nodes={'iframe':frame,'.widget-recovery a':link,'.widget-status':{hidden:false},'.widget-recovery':{hidden:true}};
    return {dataset:{},nodes,querySelector(selector){return nodes[selector];}};
  });
  const listeners={};
  runInNewContext(hostScript,{document:{querySelectorAll:()=>hosts},location,URL,Map,
    setTimeout:()=>1,clearTimeout(){},addEventListener(type,fn){listeners[type]=fn;}});
  for (const host of hosts) {
    assert.equal(new URL(host.nodes['.widget-recovery a'].href).search,location.search);
    assert.equal(new URL(host.nodes['.widget-recovery a'].href).hash,'');
  }
  const message={origin:location.origin,source:hosts[0].nodes.iframe.contentWindow,data:{type:'agk:sales-widget-size',height:610}};
  listeners.message({...message,origin:'https://foreign.example'});
  assert.equal(hosts[0].dataset.ready,undefined);
  listeners.message(message);
  assert.equal(hosts[0].nodes.iframe.height,'610');
  assert.equal(hosts[0].nodes['.widget-status'].hidden,true);
  assert.equal(hosts[0].nodes['.widget-recovery'].hidden,true);
  assert.equal(hosts[1].nodes.iframe.loading,'lazy');
});
