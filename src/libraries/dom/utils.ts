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
