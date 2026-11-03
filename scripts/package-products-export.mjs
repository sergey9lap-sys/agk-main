import {cp,rm,access} from 'node:fs/promises';import {resolve} from 'node:path';
for(const slug of ['metodologiya','method-club','mentoring']){
 const site=resolve('sites',slug),source=resolve(site,slug==='mentoring'?'dist':'out'),target=resolve(site,'export');
 if(target!==resolve('sites',slug,'export'))throw Error('Unsafe export target');
 await access(resolve(source,'index.html'));await rm(target,{recursive:true,force:true});await cp(source,target,{recursive:true});console.log('EXPORTED',slug);
}
