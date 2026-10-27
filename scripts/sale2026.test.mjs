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
test('Sale2026 preserves approved products, descriptions and prices',async()=>{
 const brief=await readFile('sites/november/BRIEF-SOURCE-20261023.txt','utf8');
 const start=brief.indexOf('Тариф 1 «Эксперт»: 3 на выбор ·');
 const programmes=brief.slice(brief.indexOf('\n',start)+1,brief.indexOf('Формат (серая строка)')).trim().split('\n').map(t=>t.trim()).filter(Boolean);
 assert.equal(programmes.length,36);for(const text of programmes)assert.ok(source.includes(text),text);
 for(const price of ['77 850','51 900','40 350','26 900','22 350','14 900'])assert.ok(source.includes(price));
 assert.match(source,/<h3>Мастер<\/h3>/);assert.match(source,/type="submit" disabled/);assert.match(source,/noindex,nofollow/);
 assert.equal((source.match(/type="checkbox"/g)||[]).length,12);assert.ok(!source.includes('class="preview-notice"'));
 for(const stale of ['Развитие','Фанаты бренда','Где эксперт теряет деньги','Курс «Наставничество», 1 тариф'])assert.ok(!source.includes(stale));
});

test('Sale2026 RU and COM connect the same four supplied isolated forms and offer',async()=>{
 const registry=JSON.parse(await readFile('sites.json','utf8')),config=registry.sale2026.editions.ru;
 assert.deepEqual(Object.values(config.saleWidgets).map(w=>w.widgetId),['1674362','1674367','1674372','1674401']);
 assert.deepEqual(registry.sale2026.editions.com,config);
 const ru=await readFile('dist/ru/sale2026/index.html','utf8'),com=await readFile('dist/com/sale2026/index.html','utf8');
 assert.match(ru,/https:\/\/agkedu.getcourse.ru\/oferta_sale2026/);assert.match(com,/https:\/\/agkedu.getcourse.ru\/oferta_sale2026/);assert.ok(com.includes('1674362'));
 for(const [key,widget]of Object.entries(config.saleWidgets)){
  const form=await readFile(`dist/ru/sale2026/forms/${key}/index.html`,'utf8');
  assert.equal(await readFile(`dist/com/sale2026/forms/${key}/index.html`,'utf8'),form);
  assert.ok(form.includes(`id="${widget.scriptId}"`));assert.ok(form.includes(`script?id=${widget.widgetId}`));
  assert.ok(form.indexOf('widget-context.js')<form.indexOf('pl/lite/widget/script'));
 }
 const js=await readFile('sites/november/widgets.mjs','utf8');assert.match(js,/url.search=location.search/);assert.match(js,/event.source!==frame\?\.contentWindow/);
 assert.match(js,/aria-labelledby/);assert.match(js,/addEventListener\('cancel'/);assert.match(js,/trigger\?\.focus/);
});
