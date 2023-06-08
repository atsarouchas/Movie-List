import { DomElement } from '../libraries/dom/DomElement';
import { hideModal, showLoading, showModal } from '../libraries/dom/utils';
import { state } from '../libraries/state/AppState';
import { toggleModal } from '../libraries/state/actions';
import { fetchMovieDetails } from '../services/fetchMovieDetails';

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Escape') {
    clearModal();
  }
};

export const renderModal = async (data: any, id: number) => {
  const backdrop = document.querySelector('.backdrop');
  const modal = document.querySelector('.modal') as HTMLElement;

  const modalContent = new DomElement('div');
  modalContent.setInnerHtml(`<b>${data.title}</b>`);
  window.addEventListener('keydown', handleKeyDown);
  showLoading();

  try {
    const movieDetails = await fetchMovieDetails(id);
    const videoUrl = movieDetails?.videos?.results?.find(
      ({ type }: { type: string }) => type === 'Trailer'
    )?.key;
    const allReviews = movieDetails?.reviews?.results;
    const reviews = allReviews?.length ? allReviews.slice(0, 2) : [];
    const similarMovies = movieDetails?.similar?.results.slice(0, 5);

    const videoElement = new DomElement('div');
    videoElement.setInnerHtml(
      videoUrl
        ? `
        <iframe class="video-trailer" src="https://www.youtube.com/embed/${videoUrl}"></iframe>
      `
        : '<b>- No trailer found -</b>'
    );

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

    const similarMovieElements = similarMovies.map((movie: any) => {
      const similarMovie = new DomElement('div');
      similarMovie.setAttribute('class', 'similar-movie');
      similarMovie.on('click', () => {
        modal.innerHTML = '';
        toggleModal(movie);
      });
      similarMovie.setInnerHtml(`
        <img src="${
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://nogalss.org/admin/assets/images/no-image2.png'
        }" >
        <span><b>${movie.title}</b> (${
        new Date(movie.release_date).getFullYear() || ''
      })</span>
        <span class="rating">${movie.vote_average.toFixed(1)} ☆</span>
      `);

      return similarMovie.current;
    });

    const reviewsHeader = new DomElement('h3');
    reviewsHeader.setInnerHtml(
      reviewElements.length ? 'Reviews' : '- No reviews found -'
    );
    const similarMoviesHeader = new DomElement('h3');
    similarMoviesHeader.setInnerHtml(
      similarMovieElements.length
        ? 'Similar Movies'
        : '- No similar movies found -'
    );

    modalContent.appendElement(videoElement.current);
    modalContent.appendElement(reviewsHeader.current);
    reviewElements.forEach((element: any) =>
      modalContent.appendElement(element)
    );
    modalContent.appendElement(similarMoviesHeader.current);
    similarMovieElements.forEach((element: any) =>
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
  window.removeEventListener('keydown', handleKeyDown);
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
