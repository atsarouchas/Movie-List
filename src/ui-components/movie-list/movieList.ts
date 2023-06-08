import { DomElement } from '../../libraries/dom/DomElement';
import {
  hideMovieOverview,
  showMovieOverview,
} from '../../libraries/dom/utils';
import { state } from '../../libraries/state/AppState';
import {
  toggleModal,
  setError,
  setGenres,
} from '../../libraries/state/actions';
import { fetchGenres } from '../../services/fetchGenres';
import { fetchWhenScrollToBottom } from './ui-effects/fetchWhenScrollToBottom';
import { fetchNowPlayingInitial } from './ui-effects/initialFetch';

window.onload = async () => {
  fetchGenres()
    .then((data) => {
      setGenres(data);
      fetchNowPlayingInitial();
    })
    .catch((error) => {
      console.error(error);
      setError('Something went wrong while fetching the genres');
    });
};

export async function moveList() {
  state.subscribe((newState) => {
    const app = document.getElementById('app');

    if (newState.query?.length && !newState.moviesInView?.length) {
      const element = new DomElement('div');
      element
        .setAttribute('id', 'movie-not-found')
        .setInnerHtml(':( We could not find a movie that matches this search');

      return app?.append(element.current);
    }

    const elements = (newState.moviesInView || []).map((item: any) => {
      const movieDetailsElement = new DomElement('div');

      const releaseDate = new Date(item.release_date);
      const year = releaseDate.getFullYear();

      movieDetailsElement.setInnerHtml(`
        <div class="movie-details">
          <hr></hr>
          <div>
            <span>${item.vote_average.toFixed(1)}☆</span>
            <span>${year}</span>
          </div>
        </div>
      `);

      const movieOverviewElement = new DomElement('div');

      const genres =
        newState.genres.length > 0
          ? newState.genres
              .filter(({ id }: { id: number }) => item.genre_ids.includes(id))
              .map((genre: any) => genre.name)
              .join(', ')
          : '';

      movieOverviewElement.setInnerHtml(`
        <div class="movie-overview display-none" id="overview-${item.id}">
         ${item.overview}
         <hr></hr>
         ${genres}
        </div>
      `);

      const element = new DomElement('div');
      element
        .setInnerHtml(item.title)
        .setAttribute('id', item.id)
        .setAttribute('class', 'movie-card')
        .setAttribute(
          'style',
          `background-image:${
            item.poster_path
              ? `url(https://image.tmdb.org/t/p/w500${item.poster_path})`
              : 'url(https://nogalss.org/admin/assets/images/no-image2.png)'
          }`
        )
        .on('click', () => {
          toggleModal(item);
        })
        .on('mouseenter', () => {
          showMovieOverview(item.id);
        })
        .on('mouseleave', () => {
          hideMovieOverview(item.id);
        })
        .appendElement(movieDetailsElement.current)
        .appendElement(movieOverviewElement.current);

      return element.current;
    });

    elements.forEach((el: HTMLElement) => app?.append(el));

    fetchWhenScrollToBottom();
  });
}
