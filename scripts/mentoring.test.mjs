import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const norm=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').trim();
test('mentoring retains every source paragraph, list item and heading',async()=>{
 const source=await readFile('sites/mentor-consultation/source/index.html','utf8');
 const html=await readFile('sites/mentor-consultation/index.html','utf8'),text=norm(html);
 for(const m of source.matchAll(/<(p|h[1-3]|li)\b[^>]*>([\s\S]*?)<\/\1>/g)){const expected=norm(m[2]).replace('Почему с него стоит начинать, а не с курса или клуба','Почему стоит начинать с него, а не с курса или клуба');assert.ok(text.includes(expected),`Missing supplied text: ${expected.slice(0,140)}`);}
 assert.equal((html.match(/data-registration-widget/g)||[]).length,2);
 assert.equal((html.match(/<form\b/g)||[]).length,0);
 assert.ok(!html.includes('action="#"'));assert.ok(!html.includes('type="submit"'));
 assert.ok(html.includes('data-registration-widget="1667814"'));
 assert.ok(!html.includes('Открыть форму в отдельной вкладке'));
 assert.ok(!html.includes('<details'));
 assert.ok(!html.includes('Подробнее'));
 assert.ok(html.includes('class="reading-chapter"'));
 assert.ok(html.includes('https://agkedu.getcourse.ru/personaldata'));
 assert.ok(html.includes('ИНН 246212538610'));
});
test('mentoring complete and isolated in both editions',async()=>{
 for(const edition of ['ru','com']){
 await assert.rejects(access(`dist/${edition}/mentoring`),{code:'ENOENT'});
 const html=await readFile(`dist/${edition}/mentor-consultation/index.html`,'utf8');
 for(const id of ['audience','capital','method','start','economics','next','form-bottom'])assert.ok(html.includes(`id="${id}"`));
 for(const name of ['crossroads','capital','mentoring','start','iceberg']){assert.ok(html.includes(`${name}-editorial.webp`));await access(`dist/${edition}/mentor-consultation/img/${name}-editorial.webp`);}
 for(const name of ['alexandra.jpg','logo-full.png','logo-mark-light.png'])await access(`dist/${edition}/mentor-consultation/img/${name}`);
 assert.ok(!html.includes('fonts.googleapis.com'));
 assert.ok(!html.includes('data-preview-submit'));
 }
});
