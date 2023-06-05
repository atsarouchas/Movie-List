import { DomElement } from '../../libraries/dom/DomElement';
import { state } from '../../libraries/state/AppState';
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

      return app?.append(element.element);
    }

    const elements = (newState.moviesInView || []).map((item: any) => {
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

    elements.forEach((el: HTMLElement) => app?.append(el));

    fetchWhenScrollToBottom();
  });
}
