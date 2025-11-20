(function() {
  const KEY = 'sn_consent_v1'; // change name if you like
  const getConsent = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e) { return {}; }
  };
  const setConsent = (obj) => localStorage.setItem(KEY, JSON.stringify(obj));

  function loadYouTubeEmbeds() {
    const consent = getConsent();
    document.querySelectorAll('.yt-consent').forEach(box => {
      const src = box.getAttribute('data-yt-src');
      if (!src) return;
      const placeholder = box.querySelector('.yt-consent__placeholder');

      if (consent.media === true) {
        // load real iframe (use privacy-enhanced domain)
        const url = src.replace('youtube.com', 'youtube-nocookie.com');
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.aspectRatio = '16 / 9';
        iframe.src = url + (url.includes('?') ? '&' : '?') + 'rel=0&modestbranding=1';
        iframe.frameBorder = '0';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        box.innerHTML = '';
        box.appendChild(iframe);
      } else {
        // keep/show placeholder
        if (!placeholder) {
          const ph = document.createElement('div');
          ph.className = 'yt-consent__placeholder';
          ph.innerHTML =
            '<div><div>YouTube ist deaktiviert, bis du zustimmst.</div>' +
            '<button type="button">YouTube für dieses Video aktivieren</button></div>';
          box.appendChild(ph);
        }
      }
    });
  }

  // Banner logic
  const banner = document.getElementById('cookie-banner');
  const consent = getConsent();
  if (typeof consent.media === 'undefined') {
    banner.style.display = 'block';
    // Show placeholders for YouTube videos when banner is visible
    loadYouTubeEmbeds();
  } else {
    loadYouTubeEmbeds();
  }

  document.getElementById('cc-accept').addEventListener('click', () => {
    setConsent({ essential: true, media: true });
    banner.style.display = 'none';
    loadYouTubeEmbeds();
  });

  document.getElementById('cc-reject').addEventListener('click', () => {
    setConsent({ essential: true, media: false });
    banner.style.display = 'none';
    loadYouTubeEmbeds();
  });

  // Per-video enable button (grants media consent and loads immediately)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.yt-consent__placeholder button');
    if (!btn) return;
    setConsent({ essential: true, media: true });
    if (banner) banner.style.display = 'none';
    loadYouTubeEmbeds();
  });

  // Listen for dynamically loaded videos
  document.addEventListener('videosLoaded', () => {
    loadYouTubeEmbeds();
  });
})();

