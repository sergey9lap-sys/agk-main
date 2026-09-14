import { build } from 'vite';
import { readFile, writeFile, mkdir, rm, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const edition = process.argv[2];
if (!['com', 'ru'].includes(edition)) throw new Error('Use build:com or build:ru');
const registry = JSON.parse(await readFile(resolve(root, 'sites.json'), 'utf8'));
const output = resolve(root, 'dist', edition);
// The only recursive cleanup targets are these two generated output directories.
if (![resolve(root, 'dist/com'), resolve(root, 'dist/ru')].includes(output)) throw new Error('Unsafe output');
const routes = new Set(Object.keys(registry));
for (const [slug, site] of Object.entries(registry)) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid slug');
  const config = site.editions[edition];
  if (!config || !/^\d+$/.test(config.widgetId) || !/^[a-f0-9]+$/.test(config.scriptId) || !/^\/[a-z0-9/-]+\/$/.test(config.successPath)) throw new Error('Invalid edition config');
  for (const alias of site.confirmationAliases ?? []) {
    if (!/^[a-z0-9-]+$/.test(alias) || routes.has(alias)) throw new Error(`Duplicate or invalid route: ${alias}`);
    routes.add(alias);
  }
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const [slug, site] of Object.entries(registry)) {
  const config = site.editions[edition];
  const siteRoot = resolve(root, 'sites', slug);
  const base = `/${slug}/`;
  const assetPaths = html => html.replace(/((?:src|href)=["'])\/(?!\/)/g, `$1${base}`);
  const confirmation = assetPaths(await readFile(resolve(siteRoot, 'src/thank-you.html'), 'utf8'));
  await build({
    configFile: false, root: siteRoot, base,
    build: { outDir: resolve(output, slug), emptyOutDir: true },
    plugins: [{
      name: 'agk-edition',
      transformIndexHtml: { order: 'pre', handler: html => html
        .replaceAll('%%WIDGET_ID%%', config.widgetId)
        .replaceAll('%%SCRIPT_ID%%', config.scriptId)
        .replaceAll('%%SUCCESS_PATH%%', config.successPath) },
    }],
  });
  // Public CSS is copied as-is by Vite: scope its font URLs to this site too.
  const cssPath = resolve(output, slug, 'thank-you.css');
  const css = await readFile(cssPath, 'utf8');
  await writeFile(cssPath, css.replace(/url\((["'])\/(?!\/)/g, `url($1${base}`));
  for (const alias of site.confirmationAliases ?? []) {
    await mkdir(resolve(output, alias), { recursive: true });
    await writeFile(resolve(output, alias, 'index.html'), confirmation);
    await mkdir(resolve(output, slug, alias), { recursive: true });
    await writeFile(resolve(output, slug, alias, 'index.html'), confirmation);
  }
}
// No fabricated homepage or redirect. The landing page is independently usable at /clients/.
await writeFile(resolve(output, '404.html'), '<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Страница не найдена</title><h1>Страница не найдена</h1></html>');
console.log(`AGK ${edition}: ${output}`);
