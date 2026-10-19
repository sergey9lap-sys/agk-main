const event=window.WEBINAR;
for(const [attr,value] of Object.entries({date:event.date,day:event.day,month:event.month,time:event.time}))document.querySelectorAll(`[data-${attr}]`).forEach(el=>el.textContent=value);
// Связываем короткие служебные слова с последующим словом, не меняя содержание.
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('script,style,input,textarea')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>n.nodeValue=n.nodeValue.replace(/(^|[\s«(])(а|в|во|и|к|ко|с|со|у|о|об|от|до|за|из|на|не|но|по|под|при|для|или|без|над)\s+(?=\S)/giu,'$1$2\u00a0'));
// No sticky/scroll choreography: the program stays in its natural reading order.
