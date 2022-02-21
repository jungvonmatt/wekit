import params from '@params';

import { initVideo } from './components/video.js';
import { initSlider } from './components/slider.js';

console.log('%cHUGO @params:', 'color:green');
Object.entries(params).map(([key, value]) => console.log(`${key}: ${JSON.stringify(value)}`));

// Polyfill css container queries
const supportsContainerQueries = 'container' in document.documentElement.style;
if (supportsContainerQueries) {
  console.log('CSS Container Queries: Native support');
  document.documentElement.classList.add('cq');
} else {
  import('container-query-polyfill').then(() => {
    console.log('CSS Container Queries: Polyfilled');
    document.documentElement.classList.add('cq');
  });
}

// Fix jumping layout for content-visibility: auto
const cvObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.attributeStyleMap.set('content-visibility', 'visible');
      observer.unobserve(entry.target);
    }
  });
});

const initialize = () => {
  Array.from(document.querySelectorAll('main img')).forEach((el) => cvObserver.observe(el));
  initVideo();
  initSlider();
};

// We need to retrigger initialize in storybook so we don't have to reload the page
if (params.environment === 'storybook') {
  const observer = new MutationObserver(() => {
    setTimeout(() => initialize(), 1000);
  });
  observer.observe(document.querySelector('body'), { attributes: true, childList: false, characterData: false });
} else {
  initialize();
}
