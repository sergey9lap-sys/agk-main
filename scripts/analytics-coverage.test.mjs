import {test} from 'node:test';import assert from 'node:assert/strict';import {readFile,access} from 'node:fs/promises';
const registry=JSON.parse(await readFile('sites.json','utf8'));
for(const edition of ['com','ru'])test(`${edition}: one regional counter on every public landing and confirmation`,async()=>{
 const id=edition==='com'?'110484887':'110484880',other=edition==='com'?'110484880':'110484887';
 for(const [slug,site] of Object.entries(registry)){
  if(slug==='session-preview'||!Object.hasOwn(site.editions,edition))continue;
  for(const suffix of ['index.html','thanks/index.html','spasibo/index.html']){
   const path=`dist/${edition}/${slug}/${suffix}`;try{await access(path)}catch{continue}
   const html=await readFile(path,'utf8');assert.equal(html.split(`ym(${id},'init'`).length-1,1,path);assert.ok(!html.includes(other),path);
   assert.equal(html.split("fbq('init', '1923709794923109')").length-1,edition==='com'?1:0,path);
  }
 }
});
