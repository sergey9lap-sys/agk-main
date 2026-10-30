import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
test('premium masterclass export keeps every local asset under its new route',async()=>{
 const root=resolve('sites/premium-programs/export');
 for(const page of ['index.html','pricing/index.html']){
  const html=await readFile(resolve(root,page),'utf8');
  assert.ok(!html.includes('mkproduct.agk-edu.ru'));
  for(const [,url] of html.matchAll(/(?:src|href)="(\/(?!\/)[^"]+)"/g)){
   const path=url.split(/[?#]/)[0];assert.ok(path.startsWith('/premium-programs/'),url);
   let local=resolve(root,'.'+path.slice('/premium-programs'.length));
   if(path.endsWith('/'))local=resolve(local,'index.html');
   await access(local);
  }
 }
});
