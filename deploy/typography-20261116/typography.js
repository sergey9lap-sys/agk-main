(()=>{
 const nbsp='\u00a0';
 function format(s){
  return s.replace(/Горев([а-яё]*)[-‑]Куртышев([а-яё]*)/gi,'Горев$1‑Куртышев$2')
   .replace(/(\d)[ \u00a0](?=\d{3}(?:\D|$))/g,'$1'+nbsp)
   .replace(/(\d)[ \u00a0]+(?=(?:руб\.|рублей|рубля|рубль|₽|%|час|минут|декабря|ноября|мест|модул|тем)(?:\b|[а-яё.]|$))/gi,'$1'+nbsp)
   .replace(/(\d)[ \u00a0]*[–—-][ \u00a0]*(?=\d)/g,'$1\u2060–\u2060')
   .replace(/([^\s])[ ]+([—–])(?=\s)/g,'$1'+nbsp+'$2')
   .replace(/(^|[\s(«])((?:в|во|на|к|ко|с|со|у|о|об|обо|от|до|из|за|по|под|над|для|без|при|и|а|но|не|ни)) +(?=\S)/gi,'$1$2'+nbsp);
 }
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('script,style,textarea,input,code,pre,[contenteditable]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(n=>n.nodeValue=format(n.nodeValue));
 const intro=document.querySelector('.hero .intro');
 if(intro&&intro.textContent.includes('Большой продуктовый хакатон')){
  intro.replaceChildren();
  for(const text of ['Большой продуктовый хакатон','Александры Горевой‑Куртышевой']){const span=document.createElement('span');span.textContent=text;span.className='agk-intro-line';intro.append(span);}
 }
 // Keep each surname intact; allow the first name to wrap in narrow cards.
 const style=document.createElement('style');style.textContent='.agk-intro-line{display:block;white-space:nowrap}.hero .intro{max-width:100%}@media(max-width:420px){.hero .intro{font-size:clamp(14px,4.1vw,17px)!important;letter-spacing:-.02em}}';document.head.append(style);
 function fit(){
  document.querySelectorAll('h1,h2,h3,.agk-intro-line').forEach(e=>{
   if(!e.getBoundingClientRect().width)return;
   if(e.dataset.typoSize){e.style.fontSize=e.dataset.typoSize;}
   else e.dataset.typoSize=e.style.fontSize||'';
   let size=parseFloat(getComputedStyle(e).fontSize);
   while(e.scrollWidth>e.clientWidth+2&&size>14){size-=.5;e.style.fontSize=size+'px';}
  });
 }
 document.fonts.ready.then(fit);window.addEventListener('resize',fit);
})();
