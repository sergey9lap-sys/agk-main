// Mechanical import of the supplied HTML: retain copy, extract embedded assets.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const input = process.argv[2];
if (!input) throw new Error('Pass the supplied T123 text file');
const target = resolve('sites/consultation');
await mkdir(resolve(target, 'public/img'), { recursive: true });
await mkdir(resolve(target, 'src'), { recursive: true });
let html = await readFile(input, 'utf8');
let assetIndex = 0;
const assets = [...html.matchAll(/data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)/g)];
for (const match of assets) {
  const extension = match[1] === 'jpeg' ? 'jpg' : match[1];
  const name = `source-${++assetIndex}.${extension}`;
  await writeFile(resolve(target, 'public/img', name), Buffer.from(match[2], 'base64'));
  html = html.replace(match[0], `./img/${name}`);
}
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
// Imported CSS moves one level down; maintain relative asset resolution.
await writeFile(resolve(target, 'src/source.css'), css.replaceAll('./img/', '../public/img/'));
html = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="./src/source.css">\n<link rel="stylesheet" href="./src/consultation.css">');
html = html.replace('<body style="margin:0">', `<body style="margin:0">
<!-- THESIS: diagnose the product line, with the application visible immediately.
OWN-WORLD: agreed AGK navy and gold, Cormorant headings and Onest text.
STORY: audience, concrete outcomes, author evidence, application.
FIRST VIEWPORT: offer and proof left, open light form right; mobile heading then form.
FORM: user-supplied two-column composition, source-driven code-led build, no new concept seed.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->`);
html = html.replace('<form action="#" method="post">', '<p class="form-status" role="status">Приём заявок пока не подключён. Форма станет доступна после подключения регистрации.</p>\n      <form data-consultation-form>');
html = html.replace('class="btn" type="submit"', 'class="btn" type="submit" disabled');
html = html.replace('<a href="#">политикой конфиденциальности', '<a href="https://agkedu.getcourse.ru/personaldata" target="_blank" rel="noopener noreferrer">политикой конфиденциальности');
html = html.replace(/(<input[^>]+placeholder="([^"]+)"[^>]*)(>)/g, '$1 aria-label="$2"$3');
html = html.replace('</head>', '<meta name="description" content="Бесплатная диагностика продуктовой линейки экспертов и онлайн-школ: 30 минут разбора с экспертом школы Александры Горевой-Куртышевой.">\n</head>');
html = html.replace('</body>', '<script type="module" src="./src/page.js"></script>\n</body>');
await writeFile(resolve(target, 'index.html'), html);
console.log(`Imported consultation with ${assets.length} supplied images; source copy retained.`);
