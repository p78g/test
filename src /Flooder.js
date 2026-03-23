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

    // Only proxy if it's a Blooket API call (adjust domains as needed)
    if (url && (url.includes('blooket.com') || url.includes('dashboard.blooket.com') || url.includes('play.blooket.com'))) {
      // Your Workers proxy setup – adjust based on how it rewrites
      // Common patterns: proxy/full-url or proxy?target=full-url or proxy/path
      const proxied = 'https://fancy-wood-4cb3.isabellerose6691ttt.workers.dev/' + encodeURIComponent(url);
      console.log('[Proxy] Rewriting to:', proxied);
      return originalFetch(proxied, init);
    }

    return originalFetch(resource, init);
  };

  // Optional: Also override XMLHttpRequest if the bot uses it (older scripts do)
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    if (url.includes('blooket.com')) {
      const proxied = 'https://fancy-wood-4cb3.isabellerose6691ttt.workers.dev/' + encodeURIComponent(url);
      console.log('[Proxy XHR] Rewriting to:', proxied);
      arguments[1] = proxied;
    }
    return originalOpen.apply(this, arguments);
  };
})();
