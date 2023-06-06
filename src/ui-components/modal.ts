import { DomElement } from '../libraries/dom/DomElement';
import { state } from '../libraries/state/AppState';

export function showModal(data: any) {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');
  const mainContent = document.querySelector('.main-content');

  const modalContent = new DomElement('div');
  modalContent.setInnerHtml(data.title);
  modal?.append(modalContent.current as unknown as Node);

  backdrop?.addEventListener('click', hideModal);

  backdrop?.classList.add('visible');
  modal?.classList.add('visible');
  mainContent?.classList.add('blurry');
  document.body?.classList.add('overflow-hidden');
}

export function hideModal() {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');
  const mainContent = document.querySelector('.main-content');

  (modal as HTMLElement).innerHTML = '';

  backdrop?.classList.remove('visible');
  modal?.classList.remove('visible');
  mainContent?.classList.remove('blurry');
  document.body?.classList.remove('overflow-hidden');
}

export function modal() {
  state.subscribe((newState) => {
    if (newState.modalOpen) {
      showModal(newState.modalData);
    }
  });
}
