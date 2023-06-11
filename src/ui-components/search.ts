import { hideEndOfResults, hideError, showLoading } from '../libraries/dom/';
import { setError, setSearchMovies } from '../libraries/state/';
import { searchMovies } from '../services/';
import { debounce } from '../utils/debounce';
import { fetchNowPlayingInitial } from './movie-list/ui-effects/initialFetch';

export function search(): void {
  const search = document.getElementById('search');

  const debouncedInputHandler = debounce((e: Event) => {
    const query = (<HTMLTextAreaElement>e?.target).value;
    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = '';

    if (query === '') {
      return fetchNowPlayingInitial();
    }

    searchMovies(query, 1)
      .then((data) => {
        setSearchMovies(data, query);
      })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong while fetching the movies');
      });
  }, 1000);

  search?.addEventListener('input', (e) => {
    hideEndOfResults();
    hideError();
    showLoading();

    debouncedInputHandler(e);
  });
}
