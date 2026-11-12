import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {variants,event,webinarContent} from './web121126-content.mjs';
test('auto-webinar preserves both audiences, gifts and official forms',async()=>{
 for(const [slug,audience] of [['web121126','universal'],['web121126_r','owners']]){
  const v=variants[audience];
  for(const edition of ['ru','com']){
   const page=await readFile(`dist/${edition}/${slug}/index.html`,'utf8');
   assert.ok(!page.includes('%%'));
   for(const text of [v.lead,v.gift,'40 000','36 стран','ИНН 246212538610']) assert.ok(page.replace(/&nbsp;|\u00a0/g,' ').replaceAll('\u2011','-').includes(text),text);
   assert.equal((page.match(/data-autoweb>/g)||[]).length,2);
   assert.ok(page.includes('Зарегистрироваться и смотреть'));
   assert.equal((page.match(/data-widget/g)||[]).length,2);
   assert.ok(!page.includes('data-placeholder'));
   for(const suffix of ['thanks','spasibo']){
    const thanks=await readFile(`dist/${edition}/${slug}/${suffix}/index.html`,'utf8');
    assert.ok(thanks.replace(/&nbsp;|\u00a0/g,' ').replaceAll('\u2011','-').includes(v.gift));
    assert.ok(thanks.includes('Вы зарегистрированы! Остался один шаг'));
    assert.equal((thanks.match(/data-autoweb>/g)||[]).length,1);
    for(const url of ['https://agkedu.getcourse.ru/tlgrm','https://vk.com/app6622219_-210982065#themeId=33822','https://agkedu.getcourse.ru/ss?ss=maxbot']) assert.ok(thanks.includes(url));
   }
   assert.match(await readFile(`dist/${edition}/${slug}/.htaccess`,'utf8'),/ErrorDocument 404/);
  }
  const raw=webinarContent({audience});for(const [a,b]of v.audiences)assert.ok(raw.includes(a)&&raw.includes(b));
 }
});

test('regional long/short pages isolate exact widgets and keep campaign before loading',async()=>{
 const registry=JSON.parse(await readFile('sites.json','utf8'));
 for(const edition of ['com','ru'])for(const slug of ['web121126','web121126_r','web121126_short','web121126_r_short']){
  const widget=registry[slug].editions[edition].registrationWidget;
  const expected=slug.startsWith('web121126_r')?(edition==='ru'?'1677842':'1677849'):(edition==='ru'?'1677820':'1677840');assert.equal(widget.widgetId,expected);
  const page=await readFile(`dist/${edition}/${slug}/index.html`,'utf8');assert.equal((page.match(/data-widget/g)||[]).length,slug.endsWith('_short')?1:2);assert.ok(!page.includes('data-placeholder'));
  const directLink=`class="widget-recovery"><a href="https://agkedu.getcourse.ru/pl/lite/widget/widget?id=${expected}"`;
  assert.equal(page.split(directLink).length-1,slug.endsWith('_short')?1:2);
  const embeds=[...page.matchAll(/<iframe\b[^>]*data-src="registration\/"[^>]*>/g)];
  assert.equal(embeds.length,slug.endsWith('_short')?1:2);
  for(const [iframe] of embeds)assert.ok(iframe.includes('loading="lazy"'),iframe);
  const embed=await readFile(`dist/${edition}/${slug}/registration/index.html`,'utf8');assert.equal((embed.match(/widget\/script\?id=/g)||[]).length,1);assert.ok(embed.includes(`id="${widget.scriptId}" src="https://agkedu.getcourse.ru/pl/lite/widget/script?id=${expected}"`));assert.ok(embed.indexOf('registration-context.js')<embed.indexOf('widget/script?id='));
  const target=`/${slug.replace(/_short$/,'')}/${edition==='ru'?'spasibo':'thanks'}/`;assert.ok(embed.includes(`data-success-path="${target}"`));await readFile(`dist/${edition}${target}index.html`);
  assert.equal(await readFile(`dist/${edition}/${slug}/registration-context.js`,'utf8'),await readFile('sites/sales/public/registration-context.js','utf8'));
 }
});
