import params from '@params';
import { listen } from 'quicklink';
import { initVideo } from './components/video.js';
import { initSlider } from './components/slider.js';

if (params.environment !== 'production') {
  console.log('%cHUGO @params:', 'color:green');
  Object.entries(params).map(([key, value]) => console.log(`${key}: ${JSON.stringify(value)}`));
}

listen();

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
      entry.target.style.contentVisibility = 'visible';
      observer.unobserve(entry.target);
    }
  });
});

Array.from(document.querySelectorAll('main > *:nth-child(n + 2)')).forEach((el) => cvObserver.observe(el));

// Initialize components
const initialize = () => {
  for (const init of [initVideo, initSlider]) {
    try {
      init();
    } catch (e) {
      console.log(e);
    }
  }
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
