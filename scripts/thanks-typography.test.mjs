import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {withRussianTypography} from '../sites/shared/russian-typography.js';

test('all generated webinar blocks receive typography after content insertion',async()=>{
 for(const edition of ['com','ru'])for(const slug of ['web121126','web121126_r',...(edition==='com'?['web121126_short','web121126_r_short']:[])]){
  const html=await readFile(`dist/${edition}/${slug}/index.html`,'utf8');
  assert.equal(withRussianTypography(html),html,`${edition}/${slug}: unprocessed text`);
  if(slug==='web121126_r')assert.ok(html.includes('малого\u00a0и\u00a0среднего')||html.includes('малого и\u00a0среднего'));
 }
});
test('every current campaign has self-contained thanks/spasibo aliases without sales redirect',async()=>{
 for(const edition of ['com','ru'])for(const slug of ['web121126','web121126_r','premium-programs','sale2026','november']){
  const a=await readFile(`dist/${edition}/${slug}/thanks/index.html`,'utf8');
  const b=await readFile(`dist/${edition}/${slug}/spasibo/index.html`,'utf8');
  assert.equal(a,b,`${edition}/${slug}`);
  assert.ok(!a.includes('/sales/'),`${edition}/${slug}: crossed campaign`);
  assert.ok(!/http-equiv=["']refresh/i.test(a));
  assert.ok(!/location\.(?:href\s*=|replace\s*\(|assign\s*\()/.test(a));
 }
});
