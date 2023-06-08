import { showEndOfResults, showLoading } from '../../../libraries/dom/utils';
import { debounce, isScrollAtBottom } from '../../../utils/';
import { fetchMovies } from '../../../services/fetchMovies';
import { state } from '../../../libraries/state/AppState';
import { searchMovies } from '../../../services/searchMovies';
import { setError, setMovies } from '../../../libraries/state/actions';

const fetchNewPage = () => {
  const currentState = state.getState();

  const fetchNewMovies = currentState.query
    ? searchMovies(currentState.query, currentState.currentPage + 1)
    : fetchMovies(currentState.currentPage + 1);

  fetchNewMovies
    .then((data) => {
      setMovies(data);

      window.addEventListener('scroll', fetchWhenScrollToBottom);
    })
    .catch((error) => {
      console.error('Error:', error);
      setError(
        `Error while fetching movies for page${currentState.currentPage + 1}`
      );

      window.addEventListener('scroll', fetchWhenScrollToBottom);
    });
};

const debouncedFetchNewPage = debounce(fetchNewPage, 200);

export const fetchWhenScrollToBottom = () => {
  const currentState = state.getState();
  const isLastPage = currentState.currentPage === currentState.totalPages;

  if (currentState.error) {
    return;
  }

  if (isLastPage) {
    return showEndOfResults();
  }

  if (isScrollAtBottom() && !isLastPage) {
    showLoading();

    window.removeEventListener('scroll', fetchWhenScrollToBottom);
    debouncedFetchNewPage();
  }
};

window.addEventListener('scroll', fetchWhenScrollToBottom);
