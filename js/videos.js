(function () {
  const JSON_URL = 'data/videos.json';

  const loadVideos = async () => {
    try {
      const res = await fetch(JSON_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.videos || [];
    } catch (e) {
      console.error('[videos] Failed to load:', e);
      return [];
    }
  };

  const renderVideos = (videos) => {
    const container = document.getElementById('videos-container');
    if (!container) return;

    videos.forEach(video => {
      const div = document.createElement('div');
      div.className = 'yt-consent';
      div.setAttribute('data-yt-src', video.url);
      div.setAttribute('data-video-id', video.id);
      div.setAttribute('data-video-title', video.title);
      div.setAttribute('data-video-date', video.date);
      container.appendChild(div);
    });
    
    // Dispatch event to notify that videos are ready
    document.dispatchEvent(new CustomEvent('videosLoaded'));
  };

  const init = async () => {
    const videos = await loadVideos();
    renderVideos(videos);
  };

  document.addEventListener('DOMContentLoaded', init);
})();
