import { DomElement } from '../libraries/dom/DomElement';
import { hideModal, showModal } from '../libraries/dom/utils';
import { state } from '../libraries/state/AppState';
import { toggleModal } from '../libraries/state/actions';

export function renderModal(data: any) {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');

  const modalContent = new DomElement('div');
  modalContent.setInnerHtml(data.title);
  modal?.append(modalContent.current as unknown as Node);

  backdrop?.addEventListener('click', clearModal);

  return showModal();
}

export function clearModal() {
  hideModal();
  toggleModal(null);
}

export function modal() {
  state.subscribe((newState) => {
    if (newState.modalOpen) {
      return renderModal(newState.modalData);
    }
  });
}
