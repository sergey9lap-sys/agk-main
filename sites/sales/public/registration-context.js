// GetCourse reads this document's location.search when it creates its iframe.
// Run synchronously BEFORE the official widget, including with cached host HTML.
// No storage, analytics consent changes, or cross-origin form access.
(() => {
  if (parent === window) return; // A directly opened form keeps its own query.
  try {
    if (parent.location.origin !== location.origin) return;
    const current = new URL(location.href);
    const campaign = parent.location.search;
    if (current.search === campaign) return;
    current.search = campaign;
    history.replaceState(history.state, '', current.href);
  } catch {
    // Cross-origin embedding must never break the registration form.
  }
})();
