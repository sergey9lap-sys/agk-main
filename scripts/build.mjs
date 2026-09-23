import { build } from 'vite';
import { readFile, writeFile, mkdir, rm, access, readdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withAnalytics } from './analytics.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const edition = process.argv[2];
if (!['com', 'ru'].includes(edition)) throw new Error('Use build:com or build:ru');
const registry = JSON.parse(await readFile(resolve(root, 'sites.json'), 'utf8'));
const staticRoots = JSON.parse(await readFile(resolve(root, 'static-roots.json'), 'utf8'));
const staticSource = staticRoots[edition];
if (staticSource && !/^sites\/[a-z0-9-]+$/.test(staticSource)) throw new Error('Invalid static root');
async function staticFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error('Static roots cannot contain symlinks');
    if (entry.isDirectory()) files.push(...await staticFiles(resolve(directory, entry.name), name + '/'));
    else if (entry.isFile()) files.push(name);
  }
  return files;
}
const output = resolve(root, 'dist', edition);
// The only recursive cleanup targets are these two generated output directories.
if (![resolve(root, 'dist/com'), resolve(root, 'dist/ru')].includes(output)) throw new Error('Unsafe output');
const routes = new Set(Object.keys(registry));
for (const [slug, site] of Object.entries(registry)) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid slug');
  const config = site.editions?.[edition];
  if (!config || typeof config !== 'object') throw new Error('Invalid edition config');
  const hasWidgetConfig = ['widgetId', 'scriptId'].some(key => config[key] !== undefined);
  if (hasWidgetConfig && (!/^\d+$/.test(config.widgetId) || !/^[a-f0-9]+$/.test(config.scriptId))) throw new Error('Invalid widget config');
  if (config.successPath !== undefined && !/^\/[a-z0-9/-]+\/$/.test(config.successPath)) throw new Error('Invalid success path');
  if ((site.confirmationAliases?.length ?? 0) > 0 && (!hasWidgetConfig || config.successPath === undefined)) throw new Error('Confirmation aliases require widget config and success path');
  const editionConfirmation = site.editionConfirmationPaths?.[edition];
  if (editionConfirmation !== undefined && (!/^[a-z0-9-]+$/.test(editionConfirmation) || !hasWidgetConfig || config.successPath !== `/${slug}/${editionConfirmation}/`)) {
    throw new Error('Edition confirmation requires a widget and matching nested success path');
  }
  for (const alias of site.confirmationAliases ?? []) {
    if (!/^[a-z0-9-]+$/.test(alias) || routes.has(alias)) throw new Error(`Duplicate or invalid route: ${alias}`);
    routes.add(alias);
  }
}
const importedFiles = staticSource ? await staticFiles(resolve(root, staticSource)) : [];
for (const file of importedFiles) {
  if (routes.has(file.split('/')[0])) throw new Error(`Static route conflicts with registered site: ${file}`);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const [slug, site] of Object.entries(registry)) {
  const config = site.editions[edition];
  const siteRoot = resolve(root, 'sites', slug);
  const base = `/${slug}/`;
  const assetPaths = html => html.replace(/((?:src|href)=["'])\/(?!\/)/g, `$1${base}`);
  const editionHtml = html => html
    .replaceAll('%%WIDGET_ID%%', config.widgetId ?? '')
    .replaceAll('%%SCRIPT_ID%%', config.scriptId ?? '')
    .replaceAll('%%SUCCESS_PATH%%', config.successPath ?? '')
    .replaceAll('%%COOKIE_SERVICES%%', edition === 'com' && slug === 'clients' ? 'Яндекс.Метрика, Meta Pixel и формы GetCourse' : 'Яндекс.Метрика и формы GetCourse');
  const analytics = html => slug === 'clients'
    ? withAnalytics(html, edition, { consentCookie: 'agk_cookie_consent_clients' })
    : slug === 'mkclients'
      ? withAnalytics(html, edition, { includeMetaPixel: false, consentCookie: 'agk_cookie_consent_mkclients' })
      : html;
  const aliases = site.confirmationAliases ?? [];
  const editionConfirmation = site.editionConfirmationPaths?.[edition];
  const confirmation = aliases.length || editionConfirmation
    ? analytics(assetPaths(editionHtml(await readFile(resolve(siteRoot, 'src/thank-you.html'), 'utf8'))))
    : null;
  await build({
    configFile: false, root: siteRoot, base,
    build: { outDir: resolve(output, slug), emptyOutDir: true },
    plugins: [{
      name: 'agk-edition',
      transformIndexHtml: { order: 'pre', handler: editionHtml },
    }],
  });
  const landingPath = resolve(output, slug, 'index.html');
  await writeFile(landingPath, analytics(await readFile(landingPath, 'utf8')));
  if (confirmation) {
    // Public CSS is copied as-is by Vite: scope its font URLs to this site too.
    const cssPath = resolve(output, slug, 'thank-you.css');
    const css = await readFile(cssPath, 'utf8');
    await writeFile(cssPath, css.replace(/url\((["'])\/(?!\/)/g, `url($1${base}`));
  }
  for (const alias of aliases) {
    await mkdir(resolve(output, alias), { recursive: true });
    await writeFile(resolve(output, alias, 'index.html'), confirmation);
    await mkdir(resolve(output, slug, alias), { recursive: true });
    await writeFile(resolve(output, slug, alias, 'index.html'), confirmation);
  }
  if (editionConfirmation) {
    await mkdir(resolve(output, slug, editionConfirmation), { recursive: true });
    await writeFile(resolve(output, slug, editionConfirmation, 'index.html'), confirmation);
  }
}
// Copy the archived RU site byte-for-byte, including its directory routing rules.
for (const file of importedFiles) {
  const target = resolve(output, file);
  try { await access(target); throw new Error(`Output collision: ${file}`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(dirname(target), { recursive: true });
  await copyFile(resolve(root, staticSource, file), target);
}
// COM still has no homepage. Preserve an imported 404 page if supplied later.
if (!importedFiles.includes('404.html')) await writeFile(resolve(output, '404.html'), '<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Страница не найдена</title><h1>Страница не найдена</h1></html>');
console.log(`AGK ${edition}: ${output}`);
