// Read only the official iframe box; GetCourse owns fields, consents and payment.
(()=>{
 const root=document.querySelector('#widget');let previous=0;
 const report=()=>{const frame=root?.querySelector('iframe');if(!frame)return;frame.title=document.title;const height=Math.ceil(root.getBoundingClientRect().height);if(height>=80&&height<=12000&&height!==previous){previous=height;if(parent!==window)parent.postMessage({type:'agk:sale-widget-size',height},location.origin);}};
 new MutationObserver(report).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','height']});
 new ResizeObserver(report).observe(document.body);addEventListener('resize',report);report();
})();
