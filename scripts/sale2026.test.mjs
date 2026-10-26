import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {errorPage} from './delivery-surfaces.mjs';
const source=await readFile('sites/november/index.html','utf8');
test('V17 uses client-supplied studio portraits and explicit programme controls',async()=>{
 const photos=JSON.parse(await readFile('sites/november/PHOTO-SOURCES-V8.json','utf8'));
 assert.equal(photos[0].driveId,'1spa1Si4nocT8vnREKvG8YLpfKx9qP0cD');assert.equal(photos[1].driveId,'1KUWNixHLYhZ2ayJhgFZQLuS7nztgukVE');
 assert.match(source,/assets\/v14\/alexandra-5736-cutout.webp/);assert.match(source,/alexandra-author.webp/);assert.ok(!source.includes('hero-portrait.webp'));
 assert.equal((source.match(/Развернуть программу/g)||[]).length,2);assert.equal((source.match(/Свернуть программу/g)||[]).length,2);
 const css=await readFile('sites/november/public/refinement-v8.css','utf8');assert.match(css,/--price-dark:#ffa17e/);assert.match(css,/--action-width:calc\(100vw - 2 \* var\(--gutter\) - 48px\)/);
});
test('Sale2026 uses one shared source and builds both regional routes',async()=>{
 const registry=JSON.parse(await readFile('sites.json','utf8'));assert.equal(registry.sale2026.source,'november');
 for(const edition of ['com','ru']){
  const page=await readFile(`dist/${edition}/sale2026/index.html`,'utf8');
  assert.match(page,/pinned-brief-20261026-v17/);assert.match(page,/sale2026\/refinement-v17.css/);assert.ok(!page.includes('%%'));
  assert.equal((page.match(/class="class-entry"/g)||[]).length,12);assert.equal((page.match(/class="guide-caption"/g)||[]).length,14);
  assert.match(await readFile(`dist/${edition}/sale2026/404.html`,'utf8'),/href="\/sale2026\/"/);
  assert.match(await readFile(`dist/${edition}/sale2026/.htaccess`,'utf8'),/ErrorDocument 404 \/sale2026\/404.html/);
 }
 assert.match(errorPage(),/sale2026/);assert.match(errorPage('archetype'),/data-theme="archetype"/);
});
test('Sale2026 preserves approved products, descriptions, prices and disabled forms',async()=>{
 const brief=await readFile('sites/november/BRIEF-SOURCE-20261023.txt','utf8');
 const start=brief.indexOf('Тариф 1 «Эксперт»: 3 на выбор ·');
 const programmes=brief.slice(brief.indexOf('\n',start)+1,brief.indexOf('Формат (серая строка)')).trim().split('\n').map(t=>t.trim()).filter(Boolean);
 assert.equal(programmes.length,36);for(const text of programmes)assert.ok(source.includes(text),text);
 for(const price of ['77 850','51 900','40 350','26 900','22 350','14 900'])assert.ok(source.includes(price));
 assert.match(source,/<h3>Мастер<\/h3>/);assert.match(source,/type="submit" disabled/);assert.match(source,/noindex,nofollow/);
 assert.equal((source.match(/type="checkbox"/g)||[]).length,12);assert.ok(!source.includes('class="preview-notice"'));
 for(const stale of ['Развитие','Фанаты бренда','Где эксперт теряет деньги','Курс «Наставничество», 1 тариф'])assert.ok(!source.includes(stale));
});
