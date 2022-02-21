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

export const initVideo = (root = document) => {
  const videos = root.querySelectorAll('.js-video:not(.initialized)');

  Array.from(videos).forEach((root) => {
    init(root);
  });
};
