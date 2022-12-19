/**
 * Initialize video player
 *
 * @param {HTMLElement} root
 */
const init = (root) => {
  const video = root.querySelector('video');
  root.classList.add('initialized');

  const showButton = () => root.classList.remove('is-playing');
  const hideButton = () => root.classList.add('is-playing');

  if (video) {
    video.addEventListener('playing', () => hideButton());
    video.addEventListener('pause', () => showButton());
    video.addEventListener('ended', () => showButton());

    if (video.controls === false) {
      root.addEventListener('click', () => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }

    if (video.paused) {
      root.classList.remove('is-playing');
    } else {
      root.classList.add('is-playing');
    }
  }
};

export const initVideoPlayer = (root = document) => {
  const videos = root.querySelectorAll('.js-video-player:not(.initialized)');

  Array.from(videos).forEach((root) => {
    init(root);
  });

  // Lazy loading videos
  if ('IntersectionObserver' in window) {
    const lazyVideos = Array.from(document.querySelectorAll('video[loading="lazy"]'));
    const lazyVideoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (const videoSource of video.target.children) {
            if (typeof videoSource?.tagName === 'string' && videoSource?.tagName === 'SOURCE') {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.removeAttribute('loading');
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
};
