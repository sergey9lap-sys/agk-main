// Same-length substitutions keep markup and text-node boundaries intact.
const shortWords = 'в|во|на|с|со|к|ко|у|о|об|обо|от|до|по|за|из|изо|без|для|при|про|под|подо|над|надо|перед|передо|через|между|после|около|вокруг|вместо|ради|кроме|против|среди|вдоль|вне|внутри|и|а|но|или|либо|да|не|ни|бы|же|ли|что|чтобы|как|потому|то|вы|он|мы|я|вас|ваше|её|их|эту|всё|если|когда|так|хоть|три|никому';
const orphan = new RegExp(`(?<![\\p{L}\\p{N}\\-\u2011])(${shortWords}) (?=[\\p{L}\\p{N}«„])`, 'giu');
export function protectRussianText(text) {
  // Approved semantic groups, not hard line breaks tied to one viewport.
  text = text.replace(/(?<!\p{L})(?:но власть вас|и ваше королевство|что вам не подходит|считать стоимость|Я — Сердце компании)(?!\p{L})/giu, phrase => phrase.replaceAll(' ', '\u00a0'));
  return text.replace(orphan, '$1\u00a0')
    .replace(/(?<=[\p{L}\p{N}])-(?=\p{L})/gu, '\u2011')
    .replace(/(\d) (?=(?:минут|лет|год|дн|час|октября|декабря|тысяч|рубл|₽))/gu, '$1\u00a0');
}
// Inline <strong>/<span> boundaries do not interrupt the sentence.
// Attributes, comments, scripts, styles and embedded SVG are never rewritten.
export function withRussianTypography(html) {
  const tokens = html.split(/(<!--[\s\S]*?-->|<[^>]+>)/g);
  let body = false, ignored = null, pieces = [];
  function flush() {
    const text = pieces.map(i => tokens[i]).join('');
    const protectedText = protectRussianText(text);
    let offset = 0;
    for (const i of pieces) {
      const length = tokens[i].length;
      tokens[i] = protectedText.slice(offset, offset + length);
      offset += length;
    }
    pieces = [];
  }
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith('<')) {
      const tag = token.match(/^<\/?([\w-]+)/)?.[1]?.toLowerCase();
      if (tag === 'body') { flush(); body = !token.startsWith('</'); }
      if (!body) continue;
      if (ignored) { if (token.startsWith(`</${ignored}`)) ignored = null; continue; }
      if (['script', 'style', 'svg', 'textarea', 'pre', 'code'].includes(tag)) { flush(); ignored = tag; }
      else if (['div','section','main','header','footer','nav','h1','h2','h3','h4','p','li','ul','ol','figure','figcaption','button','label','option','br','hr','dialog'].includes(tag)) flush();
    } else if (body && !ignored) pieces.push(i);
  }
  flush();
  return tokens.join('');
}
export function setupRussianTypography(root = document.body) {
  const groups = new Map();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node; (node = walker.nextNode());) {
    if (node.parentElement.closest('script,style,svg,textarea,pre,code,iframe')) continue;
    const block = node.parentElement.closest('h1,h2,h3,h4,p,li,button,label,option,figcaption,summary,div') ?? node.parentElement;
    if (!groups.has(block)) groups.set(block, []);
    groups.get(block).push(node);
  }
  for (const nodes of groups.values()) {
    const text = protectRussianText(nodes.map(n => n.data).join(''));
    let offset = 0;
    for (const node of nodes) { const length = node.data.length; node.data = text.slice(offset, offset + length); offset += length; }
  }
}
