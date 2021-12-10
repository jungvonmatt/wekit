import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';
import whitelister from 'purgecss-whitelister';

export const plugins = [
  autoprefixer(),
  purgecss({
    variables: true,
    content: ['./layouts/**/*.html'],
    safelist: [...whitelister(['./assets/scss/vendors/modern-normalize.css'])],
  }),
];
