import { DomElement } from '../../libraries/dom/DomElement';
import { state } from '../../libraries/state/AppState';
import { openModal } from '../../libraries/state/actions';
import { fetchWhenScrollToBottom } from './ui-effects/fetchWhenScrollToBottom';
import { initialFetch } from './ui-effects/initialFetch';

window.onload = async () => {
  initialFetch();
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
          openModal(item);
        })
        .on('mouseenter', () => {
          console.log('enters', item.id);
        })
        .on('mouseleave', () => {
          console.log(item.id);
        })
        .appendElement(movieDetailsElement.current);

      return element.current;
    });

    elements.forEach((el: HTMLElement) => app?.append(el));

    fetchWhenScrollToBottom();
  });
}
