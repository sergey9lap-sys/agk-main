import {mkdir,writeFile,copyFile} from 'node:fs/promises';
import {resolve} from 'node:path';

// Each placement owns an isolated document, so the official script ID is unique.
export async function prepareWebinarRegistration({output,root,slug,config,edition}){
 const widget=config.registrationWidget;if(!widget)return;
 if(!/^\d+$/.test(widget.widgetId)||!/^[a-f0-9]{40}$/.test(widget.scriptId))throw Error('Invalid webinar widget');
 const directory=resolve(output,slug,'registration');await mkdir(directory,{recursive:true});
 await copyFile(resolve(root,'sites/sales/public/registration-context.js'),resolve(output,slug,'registration-context.js'));
 const successSlug=slug.replace(/_short$/,'');
 const successPath=`/${successSlug}/${edition==='ru'?'spasibo':'thanks'}/`;
 await writeFile(resolve(directory,'index.html'),`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Регистрация на вебинар 12 ноября</title><style>html,body{margin:0;background:transparent;color:#f7ead1;font:16px/1.5 Arial,sans-serif}iframe{display:block;width:100%;border:0}p{padding:12px}</style><script src="../registration-context.js"></script></head><body><div id="widget" data-success-path="${successPath}"><script id="${widget.scriptId}" src="https://agkedu.getcourse.ru/pl/lite/widget/script?id=${widget.widgetId}"></script></div><noscript><p>Для загрузки формы включите JavaScript.</p></noscript><script src="../registration-embed.js" defer></script></body></html>`);
 await writeFile(resolve(output,slug,'registration-embed.js'),`(()=>{const report=()=>{const root=document.getElementById('widget'),frame=root?.querySelector('iframe');if(!frame)return;frame.title='Регистрация на вебинар 12 ноября';const height=Math.ceil(root.getBoundingClientRect().height);if(height>80&&height<6000&&parent!==window)parent.postMessage({type:'agk:webinar-size',height},location.origin)};new MutationObserver(report).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','height']});new ResizeObserver(report).observe(document.body);addEventListener('resize',report);report()})();`);
}
