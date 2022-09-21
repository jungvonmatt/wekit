import isHidden from '../utils/visibility';

/**
 * Initialize video
 *
 * @param {HTMLElement} root
 */
const init = (element) => {
  element.dataset.video = 'initialized';

  const video = element.querySelector('video');

  let loaded = false;

  function loadVideoSources() {
    Array.from(video.children).forEach((videoSource) => {
      if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
        videoSource.src = videoSource.dataset.src;
      }
    });

    video.load();
  }

  function isPlaying() {
    return Boolean(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
  }

  function playVideo() {
    if (!isPlaying()) {
      video.play();
    }
  }

  function pauseVideo() {
    if (isPlaying()) {
      video.pause();
    }
  }

  function observerCallback(entries) {
    entries.forEach((entry) => {
      // Break if video is hidden
      if (isHidden()) {
        return;
      }

      // Load sources
      if (!loaded && entry.isIntersecting) {
        loadVideoSources();
        loaded = true;
      }

      // Start or pause playback depending on the visibility
      if (entry.intersectionRatio === 0) {
        pauseVideo();
      } else {
        playVideo();
      }
    });
  }

  // Observe the visiblity of the video element
  const observer = new IntersectionObserver(observerCallback, { threshold: [0, 0.01] });
  observer.observe(video);
};

export const initVideo = (root = document) => {
  const videos = root.querySelectorAll('[data-video]:not([data-video="initialized"])');

  Array.from(videos).forEach((root) => {
    init(root);
  });
};
