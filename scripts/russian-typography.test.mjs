import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {protectRussianText,withRussianTypography} from '../sites/shared/russian-typography.js';
const normalize = s => s.replaceAll('\u00a0',' ').replaceAll('\u2011','-');
test('Russian prepositions and conjunctions stay with the following word',()=>{
 assert.equal(protectRussianText('Вы работаете в найме. И с продажами или коучинговое образование. Ответить себе на вопрос. Не клуб, не что-то посерьёзнее.'),'Вы\u00a0работаете в\u00a0найме. И\u00a0с\u00a0продажами или\u00a0коучинговое образование. Ответить себе на\u00a0вопрос. Не\u00a0клуб, не\u00a0что\u2011то посерьёзнее.');
});
test('Approved short pronouns and exact semantic phrases remain together',()=>{
 const source='но он не капитализирован; вы её ни проводили; когда он эту работу; их немного; Если мы не можем; так большинство; хоть на большой; но власть вас не радует; и ваше королевство; считать стоимость; Я — Сердце компании';
 const output=protectRussianText(source);
 assert.equal(normalize(output),source);
 for(const phrase of source.split('; '))assert.ok(output.includes(phrase.replaceAll(' ','\u00a0')),phrase);
});
test('Markup, cross-inline phrases, scripts and attributes are preserved',()=>{
 const source='<body><p>и <strong>с людьми</strong>, что-то</p><a href="/что-то/">на встречу</a><script>const s="в найме";</script></body>';
 const output=withRussianTypography(source);
 assert.equal(normalize(output),source);
 assert.ok(output.includes('и\u00a0<strong>с\u00a0людьми</strong>'));
 assert.ok(output.includes('href="/что-то/"'));
 assert.equal(withRussianTypography(output),output);
});
test('Both source pages preserve every character except break opportunities',async()=>{
 for(const slug of ['mentor-consultation','archetype']){
  const html=await readFile(`sites/${slug}/index.html`,'utf8');
  assert.equal(normalize(withRussianTypography(html)),normalize(html));
 }
});
