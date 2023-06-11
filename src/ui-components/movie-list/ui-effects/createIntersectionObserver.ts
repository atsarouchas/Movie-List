import { state, setMovies, setError } from '../../../libraries/state/';
import { searchMovies, fetchMovies } from '../../../services/';
import { showEndOfResults, showLoading } from '../../../libraries/dom/';

const fetchNewPage = () => {
  const currentState = state.getState();
  const fetchNewMovies = currentState.query
    ? searchMovies(currentState.query, currentState.currentPage + 1)
    : fetchMovies(currentState.currentPage + 1);

  fetchNewMovies
    .then((data) => {
      setMovies(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      setError(
        `Error while fetching movies for page${currentState.currentPage + 1}`
      );
    });
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const handleScrollIntoView = (entries: any, observer: any) => {
  const currentState = state.getState();

  const isLastPage = currentState.currentPage === currentState.totalPages;

  if (currentState.error) {
    return;
  }

  if (isLastPage) {
    return showEndOfResults();
  }

  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      if (!isLastPage) {
        showLoading();
        fetchNewPage();
        observer.disconnect();
      }
    }
  });
};
const observer = new IntersectionObserver(handleScrollIntoView, options);

export const createIntersectionObserver = (id: string) => {
  const target = document.getElementById(id) as HTMLElement;
  observer.observe(target);
};
