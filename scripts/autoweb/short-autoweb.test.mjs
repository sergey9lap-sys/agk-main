import test from 'node:test';
import assert from 'node:assert/strict';
import {shortAutoweb} from './short-autoweb.mjs';
import {clockText} from './autoweb-clock.mjs';

test('short webinar date becomes a live badge without changing forms or actions',()=>{
 const source='<html><head><title>Тест — вебинар 12 ноября</title></head><body><p class="event-date">12 ноября<span>12:00 или 19:00 МСК</span></p><iframe src="registration/" title="Тест"></iframe><a href="#hero-registration">Зарегистрироваться</a></body></html>';
 for(const slug of ['web121126_short','web121126_r_short']){
  const result=shortAutoweb(source,slug);
  assert.equal((result.match(/data-autoweb/g)||[]).length,1);
  assert.match(result,/autoweb-clock\.js/);
  assert.match(result,/<iframe src="registration\/" title="Тест"><\/iframe>/);
  assert.match(result,/<a href="#hero-registration">Зарегистрироваться<\/a>/);
  assert.equal(result.includes('12 ноября'),false);
  assert.match(result,/автовебинар каждые 10 минут/);
 }
});

test('ten-minute launch rounds ahead at 12:34 and 12:40',()=>{
 assert.equal(clockText(new Date(2026,10,15,12,34)).time,'06:00');
 assert.equal(clockText(new Date(2026,10,15,12,40)).time,'10:00');
});
