import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const registry = JSON.parse(await readFile(new URL('../sites.json', import.meta.url), 'utf8'));
for (const edition of ['com','ru']) {
  test(`${edition}: paths, widgets and thank-you aliases`, async () => {
    const root = resolve('dist', edition);
    if (edition === 'com') await assert.rejects(access(resolve(root, 'index.html')));
    else await access(resolve(root, 'index.html'));
    for (const [slug, site] of Object.entries(registry)) {
      const html = await readFile(resolve(root, slug, 'index.html'), 'utf8');
      const config = site.editions[edition];
      if (config.widgetId) {
        assert.ok(html.includes(`id=${config.widgetId}`));
        assert.ok(html.includes(`id="${config.scriptId}"`));
        assert.ok(html.includes(`data-success-path="${config.successPath}"`));
      }
      assert.ok(!html.includes('%%'));
      assert.ok(!html.includes('widget-fallback'));
      const pages = [html];
      for (const alias of site.confirmationAliases ?? []) {
        const thanks = await readFile(resolve(root, alias, 'index.html'), 'utf8');
        assert.ok(thanks.includes('noindex,follow'));
        for (const channel of ['tg', 'max', 'vk']) assert.ok(thanks.includes(`https://agkedu.getcourse.ru/${channel}_subscribe`));
        assert.equal((thanks.match(/class="care-actions"/g) ?? []).length, 1);
        assert.equal(thanks, await readFile(resolve(root, slug, alias, 'index.html'), 'utf8'));
        pages.push(thanks);
      }
      for (const page of pages) {
        if (slug === 'clients') {
          const counter = edition === 'com' ? '110484887' : '110484880';
          assert.equal(page.split(`ym(${counter},'init'`).length - 1, 1);
          assert.ok(!page.includes(edition === 'com' ? '110484880' : '110484887'));
          assert.equal(page.split("fbq('init', '1923709794923109')").length - 1, edition === 'com' ? 1 : 0);
          assert.equal(page.includes('facebook.com/tr'), edition === 'com');
        }
        for (const [, url] of page.matchAll(/(?:src|href)=["'](\/(?!\/)[^"']+)["']/g)) {
          const path = url.split(/[?#]/)[0];
          assert.ok(path.startsWith(`/${slug}/`), `Unscoped asset: ${url}`);
          await access(resolve(root, '.' + path));
        }
      }
      const cssFiles = [...(await readdir(resolve(root, slug, 'assets'))).filter(f=>f.endsWith('.css')).map(f=>resolve(root, slug, 'assets', f))];
      if ((site.confirmationAliases?.length ?? 0) > 0) cssFiles.unshift(resolve(root, slug, 'thank-you.css'));
      for (const file of cssFiles) {
        const css = await readFile(file, 'utf8');
        for (const [, url] of css.matchAll(/url\(["']?(\/(?!\/)[^)'"\s]+)["']?\)/g)) {
          assert.ok(url.startsWith(`/${slug}/`), `Unscoped CSS asset: ${url}`);
          await access(resolve(root, '.' + url));
        }
      }
    }
  });
}
test('mkclients masterclass is present in both editions', async () => {
  for (const edition of ['com', 'ru']) {
    const html = await readFile(resolve('dist', edition, 'mkclients', 'index.html'), 'utf8');
    assert.ok(html.includes('Собери систему, которая генерит клиентов и деньги 24/7'));
    assert.ok(html.includes('Евраза, Норникеля и др.'));
  }
});
test('RSYA archive is byte-identical in RU and absent from COM', async () => {
  const files = ['index.html', '.htaccess', 'max/index.html', 'psy/index.html'];
  for (const file of files) {
    assert.deepEqual(await readFile(resolve('sites/rsya-ru', file)), await readFile(resolve('dist/ru', file)));
    await assert.rejects(access(resolve('dist/com', file)));
  }
});
