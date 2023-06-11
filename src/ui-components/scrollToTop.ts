import { hideScrollToTop, showScrollToTop } from '../libraries/dom/';

export const scrollToTop = () => {
  document.getElementById('scroll-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', (e) => {
    if (window.pageYOffset > 2000) {
      return showScrollToTop();
    }

    hideScrollToTop();
  });
};
