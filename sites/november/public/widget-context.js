// Synchronous: GetCourse constructs its iframe from this exact location.search.
(()=>{if(parent===window)return;try{if(parent.location.origin!==location.origin)return;const url=new URL(location.href);url.search=parent.location.search;history.replaceState(history.state,'',url.href);}catch{}})();
