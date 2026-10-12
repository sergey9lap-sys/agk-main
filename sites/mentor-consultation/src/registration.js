// Supplied GetCourse script creates the first native iframe. The second is
// an independent instance of the exact same native form, not a local clone UI.
export function setupRegistration(){
 const holders=[...document.querySelectorAll('[data-registration-widget]')];
 const scriptId='8ed37544be895cb145749befbb5aeccadf1a0519',widgetId='1667814';
 let firstFrame,firstPromise;
 function status(holder,message){holder.querySelector('[data-widget-status]').textContent=message;}
 function failed(holder){status(holder,'Не удалось загрузить форму. Проверьте подключение и повторите загрузку');holder.querySelector('[data-widget-retry]').hidden=false;}
 function timeout(holder){setTimeout(()=>{if(!holder.dataset.widgetReady)failed(holder);},20000);}
 // Resize only known iframe senders from GetCourse, rather than trusting
 // arbitrary postMessage events. Capture prevents its ID-only listener from
 // resizing the first form when the independent second form posts a height.
 window.addEventListener('message',event=>{
  if(event.origin!=='https://agkedu.getcourse.ru'||event.data?.uniqName!==scriptId)return;
  const holder=holders.find(h=>h.querySelector('iframe')?.contentWindow===event.source);
  const height=Number(event.data.height);if(!holder||!Number.isFinite(height)||height<1||height>5000)return;
  const frame=holder.querySelector('iframe'),embed=holder.querySelector('[data-widget-embed]');
  frame.style.height=`${height}px`;embed.style.height=`${height}px`;
  holder.dataset.widgetReady='true';holder.querySelector('[data-widget-status]').hidden=true;
  holder.querySelector('[data-widget-retry]').hidden=true;
  for(const element of holder.closest('.card').querySelectorAll(':scope > h3,:scope > .sub'))element.hidden=true;
  event.stopImmediatePropagation();
 },true);
 function first(){
  if(firstPromise)return firstPromise;
  const holder=holders[0],embed=holder.querySelector('[data-widget-embed]');
  timeout(holder);
  firstPromise=new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.id=scriptId;
   script.src=`https://agkedu.getcourse.ru/pl/lite/widget/script?id=${widgetId}`;
   script.onload=()=>{
    if(document.getElementById(scriptId))document.dispatchEvent(new Event(`StartWidget${scriptId}`));
    firstFrame=embed.querySelector('iframe');
    if(!firstFrame){failed(holder);reject(new Error('No native form'));return;}
    firstFrame.title='Запись на диагностическую консультацию';resolve(firstFrame);
   };
   script.onerror=()=>{failed(holder);reject(new Error('Widget unavailable'));};embed.append(script);
  });
  return firstPromise;
 }
 async function second(){
  const holder=holders[1];if(!holder||holder.dataset.widgetLoaded)return;holder.dataset.widgetLoaded='true';
  timeout(holder);
  try{
   const template=await first(),frame=template.cloneNode(false);
   frame.id='mentoring-consultation-bottom';frame.style.height='0px';
   frame.title='Запись на диагностическую консультацию — вторая форма';
   holder.querySelector('[data-widget-embed]').append(frame);
  }catch{failed(holder);}
 }
 first().catch(()=>{});
 for(const holder of holders)holder.querySelector('[data-widget-retry]').addEventListener('click',()=>{
  holder.querySelector('[data-widget-retry]').hidden=true;holder.querySelector('[data-widget-status]').hidden=false;status(holder,'Загружаем форму записи…');
  const frame=holder.querySelector('iframe');
  if(frame){delete holder.dataset.widgetReady;frame.src=frame.src;timeout(holder);}
  else if(holder===holders[0]){firstPromise=null;holder.querySelector('[data-widget-embed]').replaceChildren();first().catch(()=>{});}
  else{delete holder.dataset.widgetLoaded;second();}
 });
 if(holders[1]&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){second();observer.disconnect();}},{rootMargin:'400px'});
  observer.observe(holders[1]);
 }else second();
}
