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
        if (['clients', 'mkclients', 'praktikum'].includes(slug)) {
          const counter = edition === 'com' ? '110484887' : '110484880';
          assert.equal(page.split(`ym(${counter},'init'`).length - 1, 1);
          assert.ok(!page.includes(edition === 'com' ? '110484880' : '110484887'));
          assert.equal(page.split("fbq('init', '1923709794923109')").length - 1, edition === 'com' && ['clients', 'praktikum'].includes(slug) ? 1 : 0);
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
    assert.ok(page.includes('/praktikum/cookie-consent.css'));
    assert.ok(page.includes('/praktikum/cookie-consent.js'));
    assert.ok(page.includes('/praktikum/praktikum-materials-generated.webp'));
    const counter = edition === 'com' ? '110484887' : '110484880';
    assert.equal(page.split(`ym(${counter},'init'`).length - 1, 1);
    assert.equal(page.split("fbq('init', '1923709794923109')").length - 1, edition === 'com' ? 1 : 0);
    assert.ok(page.includes('agk_cookie_consent_praktikum=accepted'));
    assert.ok(page.includes('data-cookie-notice'));
    for (const url of ['https://agkedu.getcourse.ru/tlgrm', 'https://agkedu.getcourse.ru/ss?ss=maxbot', 'https://vk.com/app6622219_-210982065#themeId=33822']) assert.ok(page.includes(url));
    for (const stale of ['t.me/agkclub_bot', 'tg_subscribe', 'max_subscribe', 'vk_subscribe']) assert.ok(!page.includes(stale));
    await assert.rejects(access(resolve(root, 'praktikum', otherAlias, 'index.html')));
    const webinarPage = await readFile(resolve(root, alias, 'index.html'), 'utf8');
    assert.ok(webinarPage.includes('Ваша регистрация'));
  }
});
test('expert preserves the supplied landing and has isolated messenger confirmation', async () => {
  for (const edition of ['com', 'ru']) {
    const root = resolve('dist', edition, 'expert');
    const html = await readFile(resolve(root, 'index.html'), 'utf8');
    assert.equal((html.match(/<section\b/g) ?? []).length, 10);
    assert.ok(!html.includes('<fieldset disabled>'));
    assert.ok(!html.replace(/\u00a0/g, ' ').includes('Форма регистрации пока не подключена'));
    const widgetId = edition === 'ru' ? '1665138' : '1665143';
    const otherWidgetId = edition === 'ru' ? '1665143' : '1665138';
    const scriptId = edition === 'ru' ? 'f20545b6c51a6f43bc1d9f47f4ab021a8fdf5dac' : '8ff2abf3e57004ebb172838a880fc45f1cfc7dfd';
    assert.equal((html.match(/pl\/lite\/widget\/script\?id=/g) ?? []).length, 1);
    assert.ok(html.includes(`id="${scriptId}" src="https://agkedu.getcourse.ru/pl/lite/widget/script?id=${widgetId}"`));
    assert.ok(!html.includes(`id=${otherWidgetId}`));
    assert.ok(html.includes('Что будет <em>на вебинаре</em>'));
    assert.ok(html.includes('потому что'));
    const intro = html.slice(html.indexOf('class="learn-intro"'), html.indexOf('<ol class="steps">'));
    assert.ok(intro.includes('class="main-note"'));
    assert.ok(html.includes('class="cta-row program-cta"'));
    for (const key of ['king', 'geisha', 'mother', 'master', 'cassandra']) await access(resolve(root, `img/archetype-${key}.webp`));
    await access(resolve(root, 'img/checklist-book.webp'));
    assert.equal((html.match(/src="\.\/img\/checklist-book.webp"/g) ?? []).length, 0);
    assert.ok(html.includes('20 вопросов для архетипической самораспаковки'));
    assert.ok(html.includes('«Прививка от выгорания»'));
    assert.equal((html.match(/class="sh locked"/g) ?? []).length, 3);
    const program = html.slice(html.indexOf('<ol class="steps">'), html.indexOf('</ol>', html.indexOf('<ol class="steps">')));
    assert.equal((program.match(/<li>/g) ?? []).length, 4);
    assert.ok(html.includes('aria-label="Дата, время и формат вебинара"'));
    assert.ok(!html.includes('ССЫЛКА-НА-ПАПКУ-С-ФОТО'));
    assert.ok(html.includes(`data-success-path="/expert/${edition === 'ru' ? 'spasibo' : 'thanks'}/"`));
    const thanks = await readFile(resolve(root, 'thanks/index.html'), 'utf8');
    assert.ok(thanks.includes('Остался один шаг'));
    assert.ok(thanks.includes('12 октября в 15:00 МСК'));
    assert.ok(thanks.includes('«Прививка от выгорания»'));
    assert.ok(thanks.includes('20 вопросов для архетипической самораспаковки'));
    for (const link of ['https://agkedu.getcourse.ru/tlgrm', 'https://agkedu.getcourse.ru/ss?ss=maxbot', 'https://vk.com/app6622219_-210982065#themeId=33822']) assert.ok(thanks.includes(link));
    await access(resolve(root, 'thank-you.css'));
    for (const image of ['alexandra-hero.jpg', 'alexandra-expert.jpg', 'alexandra-final.jpg', 'bg-hero.jpg', 'bg-shadows.jpg']) {
      assert.deepEqual(await readFile(resolve('sites/expert/public/img', image)), await readFile(resolve(root, 'img', image)));
    }
  }
});

test('expert has a nested RU spasibo without replacing existing webinar confirmations', async () => {
  const thanks = await readFile(resolve('dist/com/expert/thanks/index.html'), 'utf8');
  const spasibo = await readFile(resolve('dist/ru/expert/spasibo/index.html'), 'utf8');
  assert.equal(spasibo, thanks);
  assert.ok(spasibo.includes('href="../thank-you.css"'));
  assert.ok(spasibo.includes('src="../img/alexandra-final.jpg"'));
  const registry = JSON.parse(await readFile(resolve('sites.json'), 'utf8'));
  assert.equal(registry.expert.editions.com.successPath, '/expert/thanks/');
  assert.equal(registry.expert.editions.ru.successPath, '/expert/spasibo/');
  const oldPage = await readFile(resolve('dist/ru/spasibo/index.html'), 'utf8');
  assert.ok(!oldPage.includes('Эксперт без выгорания'));
});

test('expert feedback is pointer-gated and respects reduced motion', async () => {
  const css = await readFile(resolve('sites/expert/src/landing.css'), 'utf8');
  assert.ok(css.includes('@media(hover:hover) and (pointer:fine)'));
  assert.ok(css.includes('@media(prefers-reduced-motion:reduce)'));
  assert.ok(css.includes('.agk .btn:active:not(:disabled)'));
  assert.ok(css.includes('.agk .btn:disabled:hover{transform:none'));
  assert.ok(css.includes('--feedback-time:160ms'));
  assert.ok(!/transition\s*:\s*all\b/.test(css));
});

test('expert refinement ships editorial avatars, original logos and licensed audience icons', async () => {
  for (const edition of ['com', 'ru']) {
    const root = resolve('dist', edition, 'expert');
    const html = await readFile(resolve(root, 'index.html'), 'utf8');
    assert.equal((html.match(/src="\.\/img\/archetypal-self-unpacking-book.webp"/g) ?? []).length, 2);
    await access(resolve(root, 'img/archetypal-self-unpacking-book.webp'));
    for (const key of ['graduation-cap', 'speech-balloon', 'books', 'briefcase', 'presentation', 'audit', 'label']) {
      assert.ok(html.includes(`./img/icon-${key}-3d.png`));
      await access(resolve(root, `img/icon-${key}-3d.png`));
    }
    for (const image of ['logo-vtb.svg', 'logo-skolkovo.png', 'logo-cissa.png', 'logo-clubfirst.png']) {
      assert.ok(html.includes(`./img/${image}`));
      await access(resolve(root, 'img', image));
    }
    for (const key of ['king', 'geisha', 'mother', 'master', 'cassandra']) {
      assert.ok(html.includes(`./img/avatar-${key}-editorial.webp`));
      await access(resolve(root, `img/avatar-${key}-editorial.webp`));
    }
    assert.ok(html.includes('Cormorant+Garamond:ital,wght@0,600;1,500&family=Onest'));
    assert.equal((html.match(/class="ic ic-3d"/g) || []).length, 3);
    assert.ok(html.includes('<blockquote class="mission">'));
    assert.ok(html.includes('class="hero-copy"'));
    assert.ok(html.includes('class="clients-track"'));
    assert.ok(html.includes('class="site-footer"'));
    assert.ok(html.includes('ИНН 246212538610'));
    assert.ok(html.includes('href="tel:+79895421560"'));
    assert.ok(html.includes('<span class="quote-mark" aria-hidden="true">“</span>'));
    assert.ok(html.includes('<span class="quote-mark" aria-hidden="true">”</span>'));
    assert.ok(!html.includes('src="./img/archetype-'));
  }
  assert.ok((await readFile(resolve('sites/expert/FLUENT-EMOJI-LICENSE.txt'), 'utf8')).includes('Copyright (c) Microsoft Corporation'));
});
test('RSYA archive is byte-identical in RU and absent from COM', async () => {
  const files = ['index.html', '.htaccess', 'max/index.html', 'psy/index.html'];
  for (const file of files) {
    assert.deepEqual(await readFile(resolve('sites/rsya-ru', file)), await readFile(resolve('dist/ru', file)));
    await assert.rejects(access(resolve('dist/com', file)));
  }
});
