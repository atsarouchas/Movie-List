import { showLoading } from '../../../libraries/dom/utils';
import { debounce } from '../../../utils/debounce';
import { isScrollAtBottom } from '../../../utils/handleScrollToBottom';
import { fetchMovies } from '../../../services/fetchMovies';
import { state } from '../../../libraries/state/AppState';
import { searchMovies } from '../../../services/searchMovies';

const fetchNewPage = () => {
  const currentState = state.getState();

  const fetchNewMovies = currentState.query
    ? searchMovies(currentState.query, currentState.currentPage + 1)
    : fetchMovies(currentState.currentPage + 1);

  fetchNewMovies
    .then((data) => {
      state.setState({
        ...currentState,
        moviesInView: [...data.results],
        cachedPages: {
          ...currentState.cachedPages,
          [data.page]: [...data.results],
        },
        pagesInView: [...currentState.pagesInView, data.page],
        currentPage: data.page,
      });

      window.addEventListener('scroll', fetchWhenScrollToBottom);
    })
    .catch((error) => {
      console.error('Error:', error);
      state.setState({
        ...currentState,
        error: `Error while fetching movies for page${
          currentState.currentPage + 1
        }`,
      });
      window.addEventListener('scroll', fetchWhenScrollToBottom);
    });
};

const debouncedFetchNewPage = debounce(fetchNewPage, 1500);

export const fetchWhenScrollToBottom = () => {
  if (isScrollAtBottom()) {
    showLoading();

    window.removeEventListener('scroll', fetchWhenScrollToBottom);
    debouncedFetchNewPage();
  }
};

window.addEventListener('scroll', fetchWhenScrollToBottom);
