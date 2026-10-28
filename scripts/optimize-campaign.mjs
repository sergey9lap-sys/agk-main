import {readFile,writeFile} from 'node:fs/promises';import {resolve} from 'node:path';import {createHash} from 'node:crypto';
export async function optimizeCampaign(html,siteRoot,output,slug){
 const mapping=JSON.parse(await readFile(resolve(siteRoot,'optimized-media.json'),'utf8'));
 // Preserve every original image as a WebP fallback; AVIF is selected only by capable browsers.
 html=html.replace(/<img\b[^>]*>/g,tag=>{const src=tag.match(/\bsrc="([^"]+)"/)?.[1];const key=src?.replace(`/${slug}/`,'');if(!mapping[key])return tag;const type=mapping[key].endsWith('.avif')?'avif':'webp';return `<picture class="campaign-picture"><source type="image/${type}" srcset="/${slug}/${mapping[key]}">${tag}</picture>`;});
 const links=[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].filter(m=>m[0].includes(`href="/${slug}/`));let css='';
 for(const match of links){const href=match[0].match(/href="([^"]+)"/)[1],file=href.split('?')[0].slice(slug.length+2);let chunk=await readFile(resolve(siteRoot,'public',file),'utf8');
  chunk=chunk.replace(/url\((['"]?)(assets\/[\w/.-]+\.webp)\1\)/g,(all,q,key)=>mapping[key]?mapping[key].endsWith('.avif')?`image-set(url("${mapping[key]}") type("image/avif"),url("${key}") type("image/webp"))`:`url("${mapping[key]}")`:all);css+=chunk+'\n';}
 css+='\n.campaign-picture{display:contents}\n';const filename='campaign-'+createHash('sha256').update(css).digest('hex').slice(0,12)+'.css';await writeFile(resolve(output,slug,filename),css);
 for(let i=0;i<links.length;i++)html=html.replace(links[i][0],i===0?`<link rel="stylesheet" href="/${slug}/${filename}">`:'');
 return html;
}
