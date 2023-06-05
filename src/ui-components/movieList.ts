import { DomElement } from '../libraries/dom/DomElement';
import { state } from '../libraries/state/AppState';
import { fetchMovies } from '../services/fetchMovies';
import { debounce } from '../utils/debounce';
import { isScrollAtBottom } from '../utils/handleScrollToBottom';

window.onload = async () => {
  const initialState = state.getState();
  const data = await fetchMovies(initialState.currentPage);
  state.setState({
    ...initialState,
    moviesInView: data.results,
    cachedPages: {
      [data.page]: [...data.results],
    },
    pagesInView: [initialState.currentPage],
  });
};

export async function moveList() {
  state.subscribe((newState) => {
    const elements = (newState.moviesInView || []).map((item: any) => {
      const element = new DomElement('div');
      element
        .setInnerHtml(item.title)
        .setAttribute('id', item.id)
        .setAttribute('class', 'movie-card')
        .setAttribute(
          'style',
          `background-image:url(https://image.tmdb.org/t/p/w500${item.poster_path})`
        )
        .on('click', () => {
          const oldState = state.getState();

          state.setState({
            ...oldState,
            modalOpen: item.id,
            modalData: {
              title: item.title,
            },
          });
        });

      return element.element;
    });

    const app = document.getElementById('app');
    elements.forEach((el: HTMLElement) => app?.append(el));

    function handleScrollToBottom() {
      if (isScrollAtBottom()) {
        document
          .getElementById('loading-container')
          ?.classList.remove('display-none');

        window.removeEventListener('scroll', handleScrollToBottom);

        const currentState = state.getState();

        fetchMovies(currentState.currentPage + 1)
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

            window.addEventListener('scroll', handleScrollToBottom);
          })
          .catch((error) => {
            console.error('Error:', error);
            state.setState({
              ...currentState,
            });
            window.addEventListener('scroll', handleScrollToBottom);
          });
      }
    }

    const debouncedScrollToBottom = debounce(handleScrollToBottom, 1500);

    window.addEventListener('scroll', debouncedScrollToBottom);
  });
}
