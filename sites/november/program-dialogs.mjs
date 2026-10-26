// Native details remain readable when JavaScript is unavailable.
document.querySelectorAll('.training-topics').forEach((details,index)=>{
 const card=details.closest('.event-card');
 const dialog=document.createElement('dialog');
 dialog.className='program-dialog';dialog.id=`program-dialog-${index+1}`;
 const header=document.createElement('header');
 const title=document.createElement('h2');title.id=`program-title-${index+1}`;title.textContent=card.querySelector('h3').textContent;
 dialog.setAttribute('aria-labelledby',title.id);
 const icon=(path)=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('width','22');svg.setAttribute('height','22');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.8');svg.setAttribute('aria-hidden','true');const p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',path);svg.append(p);return svg;};
 const close=document.createElement('button');close.type='button';close.className='program-close';close.setAttribute('aria-label','Закрыть программу');close.append(icon('m6 6 12 12M18 6 6 18'));
 header.append(title,close);
 const body=document.createElement('div');body.className='program-body';body.append(details.querySelector('ul'));
 dialog.append(header,body);document.body.append(dialog);
 const trigger=document.createElement('button');trigger.type='button';trigger.className='program-trigger';trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls',dialog.id);
 trigger.textContent=`Открыть программу · ${body.querySelectorAll('li').length} тем`;
 trigger.append(icon('M5 19 19 5M5 5h14v14'));
 details.replaceWith(trigger);
 let previousOverflow='';
 trigger.addEventListener('click',()=>{previousOverflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';close.focus({preventScroll:true});});
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;trigger.focus({preventScroll:true});});
});
