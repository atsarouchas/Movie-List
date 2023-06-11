import { state } from '../AppState';
import {
  setInitialNowPlayingMovies,
  setMovies,
  setError,
  toggleModal,
  setSearchMovies,
  setGenres,
} from '../actions';

describe('AppState actions', () => {
  beforeEach(() => {
    state.setState({});
  });

  test('setInitialNowPlayingMovies should update the state correctly', () => {
    const data = {
      results: [{ id: 'movie1' }, { id: 'movie2' }],
      page: 1,
      total_pages: 5,
      dates: {
        minimum: new Date('2-2-2023'),
        maximum: new Date('3-2-2023'),
      },
      total_results: 2,
    };

    setInitialNowPlayingMovies(data);

    const currentState = state.getState();
    expect(currentState.moviesInView).toEqual(data.results);
    expect(currentState.currentPage).toBe(1);
    expect(currentState.query).toBeNull();
    expect(currentState.pagesInView).toEqual([1]);
    expect(currentState.totalPages).toBe(5);
  });

  test('setMovies should update the state correctly', () => {
    const data = {
      results: [{ id: 'movie1' }, { id: 'movie2' }],
      page: 1,
      total_pages: 5,
      dates: {
        minimum: new Date('2-2-2023'),
        maximum: new Date('3-2-2023'),
      },
      total_results: 2,
    };

    setMovies(data);

    const currentState = state.getState();
    expect(currentState.moviesInView).toEqual(data.results);
    expect(currentState.pagesInView).toContain(data.page);
    expect(currentState.currentPage).toBe(data.page);
    expect(currentState.totalPages).toBe(5);
  });

  test('setError should update the state correctly', () => {
    const errorText = 'An error occurred';

    setError(errorText);

    const currentState = state.getState();
    expect(currentState.moviesInView).toEqual([]);
    expect(currentState.error).toBe(errorText);
  });

  test('toggleModal should update the state correctly', () => {
    const movie = {
      id: 1,
      title: 'Movie Title',
      poster_path: 'url',
      overview: 'overview',
      genre_ids: [1, 2],
      vote_average: 5,
      release_date: new Date('1-1-2023'),
    };

    toggleModal(movie);

    const currentState = state.getState();
    expect(currentState.modalOpen).toBe(movie.id);
    expect(currentState.modalData.title).toBe(movie.title);
  });

  test('setSearchMovies should update the state correctly', () => {
    const data = {
      results: [{ id: 'movie1' }, { id: 'movie2' }],
      page: 1,
      total_pages: 5,
      dates: {
        minimum: new Date('2-2-2023'),
        maximum: new Date('3-2-2023'),
      },
      total_results: 2,
    };
    const query = 'search query';

    setSearchMovies(data, query);

    const currentState = state.getState();
    expect(currentState.moviesInView).toEqual(data.results);
    expect(currentState.query).toBe(query);
    expect(currentState.pagesInView).toEqual([data.page]);
    expect(currentState.currentPage).toBe(data.page);
    expect(currentState.totalPages).toBe(5);
  });

  test('setGenres should update the state correctly', () => {
    const data = {
      genres: [
        { id: 1, name: 'Genre 1' },
        { id: 2, name: 'Genre 2' },
      ],
    };

    setGenres(data);

    const currentState = state.getState();
    expect(currentState.genres).toEqual(data.genres);
  });
});
