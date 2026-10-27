// Official GetCourse forms are isolated so each script ID occurs once per document.
export const saleWidgets=(()=>{try{return JSON.parse(document.querySelector('#sale-widgets')?.textContent||'null');}catch{return null;}})();
export function setupSaleWidgets(){
 if(!saleWidgets)return false;
 const dialog=document.createElement('dialog');dialog.className='sale-widget-dialog';dialog.setAttribute('aria-labelledby','sale-widget-title');
 dialog.innerHTML='<header><h2 id="sale-widget-title"></h2><button type="button" class="sale-widget-close" aria-label="Закрыть форму"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><div class="sale-widget-scroll"><p class="sale-widget-status" role="status">Загружаем форму…</p><div class="sale-widget-mount"></div><p class="sale-widget-recovery" hidden>Форма не появилась? <a target="_blank" rel="noopener">Открыть отдельно</a></p></div>';
 document.body.append(dialog);
 const mount=dialog.querySelector('.sale-widget-mount'),status=dialog.querySelector('.sale-widget-status'),recovery=dialog.querySelector('.sale-widget-recovery'),close=dialog.querySelector('button');
 let trigger,overflow='',timer,exit,frame=null;
 const motion=()=>!matchMedia('(prefers-reduced-motion: reduce)').matches;
 function closeDialog(){
  if(exit||!dialog.open)return;
  if(!motion()){dialog.close();return;}
  exit=dialog.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.96)'}],{duration:200,easing:'cubic-bezier(.23,1,.32,1)'});
  exit.finished.then(()=>dialog.close()).catch(()=>{}).finally(()=>{exit=null;});
 }
 function open(key,button){
  const config=saleWidgets[key];if(!config)return;
  trigger=button;clearTimeout(timer);exit?.cancel();exit=null;
  const url=new URL(`forms/${key}/`,new URL('./',location.href));url.search=location.search;
  dialog.querySelector('h2').textContent=config.title;
  frame=document.createElement('iframe');frame.title=config.title;frame.src=url.href;frame.height='600';frame.setAttribute('allow','payment');
  mount.replaceChildren(frame);status.hidden=false;recovery.hidden=true;recovery.querySelector('a').href=url.href;
  overflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';close.focus({preventScroll:true});
  if(motion())dialog.animate([{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:250,easing:'cubic-bezier(.23,1,.32,1)'});
  timer=setTimeout(()=>{status.hidden=true;recovery.hidden=false;},18000);
 }
 document.querySelectorAll('[data-plan]').forEach(button=>{button.setAttribute('aria-haspopup','dialog');button.addEventListener('click',event=>{event.preventDefault();open(button.dataset.plan,button);});});
 document.querySelectorAll('[data-open-consultation]').forEach(button=>{button.setAttribute('aria-haspopup','dialog');button.addEventListener('click',()=>open('help',button));});
 close.addEventListener('click',closeDialog);
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();});
 dialog.addEventListener('close',()=>{clearTimeout(timer);document.body.style.overflow=overflow;trigger?.focus({preventScroll:true});});
 addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==frame?.contentWindow||event.data?.type!=='agk:sale-widget-size')return;
  const height=event.data.height;if(!Number.isInteger(height)||height<80||height>12000)return;
  frame.height=String(height);status.hidden=true;recovery.hidden=true;clearTimeout(timer);
 });
 // Remove the disabled local form in the edition with a live consultation widget.
 document.querySelector('#consultation-dialog')?.remove();
 return true;
}
