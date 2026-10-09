import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';
const runtime=process.env.AGK_QA_RUNTIME??resolve(process.env.USERPROFILE??process.env.HOME??'.','.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const sharp=createRequire(resolve(runtime,'runtime-entry.cjs'))('sharp');
const directory=resolve('sites/archetype/public/img');
for (const name of ['sky-hero','sky-method','sky-archetypes','sky-tariffs','sky-reviews','sky-closing','celestial-globe','atlas-book']) {
  const source=resolve('sites/archetype/.impeccable/assets',`${name==='sky-archetypes'?'sky-archetypes-v2':name}.png`);
  const output=resolve(directory,`${name}.webp`);
  await sharp(source).resize({width:name.startsWith('sky-')?1536:640,withoutEnlargement:true}).webp({quality:83,alphaQuality:95}).toFile(output);
  console.log(name,(await stat(output)).size);
}
for(const [name,width,quality] of [['armillary-books',640,85],['navy-drape',1536,84]]) {
  const source=resolve('sites/archetype/.impeccable/assets',`${name}.png`),output=resolve(directory,`${name}.webp`);
  const meta=await sharp(source).metadata();
  if(!meta.hasAlpha)throw new Error(`${name} is not transparent`);
  await sharp(source).resize({width,withoutEnlargement:true}).webp({quality,alphaQuality:95}).toFile(output);
  console.log(name,meta.width,meta.height,'alpha',meta.hasAlpha,'source', (await stat(source)).size, 'webp', (await stat(output)).size);
}
for(const name of ['bonus-products-v1','bonus-mentoring-v2','bonus-newyear-v1','bonus-products-runway-v6','bonus-mentoring-runway-v6','bonus-newyear-runway-v6']) {
  const source=resolve('sites/archetype/.impeccable/assets',`${name}.png`),output=resolve(directory,`${name}.webp`);
  await sharp(source).resize({width:640,withoutEnlargement:true}).webp({quality:84}).toFile(output);
  console.log(name,(await stat(output)).size);
}
for(const name of ['runway-hero-v5','runway-method-v5','runway-archetypes-v5','runway-tariffs-v5','runway-reviews-v5','runway-closing-v5','runway-light-v5']) {
  const source=resolve('sites/archetype/.impeccable/assets',`${name}.png`),output=resolve(directory,`${name}.webp`);
  await sharp(source).resize({width:1536,withoutEnlargement:true}).webp({quality:82}).toFile(output);
  console.log(name,(await stat(output)).size);
}
for(const name of ['program-arch-v10','program-light-v10','program-vitrail-v10','compact-arch-v11','square-arch-v12','wide-arch-v12','program-arch-v12']) {
  await sharp(resolve('sites/archetype/.impeccable/assets',`${name}.png`)).trim().resize({width:700,withoutEnlargement:true}).webp({quality:88,alphaQuality:100}).toFile(resolve(directory,`${name}.webp`));
}
// Crop the generated frame into top/body/bottom sprites; only the straight
// rails stretch with content, so the arch never grows with a long tariff.
for(const [name,topFraction] of [['round-square-v13',.48],['round-wide-v13',.66]]) {
  const source=resolve('sites/archetype/.impeccable/assets',`${name}.png`);
  const {data,info}=await sharp(source).trim({threshold:30}).resize({width:900,withoutEnlargement:true}).png().toBuffer({resolveWithObject:true});
  const top=Math.round(info.height*topFraction),bottom=Math.round(info.height*.1);
  for(const [part,y,height] of [['top',0,top],['side',top,info.height-top-bottom],['bottom',info.height-bottom,bottom]]) {
    await sharp(data).extract({left:0,top:y,width:info.width,height}).webp({quality:88,alphaQuality:100}).toFile(resolve(directory,`${name}-${part}.webp`));
  }
  console.log(name,'sprites',info.width,info.height,top,bottom);
}
