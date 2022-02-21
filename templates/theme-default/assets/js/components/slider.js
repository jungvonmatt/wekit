/**
 * Initialize slider
 *
 * <div class="js-slider" data-loop="true|false" data-group="2">
 *   <div>
 *     <div class="js-scroll-wrapper">
 *       <div class="js-slide">1</div>
 *       <div class="js-slide">2</div>
 *       <div class="js-slide">3</div>
 *       <div class="js-slide">4</div>
 *       <div class="js-slide">5</div>
 *     </div>
 *   </div>
 *   <div>
 *     <button class="js-dot"></button>
 *     <button class="js-dot"></button>
 *     <button class="js-dot"></button>
 *     <button class="js-dot"></button>
 *     <button class="js-dot"></button>
 *   </div>
 *   <div>
 *     <span class="js-index--active">01</span>/<span class="js-index--count">05</span>
 *   </div>
 *   <button class="js-button--previous">prev</button>
 *   <button class="js-button--next">next</button>
 * </div>
 *
 * The slider can be configured using data-* attributes for the following settings:
 * - data-loop [true|false]
 * - group Number of slides to slide at once
 *
 * @param {HTMLElement} el
 */
function init(el) {
  el.classList.add('initialized');

  // Get required elements
  const wrapper = el.querySelector('.js-scroll-wrapper');
  const btnPrevious = el.querySelector('.js-button--previous');
  const btnNext = el.querySelector('.js-button--next');
  const oSlides = el.querySelectorAll('.js-slide');
  const dots = el.querySelectorAll('.js-dot');
  const [slide] = oSlides;
  const activeIndexEl = el.querySelector('.js-index--active');
  const countEl = el.querySelector('.js-index--count');

  const slidesPerGroup = el?.dataset?.group ?? 1;
  const loop = ['1', 'true', true].includes(el?.dataset?.loop);

  let slides = Array.from(oSlides);
  slides.forEach((slide, i) => {
    slide.setAttribute('data-index', i);
  });

  // Prepend & append slide clones to ensure a smooth loop experience
  if (loop) {
    Array.from(oSlides).forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('data-clone', true);
      wrapper.append(clone);
      slides = [...slides, clone];
    });

    Array.from(oSlides)
      .reverse()
      .forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.setAttribute('data-clone', true);
        wrapper.prepend(clone);
        slides = [clone, ...slides];
      });
  }

  let scrollTimer;
  let resizeTimer;
  let groupCounter = 1;
  let activeDot = 0;
  let activeSlide = slide;
  let activeIndex = parseInt(activeSlide?.dataset?.index ?? 0, 10);

  /**
   * Perform some actions on scroll end
   */
  function onScrollEnd() {
    const { scrollLeft } = wrapper;

    // Determine the current active slide
    for (let i = 0; i < slides.length; i++) {
      if (Math.abs(slides[i].offsetLeft - scrollLeft) < 50) {
        activeSlide = slides[i];
      }
    }

    // Reset slider positiojn if we are already viewing the cloned slides (loop)
    if (activeSlide?.dataset?.clone) {
      const orig = Array.from(oSlides).find((slide) => activeSlide?.dataset?.index === slide?.dataset?.index);
      if (orig) {
        wrapper.scrollLeft = orig.offsetLeft;
        activeSlide = orig;
      }
    }

    // Set active index
    activeIndex = parseInt(activeSlide?.dataset?.index ?? 0, 10);

    const activeIndexGrouped = Math.ceil(activeIndex / Math.min(slidesPerGroup, groupCounter));
    const slideCount = oSlides.length;
    const slideCountGrouped = Math.ceil(slideCount / Math.min(slidesPerGroup, groupCounter));

    // Handle dots
    if (dots[activeDot]) {
      dots[activeDot].classList.remove('is-active');
    }

    if (dots[activeIndexGrouped]) {
      dots[activeIndexGrouped].classList.add('is-active');
    }

    activeDot = activeIndexGrouped;

    // Set numbers to counter elements
    if (activeIndexEl) {
      const text = `${activeIndexGrouped + 1}`.padStart(Math.max(2, `${slideCountGrouped}`.length), 0);
      activeIndexEl.innerText = text;
    }

    if (countEl) {
      const text = `${slideCountGrouped}`.padStart(2, 0);
      countEl.innerText = text;
    }

    // Disable buttons
    if (btnPrevious) {
      btnPrevious.disabled = wrapper.scrollLeft <= 0;
    }

    if (btnNext) {
      btnNext.disabled = Math.ceil(wrapper.offsetWidth + wrapper.scrollLeft) >= wrapper.scrollWidth;
    }
  }

  function onResizeEnd() {
    groupCounter = 0;
    let slideWidth = 0;
    let nextSlide = slide;

    const { clientWidth } = wrapper;
    while (nextSlide && slideWidth + nextSlide.clientWidth <= clientWidth + 10 && !nextSlide?.dataset?.clone) {
      slideWidth += nextSlide.clientWidth;
      groupCounter += 1;
      nextSlide = nextSlide.nextElementSibling;
    }

    const slideCount = oSlides.length;
    const slideCountGrouped = Math.ceil(slideCount / Math.min(slidesPerGroup, groupCounter));

    dots.forEach((dot, i) => {
      if (i < slideCountGrouped) {
        dot.classList.remove('u-hidden');
      } else {
        dot.classList.add('u-hidden');
      }
    });

    onScrollEnd();
  }

  function onScroll() {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }

    scrollTimer = setTimeout(onScrollEnd, 50);
  }

  function onResize() {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(onResizeEnd, 50);
  }

  function getNextSlide(direction = 1) {
    let next =
      direction > 0 ? activeSlide.nextElementSibling || activeSlide : activeSlide.previousElementSibling || activeSlide;

    for (let i = 1; i < slidesPerGroup; i++) {
      next = direction > 0 ? next.nextElementSibling || next : next.previousElementSibling || next;
    }

    return next;
  }

  function onNextSlide(e, direction = 1) {
    e.preventDefault();
    const next = getNextSlide(direction);
    if (next) {
      wrapper.scrollTo({ left: next.offsetLeft, behavior: 'smooth' });
    }
  }

  function slideTo(e, pos) {
    e.preventDefault();
    const index = parseInt(pos, 10) * Math.min(slidesPerGroup, groupCounter);
    const el = Array.from(oSlides).find((slide) => parseInt(slide?.dataset?.index, 10) === index);
    wrapper.scrollTo({ left: el?.offsetLeft || 0, behavior: 'smooth' });
  }

  wrapper.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  btnPrevious?.addEventListener('click', (e) => onNextSlide(e, -1));
  btnNext?.addEventListener('click', (e) => onNextSlide(e, 1));

  Array.from(dots).forEach((dot, i) => {
    dot?.addEventListener('click', (e) => slideTo(e, i));
  });

  onResizeEnd();
}

export const initSlider = (root = document) => {
  const sliders = root.querySelectorAll('.js-slider:not(.initialized)');
  Array.from(sliders).forEach((root) => {
    init(root);
  });
};
