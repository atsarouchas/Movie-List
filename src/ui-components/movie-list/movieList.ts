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
import { Movie } from '../../types';
import { createIntersectionObserver } from './ui-effects/createIntersectionObserver';
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

    const elements = (newState.moviesInView || []).map((item: Movie) => {
      const {
        id,
        release_date,
        vote_average,
        poster_path,
        genre_ids,
        overview,
        title,
      } = item;

      if (document.getElementById(`${id}`)) {
        return;
      }

      const movieDetailsElement = new DomElement('div');

      const releaseDate = new Date(release_date);
      const year = releaseDate.getFullYear();

      movieDetailsElement.setInnerHtml(`
        <div class="movie-details">
          <hr></hr>
          <div>
            ${
              !isNaN(Number(vote_average.toFixed(1)))
                ? `<span>${vote_average.toFixed(1)}☆</span>`
                : ''
            }
            ${!isNaN(year) ? `<span>${year}</span>` : ''}
          </div>
        </div>
      `);

      const movieOverviewElement = new DomElement('div');

      const genres =
        newState.genres.length > 0
          ? newState.genres
              .filter(({ id }: { id: number }) => genre_ids.includes(id))
              .map((genre: { name: string }) => genre.name)
              .join(', ')
          : '';

      movieOverviewElement.setInnerHtml(`
        <div class="movie-overview display-none" id="overview-${id}">
          ${overview}
          <hr></hr>
          ${genres}
        </div>
      `);

      const element = new DomElement('div');
      element
        .setInnerHtml(title)
        .setAttribute('id', `${id}`)
        .setAttribute('class', `movie-card${poster_path ? '' : ' no-image'}`)
        .setAttribute(
          'style',
          `background-image:${
            poster_path
              ? `url(https://image.tmdb.org/t/p/w500${poster_path})`
              : 'url(https://nogalss.org/admin/assets/images/no-image2.png)'
          }`
        )
        .setAttribute('tabIndex', '0')
        .on('click', () => {
          toggleModal(item);
        })
        .on('keydown', (event: KeyboardEvent) => {
          if (event.code === 'Enter') {
            toggleModal(item);
          }
        })
        .on('mouseenter', () => {
          showMovieOverview(id);
        })
        .on('mouseleave', () => {
          hideMovieOverview(id);
        })
        .appendElement(movieDetailsElement.current)
        .appendElement(movieOverviewElement.current);

      return element.current;
    });

    elements.forEach((element: HTMLElement) => {
      if (element) {
        app?.append(element);
      }
    });

    const lastElement = elements[elements.length - 1];

    if (lastElement) {
      createIntersectionObserver(lastElement.id);
    }
  });
}
