// Read only the official iframe's box, never its cross-origin fields or payload.
(() => {
  const report = () => {
    const root = document.getElementById('widget');
    if (!root) return; // GetCourse replaces its mount while initialising.
    const frame = root.querySelector('iframe');
    if (!frame) return;
    frame.title = 'Регистрация на вебинар 27 октября';
    const height = Math.ceil(root.getBoundingClientRect().height);
    if (height > 50 && height < 4000 && parent !== window) {
      parent.postMessage({type:'agk:sales-widget-size',height},location.origin);
    }
  };
  new MutationObserver(report).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','height']});
  new ResizeObserver(report).observe(document.body);
  addEventListener('resize',report);
  report();
})();
