import https from 'node:https';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {execFileSync} from 'node:child_process';
const ip='179.252.219.213',host='agk-edu.ru';
const get=path=>new Promise((resolve,reject)=>{const req=https.get({hostname:host,path,lookup:(_host,options,callback)=>options.all?callback(null,[{address:ip,family:4}]):callback(null,ip,4),timeout:20000},r=>{let data='';r.setEncoding('utf8');r.on('data',s=>data+=s);r.on('end',()=>resolve({status:r.statusCode,headers:r.headers,body:data}))});req.on('timeout',()=>req.destroy(Error('timeout')));req.on('error',reject)});
const registry=JSON.parse(execFileSync('git',['show','HEAD:sites.json'],{encoding:'utf8'})),rows=[];
const paths=['/','/max/','/psy/',...Object.entries(registry).filter(([,s])=>s.editions.ru).map(([slug])=>`/${slug}/`)];
for(const path of paths){const r=await get(path);assert.equal(r.status,200,path);assert.ok(r.headers['content-type']?.includes('text/html'),path);rows.push({path,status:r.status});}
for(const slug of ['web121126','web121126_r','web121126_short','web121126_r_short','premium-programs','sales','sale2026','november']){
 for(const suffix of ['thanks/','spasibo/']){const path=`/${slug}/${suffix}`,r=await get(path);assert.equal(r.status,200,path);rows.push({path,status:r.status});}
 const r=await get(`/${slug}/agk-missing-check`);assert.equal(r.status,404,slug);assert.ok(!r.body.includes('Welcome to nginx'),slug);rows.push({path:`/${slug}/agk-missing-check`,status:r.status});
}
for(const slug of ['web121126','web121126_r','web121126_short','web121126_r_short']){
 const r=await get(`/${slug}/registration/?utm_source=readonly-qa`);assert.equal(r.status,200);assert.ok(r.body.includes(`id=${slug.startsWith('web121126_r')?'1677842':'1677820'}`));rows.push({path:`/${slug}/registration/`,status:r.status});
}
for(const slug of ['archetype','mentor-consultation']){const path=`/${slug}/agk-missing-check`,r=await get(path);assert.equal(r.status,404);assert.ok(r.body.includes(`/${slug}/`));rows.push({path,status:r.status});}
const release=await get('/release-id.txt');assert.equal(release.status,200);const report={ip,host,release:release.body.trim(),rows};await fs.mkdir('output/timeweb-20261103',{recursive:true});await fs.writeFile('output/timeweb-20261103/http-results.json',JSON.stringify(report,null,2));console.log('TIMEWEB_HTTPS_ROUTES_PASS',rows.length,'release',report.release);
