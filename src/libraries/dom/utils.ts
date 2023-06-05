export const showLoading = () =>
  document
    .getElementById('loading-container')
    ?.classList.remove('display-none');

export const hideLoading = () =>
  document.getElementById('loading-container')?.classList.add('display-none');
