const createIntersectionObserverMock = jest.fn();

jest.mock('../movie-list/ui-effects/createIntersectionObserver', () => ({
  createIntersectionObserver: createIntersectionObserverMock,
}));

import { setMovies } from '../../libraries/state';
import { movieList } from '../movie-list/movieList';

describe('movieList', () => {
  it('should render movie list', async () => {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);

    await movieList();

    setMovies({
      page: 1,
      dates: {
        maximum: new Date('1-1-2000'),
        minimum: new Date('1-1-2000'),
      },
      total_pages: 1,
      total_results: 1,
      results: [
        {
          id: 1,
          release_date: new Date('1-1-2000'),
          vote_average: 10,
          poster_path: 'url',
          genre_ids: [1, 2, 3],
          overview: 'overview',
          title: 'Movie title',
        },
        {
          id: 2,
          release_date: new Date('1-1-2002'),
          vote_average: 8,
          poster_path: null,
          genre_ids: [1, 3],
          overview: 'overview',
          title: 'Movie 2 title',
        },
      ],
    });

    const appElement = document.getElementById('app');
    const expectedHTML = `
    <div id="1" class="movie-card" style="background-image:url(https://image.tmdb.org/t/p/w500url)" tabindex="0">
      Movie title
      <div>
        <div class="movie-details">
          <hr>
          <div>
            <span>10.0☆</span>
            <span>2000</span>
          </div>
        </div>
      </div>
      <div>
        <div class="movie-overview display-none" id="overview-1">
          overview
          <hr>
        </div>
      </div>
    </div>
    <div id="2" class="movie-card no-image" style="background-image:url(https://nogalss.org/admin/assets/images/no-image2.png)" tabindex="0">
      Movie 2 title
      <div>
        <div class="movie-details">
          <hr>
          <div>
            <span>8.0☆</span>
            <span>2002</span>
          </div>
        </div>
      </div>
      <div>
        <div class="movie-overview display-none" id="overview-2">
          overview
          <hr>
      </div>
    </div>
  </div>`;

    expect(appElement?.innerHTML.replace(/\s/g, '')).toEqual(
      expectedHTML.replace(/\s/g, '')
    );
    expect(createIntersectionObserverMock).toHaveBeenCalledWith('2');
  });
});
