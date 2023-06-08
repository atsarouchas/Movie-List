import { DomElement } from '../libraries/dom/DomElement';
import { hideModal, showLoading, showModal } from '../libraries/dom/utils';
import { state } from '../libraries/state/AppState';
import { toggleModal } from '../libraries/state/actions';
import { fetchMovieDetails } from '../services/fetchMovieDetails';

export const renderModal = async (data: any, id: number) => {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal');

  const modalContent = new DomElement('div');
  modalContent.setInnerHtml(data.title);
  showLoading();

  try {
    const movieDetails = await fetchMovieDetails(id);
    const videoUrl = movieDetails?.videos?.results?.find(
      ({ type }: { type: string }) => type === 'Trailer'
    )?.key;

    const allReviews = movieDetails?.reviews?.results;
    const reviews = allReviews?.length ? [allReviews[0], allReviews[1]] : [];

    const reviewElements = reviews.map(
      ({ author, content, created_at }: any) => {
        const reviewElement = new DomElement('article');

        const reviewDate = new Date(created_at);

        reviewElement.setAttribute('class', 'review');
        reviewElement.setInnerHtml(`
        <strong>By ${author}:</strong>
        <div>
          <strong>Created at: ${reviewDate.toLocaleDateString()}</strong>
        </div>
        <div>${content}</div>
      `);

        return reviewElement.current;
      }
    );

    const videoElement = new DomElement('div');
    videoElement.setInnerHtml(`
    <iframe class="video-trailer" src="https://www.youtube.com/embed/${videoUrl}"></iframe>
  `);

    const reviewsHeader = new DomElement('h3');
    reviewsHeader.setInnerHtml(`Reviews`);

    modalContent.appendElement(videoElement.current);
    modalContent.appendElement(reviewsHeader.current);
    reviewElements.forEach((element: any) =>
      modalContent.appendElement(element)
    );
  } catch (error) {
    console.error(error);
  }

  modal?.append(modalContent.current as unknown as Node);

  backdrop?.addEventListener('click', clearModal);

  return showModal();
};

export const clearModal = () => {
  hideModal();
  toggleModal(null);
};

export const modal = () => {
  state.subscribe((newState) => {
    if (newState.modalOpen) {
      return renderModal(newState.modalData, newState.modalOpen);
    }
  });
};
