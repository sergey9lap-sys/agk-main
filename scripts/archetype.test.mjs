import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { priceStage, priceFor, tiers } from '../sites/archetype/src/pricing.js';
test('archetype pricing switches at midnight Moscow and retains all source values',()=>{
  assert.deepEqual(Object.values(tiers).map(t=>t.prices),[[1900,2900,3900],[5900,7900,9900],[29900,32900,35900]]);
  for(const [instant,stage] of [['2026-10-15T20:59:59Z',0],['2026-10-15T21:00:00Z',1],['2026-10-18T20:59:59Z',1],['2026-10-18T21:00:00Z',2]]){
    assert.equal(priceStage(new Date(instant)),stage);
    for(const id of ['1','2','3'])assert.equal(priceFor(id,new Date(instant)),tiers[id].prices[stage]);
  }
  assert.throws(()=>priceFor('9'),RangeError);
});
test('archetype complete content and scoped assets exist in both editions',async()=>{
  const registry=JSON.parse(await readFile('sites.json','utf8'));
  assert.deepEqual(registry.archetype.editions,{com:{},ru:{}});
  for(const edition of ['com','ru']){
    const html=await readFile(`dist/${edition}/archetype/index.html`,'utf8');
    for(const id of ['audience','problem','approach','method','archetypes','program','tariffs','bonuses','author','reviews','faq','closing'])assert.ok(html.includes(`id="${id}"`));
    for(const copy of ['20 и 22 октября','«Раненый король»','«Пленённая гейша»','«Уставшая мать»','«Уставший мастер»','«Кассандра»','Архетип 6','Архетип 7','Архетип 8','Личная 45-минутная консультация','19 декабря 2026','Ольга, коуч','Павел, наставник','Наталья, психолог','Диана, консультант','Записи обеих встреч на 90 дней'])assert.ok(html.includes(copy),`Missing ${copy}`);
    assert.ok(html.includes('seed 2a8d1ded'));
    assert.ok(!html.includes('Форма записи пока не подключена'));
    for (const id of ['1667037','1667040','1667041']) assert.ok(html.includes(`data-widget="${id}"`));
    assert.ok(html.includes('oferta_mk_arhetip'));
    assert.ok(html.includes('ИНН 246212538610'));
    assert.ok(!html.includes('<form'));
    assert.equal((html.match(/<details>/g)??[]).length,5);
    assert.equal((html.match(/data-tariff="/g)??[]).length,3);
  }
});
test('archetype refinement uses approved identity and original brand assets',async()=>{
  for(const edition of ['com','ru']){
    const prefix=`dist/${edition}/archetype/`;
    const html=await readFile(prefix+'index.html','utf8');
    assert.ok(html.includes('alexandra-final-identity-v2.webp'));
    assert.deepEqual(await readFile(prefix+'img/alexandra-final-identity-v2.webp'),await readFile('sites/expert/public/img/alexandra-thanks-identity-v2.webp'));
    for(const name of ['sber.webp','vtb.svg','rosneft.webp','nornickel.webp','nestle.webp','x5.webp','vkusvill.png','cissa.png','skolkovo.png','clubfirst.png']){
      const filename='logo-'+name;
      assert.ok(html.includes(filename));
      assert.deepEqual(await readFile(prefix+'img/logos/'+filename),await readFile('sites/expert/public/img/'+filename));
    }
    for(const name of ['sky-hero','sky-method','sky-archetypes','sky-tariffs','sky-reviews','sky-closing','celestial-globe','atlas-book'])assert.ok((await readFile(prefix+'img/'+name+'.webp')).length>1000);
  }
});
test('bonus covers retain live copy and hero CTA precedes outcome plaques',async()=>{
  for(const edition of ['com','ru']){
    const html=await readFile(`dist/${edition}/archetype/index.html`,'utf8');
    assert.ok(html.indexOf('href="#tariffs"><span>ВЫБРАТЬ ТАРИФ')<html.indexOf('<ul class="hero-results"'));
    assert.equal((html.match(/class="bonus-play"/g)??[]).length,2);
    for(const name of ['bonus-products-runway-v6','bonus-mentoring-runway-v6','bonus-newyear-runway-v6']){
      assert.ok(html.includes(name+'.webp'));
      assert.ok((await readFile(`dist/${edition}/archetype/img/${name}.webp`)).length>1000);
    }
    for(const text of ['Лекция «Продуктовая линейка эксперта»','Лекция «Плюс 30% к выручке: три инструмента менторинга»','Клубный Новый год в Москве','Дата: 19 декабря 2026 г.'])assert.ok(html.includes(text));
    assert.ok(!html.includes('<video'));
  }
});
test('runway refinement ships cold scenes and removes rejected atlas chrome without changing content',async()=>{
  const css=await readFile('sites/archetype/src/page.css','utf8');
  assert.ok(css.includes('--navy:#05172b'));
  assert.ok(css.includes('--ivory:#f2f7fc'));
  assert.ok(css.includes('.wordmark{color:var(--brand-gold)}'));
  assert.ok(!css.includes('3px 18px 3px 18px'));
  assert.ok(!css.includes('4px 30px 4px 30px'));
  for(const edition of ['com','ru']){
    const prefix=`dist/${edition}/archetype/`;
    const html=await readFile(prefix+'index.html','utf8');
    assert.ok(html.includes('seed 02761ee7'));
    assert.ok(!html.includes('class="hero-cloth"'));
    assert.ok(!html.includes('class="scene-object scene-object--globe"'));
    assert.ok(!html.includes('class="scene-object scene-object--book"'));
    for(const section of ['hero','method','archetypes','tariffs','reviews','closing','light']){
      assert.ok(css.includes(`runway-${section}-v5.webp`));
      assert.ok((await readFile(prefix+`img/runway-${section}-v5.webp`)).length>1000);
    }
  }
});
