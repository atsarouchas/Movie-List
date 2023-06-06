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
