import { showLoading } from '../libraries/dom/utils';
import { state } from '../libraries/state/AppState';
import { searchMovies } from '../services/searchMovies';
import { debounce } from '../utils/debounce';
import { initialFetch } from './movie-list/ui-effects/initialFetch';

export function search(): void {
  const search = document.getElementById('search');

  const debouncedInputHandler = debounce((e: Event) => {
    const query = (<HTMLTextAreaElement>e?.target).value;
    if (query === '') {
      return initialFetch();
    }

    searchMovies(query, 1).then((data) => {
      const currentState = state.getState();

      state.setState({
        ...currentState,
        moviesInView: [...data.results],
        query,
        cachedPages: {
          [data.page]: [...data.results],
        },
        pagesInView: [data.page],
        currentPage: data.page,
      });
    });
  }, 1000);

  search?.addEventListener('input', (e) => {
    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = '';
    showLoading();

    debouncedInputHandler(e);
  });

  state.subscribe((newState) =>
    console.log('+++ New state from search:', newState)
  );
}
