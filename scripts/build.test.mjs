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
        if (config.successPath) assert.ok(html.includes(`data-success-path="${config.successPath}"`));
      }
      assert.ok(!html.includes('%%'));
      assert.ok(!html.includes('widget-fallback'));
      const pages = [html];
      for (const alias of site.confirmationAliases ?? []) {
        const thanks = await readFile(resolve(root, alias, 'index.html'), 'utf8');
        assert.ok(thanks.includes('noindex,follow'));
        for (const url of ['https://agkedu.getcourse.ru/tlgrm', 'https://agkedu.getcourse.ru/ss?ss=maxbot', 'https://vk.com/app6622219_-210982065#themeId=33822']) assert.ok(thanks.includes(url));
        for (const stale of ['tg_subscribe', 'max_subscribe', 'vk_subscribe', 't.me/+1wK-qlsmFxI3MTgy', 'max.ru/join/djDyfF9jdtDaccPTD4In2C4g2_vawUb2hKvCRoEAJA4']) assert.ok(!thanks.includes(stale));
        assert.equal((thanks.match(/class="care-actions"/g) ?? []).length, 1);
        assert.equal(thanks, await readFile(resolve(root, slug, alias, 'index.html'), 'utf8'));
        pages.push(thanks);
      }
      for (const page of pages) {
        if (['clients', 'mkclients'].includes(slug)) {
          const counter = edition === 'com' ? '110484887' : '110484880';
          assert.equal(page.split(`ym(${counter},'init'`).length - 1, 1);
          assert.ok(!page.includes(edition === 'com' ? '110484880' : '110484887'));
          assert.equal(page.split("fbq('init', '1923709794923109')").length - 1, edition === 'com' && slug === 'clients' ? 1 : 0);
          assert.ok(page.includes(`agk_cookie_consent_${slug}=accepted`));
          assert.ok(!page.includes('agk_cookie_consent=accepted'));
          assert.ok(page.includes('data-cookie-notice'));
          assert.ok(!page.includes('mc.yandex.ru/watch/'));
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
test('praktikum has edition-specific nested confirmation pages without replacing webinar aliases', async () => {
  for (const [edition, alias, otherAlias] of [['com', 'thanks', 'spasibo'], ['ru', 'spasibo', 'thanks']]) {
    const root = resolve('dist', edition);
    const page = await readFile(resolve(root, 'praktikum', alias, 'index.html'), 'utf8');
    assert.ok(page.includes('Вам открыт доступ'));
    assert.ok(page.includes('Получить запись и подарки'));
    assert.ok(page.includes('class="primary-action" href="https://agkedu.getcourse.ru/tlgrm"'));
    assert.ok(page.includes('Персональная консультация'));
    assert.ok(page.includes('/praktikum/thank-you.css'));
    assert.ok(page.includes('/praktikum/praktikum-materials-generated.webp'));
    for (const url of ['https://agkedu.getcourse.ru/tlgrm', 'https://agkedu.getcourse.ru/ss?ss=maxbot', 'https://vk.com/app6622219_-210982065#themeId=33822']) assert.ok(page.includes(url));
    for (const stale of ['t.me/agkclub_bot', 'tg_subscribe', 'max_subscribe', 'vk_subscribe']) assert.ok(!page.includes(stale));
    await assert.rejects(access(resolve(root, 'praktikum', otherAlias, 'index.html')));
    const webinarPage = await readFile(resolve(root, alias, 'index.html'), 'utf8');
    assert.ok(webinarPage.includes('Ваша регистрация'));
  }
});
test('RSYA archive is byte-identical in RU and absent from COM', async () => {
  const files = ['index.html', '.htaccess', 'max/index.html', 'psy/index.html'];
  for (const file of files) {
    assert.deepEqual(await readFile(resolve('sites/rsya-ru', file)), await readFile(resolve('dist/ru', file)));
    await assert.rejects(access(resolve('dist/com', file)));
  }
});
