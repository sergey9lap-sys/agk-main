import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.cjs');
const src="C:/Users/User/.codex/generated_images/01a004a0-79b1-7bc0-84c2-39e98907cfbe/";
const files={"hero":"exec-b2f0e0d2-98f4-4dea-a67a-0ad614b3cb89.png","method":"exec-637d07a1-15f5-42ce-8c78-bf4f65a8c6b8.png","archetypes":"exec-3191672b-34e8-4ab1-9d07-6cb37c87c509.png","tariffs":"exec-a370af83-db6a-4d17-b62d-a77bf14f6b93.png","reviews":"exec-e298c19b-30a7-4b22-bea1-3ada42f1d9cd.png","closing":"exec-1ffc021d-6f2c-4637-8f40-723c99f61985.png"};
const out='sites/archetype/public/img/';
for(const [key,file] of Object.entries(files)){
 const m=await sharp(src+file).metadata();
 let s=sharp(src+file);
 if(key!=='hero'){const edge=Math.round(m.width*.048);s=s.extract({left:edge,top:0,width:m.width-2*edge,height:m.height});}
 const pixels=await s.toBuffer();
 await sharp(pixels).webp({quality:84}).toFile(out+`celestial-${key}-v16.webp`);
 await sharp(pixels).resize({width:1000,withoutEnlargement:true}).webp({quality:78}).toFile(out+`celestial-${key}-v16-mobile.webp`);
 console.log(key,m.width,m.height,fs.statSync(out+`celestial-${key}-v16.webp`).size);
}
const hm=await sharp(src+files.hero).metadata();
for(const [side,left] of [['left',0],['right',hm.width-58]])await sharp(src+files.hero).extract({left,top:0,width:58,height:hm.height}).resize({width:28}).webp({quality:82}).toFile(out+`celestial-rail-${side}-v16.webp`);
fs.mkdirSync('sites/archetype/.impeccable/review',{recursive:true});
fs.writeFileSync('sites/archetype/.impeccable/review/source-before-v16.html',fs.readFileSync('sites/archetype/index.html'));
