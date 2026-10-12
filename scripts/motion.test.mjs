import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('mentoring and archetype use bounded, progressively enhanced entrances',async()=>{
 const helper=await readFile('sites/shared/entrance.js','utf8');
 assert.ok(helper.includes('prefers-reduced-motion: reduce'));
 assert.ok(helper.includes('observer?.unobserve(node)'));
 assert.ok(helper.includes("document.addEventListener('focusin',cancel)"));
 assert.ok(helper.includes('Math.min(index*80,400)'));
 assert.ok(helper.includes("fill:'both'"));
 assert.ok(helper.includes('duration:800'));
 assert.ok(helper.includes('animation.pause();animation.currentTime=0'));
 assert.ok(helper.includes("document.addEventListener('site:ready',ready"));
 assert.ok(helper.includes('seen.has(node)'));
 assert.ok(helper.includes('parent.contains(node)'));
 for(const site of ['mentor-consultation','archetype'])assert.ok((await readFile(`sites/${site}/src/page.js`,'utf8')).includes('setupEntrances('));
 const css=await readFile('sites/shared/feedback.css','utf8');
 assert.ok(css.includes('(hover:hover) and (pointer:fine)'));
 assert.ok(!css.includes('transition:all'));
});
test('GetCourse instances are isolated and resize messages are source-validated',async()=>{
 const js=await readFile('sites/mentor-consultation/src/registration.js','utf8');
 assert.ok(js.includes('8ed37544be895cb145749befbb5aeccadf1a0519'));
 assert.ok(js.includes("widgetId='1667814'"));
 assert.ok(js.includes("event.origin!=='https://agkedu.getcourse.ru'"));
 assert.ok(js.includes('contentWindow===event.source'));
 assert.ok(js.includes("frame.id='mentoring-consultation-bottom'"));
 assert.ok(js.includes('template.cloneNode(false)'));
});
