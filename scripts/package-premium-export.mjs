import {cp,rm,access} from 'node:fs/promises';import {resolve,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),site=resolve(root,'sites/premium-programs'),output=resolve(site,'export');
if(output!==resolve(root,'sites/premium-programs/export'))throw Error('Unsafe export path');
await access(resolve(site,'out/index.html'));await rm(output,{recursive:true,force:true});await cp(resolve(site,'out'),output,{recursive:true});console.log('Prepared premium-programs static export');
