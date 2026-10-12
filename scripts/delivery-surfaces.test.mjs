import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {withLoader,errorPage} from './delivery-surfaces.mjs';
test('themed loader is bounded, optional without JS, and independent of forms',()=>{
 const html=withLoader('<html><head></head><body><h1>Offer</h1></body></html>','mentor-consultation');
 assert.ok(html.includes('setTimeout(done,1200)'));
 assert.ok(html.includes('.site-loading{display:none}'));
 assert.ok(html.includes('prefers-reduced-motion:reduce'));
 assert.ok(html.includes('pointer-events:none'));
 assert.ok(!html.includes('iframe'));
 assert.equal(withLoader('<body>Old site</body>','clients'),'<body>Old site</body>');
});
test('scoped errors include recovery, noindex and correct edition-independent assets',async()=>{
 for(const edition of ['com','ru'])for(const slug of ['mentor-consultation','archetype']){
  const error=await readFile(`dist/${edition}/${slug}/404.html`,'utf8');
  assert.ok(error.includes(`data-theme="${slug}"`));assert.ok(error.includes('noindex'));assert.ok(error.includes(`href="/${slug}/"`));
  assert.equal(await readFile(`dist/${edition}/${slug}/.htaccess`,'utf8'),`ErrorDocument 404 /${slug}/404.html\n`);
  assert.ok((await readFile(`dist/${edition}/${slug}/index.html`,'utf8')).includes('id="site-loading"'));
 }
 assert.ok(errorPage().includes('location.pathname.split'));
});
