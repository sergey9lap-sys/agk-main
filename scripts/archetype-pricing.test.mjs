import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {priceStage,priceFor,upcomingPrices,nextPriceChange} from '../sites/archetype/src/pricing.js';
const at=value=>new Date(value), ids=[1,2,3];
test('16 October Moscow starts current prices, 19 October starts final prices exactly at midnight',()=>{
  for(const [date,expected] of [
    ['2026-10-15T20:59:59.999Z',[1900,5900,29900]],
    ['2026-10-15T21:00:00.000Z',[2900,7900,32900]],
    ['2026-10-18T20:59:59.999Z',[2900,7900,32900]],
    ['2026-10-18T21:00:00.000Z',[3900,9900,35900]],
    ['2026-10-19T00:00:00.000+03:00',[3900,9900,35900]],
    ['2026-11-01T12:00:00.000Z',[3900,9900,35900]]
  ]) assert.deepEqual(ids.map(id=>priceFor(id,at(date))),expected,date);
});
test('19 October line exists before the deadline and disappears for all tiers afterwards',()=>{
  for(const id of ids){
    assert.deepEqual(upcomingPrices(id,at('2026-10-16T00:00:00+03:00')),[{at:'2026-10-19T00:00:00+03:00',price:priceFor(id,at('2026-10-19T00:00:00+03:00'))}]);
    assert.deepEqual(upcomingPrices(id,at('2026-10-19T00:00:00+03:00')),[]);
  }
  assert.equal(nextPriceChange(at('2026-10-18T20:59:59.999Z')),Date.parse('2026-10-18T21:00:00Z'));
  assert.equal(nextPriceChange(at('2026-10-18T21:00:00Z')),null);
  assert.equal(priceStage(at('2026-10-18T21:00:00Z')),2);
});
test('no old-price markup or rendering remains; visible future dates are hidden after the last stage',()=>{
  const source=readFileSync(new URL('../sites/archetype/index.html',import.meta.url),'utf8');
  const js=readFileSync(new URL('../sites/archetype/src/page.js',import.meta.url),'utf8');
  assert.ok(!source.includes('price-history'));assert.ok(!js.includes('price-history'));
  for(const price of ['2 900 Р','7 900 Р','32 900 Р'])assert.ok(source.includes(price));
  assert.ok(js.includes('next.hidden = upcoming.length === 0'));
  assert.ok(js.includes('setTimeout(updatePrices'));
  assert.ok(js.includes("window.addEventListener('pageshow',updatePrices)"));
});
