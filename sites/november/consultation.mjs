// The client explicitly requested placeholders until a GetCourse widget is supplied.
const dialog=document.querySelector('#consultation-dialog');
if(dialog){
 let trigger=null;
 const previousOverflow=document.body.style.overflow;
 function close(){dialog.close();}
 document.querySelectorAll('[data-open-consultation]').forEach(button=>button.addEventListener('click',()=>{
  trigger=button;dialog.showModal();document.body.style.overflow='hidden';
  dialog.querySelector('input')?.focus({preventScroll:true});
 }));
 dialog.querySelector('[data-close-consultation]').addEventListener('click',close);
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;trigger?.focus({preventScroll:true});});
 dialog.querySelector('form').addEventListener('submit',event=>event.preventDefault());
}
