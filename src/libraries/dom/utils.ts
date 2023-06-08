import { DomElement } from './DomElement';

export const showLoading = () =>
  document
    .getElementById('loading-container')
    ?.classList.remove('display-none');

export const hideLoading = () =>
  document.getElementById('loading-container')?.classList.add('display-none');

export const showEndOfResults = () =>
  document.getElementById('end-of-results')?.classList.remove('display-none');

export const hideEndOfResults = () =>
  document.getElementById('end-of-results')?.classList.add('display-none');

export const showError = (errorText: string) => {
  const errorElement = new DomElement('div');
  errorElement.setAttribute('id', 'error').setInnerHtml(`⚠️ ${errorText}`);

  document.getElementById('app')?.append(errorElement.current);
};

export const hideError = () => {
  const errorElement = document.querySelector('#error');
  if (errorElement) {
    document.getElementById('app')?.removeChild(errorElement);
  }
};

export const showScrollToTop = () =>
  document.getElementById('scroll-to-top')?.classList.remove('display-none');

export const hideScrollToTop = () =>
  document.getElementById('scroll-to-top')?.classList.add('display-none');

export const showMovieOverview = (id: number) =>
  document.getElementById(`overview-${id}`)?.classList.remove('display-none');

export const hideMovieOverview = (id: number) =>
  document.getElementById(`overview-${id}`)?.classList.add('display-none');

export const showModal = () => {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');
  const mainContent = document.querySelector('.main-content');

  backdrop?.classList.add('visible');
  modal?.classList.remove('display-none');
  mainContent?.classList.add('blurry');
  document.body?.classList.add('overflow-hidden');
};

export const hideModal = () => {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');
  const mainContent = document.querySelector('.main-content');

  (modal as HTMLElement).innerHTML = '';

  modal?.classList.add('display-none');

  backdrop?.classList.remove('visible');
  mainContent?.classList.remove('blurry');
  document.body?.classList.remove('overflow-hidden');
};
