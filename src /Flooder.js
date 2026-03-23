// Proxy override for all fetch calls to Blooket domains
(function() {
  const originalFetch = window.fetch;
  window.fetch = function(resource, init) {
    let url = resource;
    if (typeof resource === 'string') {
      url = resource;
    } else if (resource instanceof Request) {
      url = resource.url;
    }

    if (url && (url.includes('blooket.com') || url.includes('dashboard.blooket.com') || url.includes('play.blooket.com'))) {
      const proxied = 'https://fancy-wood-4cb3.isabellerose6691ttt.workers.dev/' + encodeURIComponent(url);
      console.log('[Proxy DEBUG] Rewriting fetch to:', proxied);
      if (init) {
        console.log('[Proxy DEBUG] Request options:', JSON.stringify(init, null, 2));
      }
      return originalFetch(proxied, init).then(response => {
        console.log('[Proxy DEBUG] Proxied fetch response status:', response.status);
        return response;
      }).catch(err => {
        console.error('[Proxy DEBUG] Proxied fetch error:', err);
        throw err;
      });
    }

    return originalFetch(resource, init);
  };

  // Override XHR too
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    if (url.includes('blooket.com')) {
      const proxied = 'https://fancy-wood-4cb3.isabellerose6691ttt.workers.dev/' + encodeURIComponent(url);
      console.log('[Proxy DEBUG XHR] Rewriting to:', proxied);
      arguments[1] = proxied;
    }
    return originalOpen.apply(this, arguments);
  };

  // ---------------- DEBUG STATEMENTS ----------------
  // These run right after injection so you know the script executed
  console.log('%c[Blooket Proxy Flooder DEBUG] Script loaded and overrides ACTIVE!', 'background: #222; color: #bada55; font-size: 16px; padding: 4px;');
  console.log('[DEBUG] Current page URL:', window.location.href);
  console.log('[DEBUG] Bookmarklet ran at:', new Date().toISOString());
  console.log('[DEBUG] Waiting for Blooket API calls... Try joining/playing a game or triggering actions.');

  // Optional: Alert for mobile/iOS visibility (since console is harder on phone)
  // Comment out if annoying
  // alert('Proxy Flooder DEBUG: Script injected successfully! Check Safari console (via Mac inspector) for logs.');

})();
