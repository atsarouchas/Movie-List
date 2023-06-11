const hideEndOfResultsMock = jest.fn();
const hideErrorMock = jest.fn();
const showLoadingMock = jest.fn();

jest.mock('../../libraries/dom', () => ({
  hideEndOfResults: hideEndOfResultsMock,
  hideError: hideErrorMock,
  showLoading: showLoadingMock,
}));

const setSearchMoviesMock = jest.fn();
const setErrorMock = jest.fn();

jest.mock('../../libraries/state/', () => ({
  setSearchMovies: setSearchMoviesMock,
  setError: setErrorMock,
}));

const searchMoviesMock = jest.fn();

jest.mock('../../services', () => ({
  searchMovies: searchMoviesMock,
}));

const fetchNowPlayingInitialMock = jest.fn();

jest.mock('../movie-list/ui-effects/initialFetch', () => ({
  fetchNowPlayingInitial: fetchNowPlayingInitialMock,
}));

import { search } from '../search';

describe('search', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should fetch movies when search input value is not empty', async () => {
    const searchElement = document.createElement('input');
    const app = document.createElement('div');
    app.id = 'app';
    searchElement.id = 'search';

    document.body.appendChild(searchElement);
    document.body.appendChild(app);

    const mockResponse = { results: ['mocked data'] };
    const mockEvent = new Event('input');

    searchMoviesMock.mockResolvedValue(mockResponse);

    search();

    searchElement.value = 'test';
    searchElement.dispatchEvent(mockEvent);

    jest.advanceTimersByTime(1001);

    expect(hideEndOfResultsMock).toHaveBeenCalled();
    expect(hideErrorMock).toHaveBeenCalled();
    expect(showLoadingMock).toHaveBeenCalled();
    expect(searchMoviesMock).toHaveBeenCalledWith('test', 1);

    await Promise.resolve();
    expect(setSearchMoviesMock).toHaveBeenCalledWith(mockResponse, 'test');

    document.body.removeChild(searchElement);
  });

  test('should fetch initial movies when search input value is empty', () => {
    const searchElement = document.createElement('input');
    searchElement.id = 'search';
    document.body.appendChild(searchElement);

    const mockEvent = new Event('input');

    search();

    searchElement.value = '';
    searchElement.dispatchEvent(mockEvent);

    jest.advanceTimersByTime(1001);

    expect(hideEndOfResultsMock).toHaveBeenCalled();
    expect(hideErrorMock).toHaveBeenCalled();
    expect(showLoadingMock).toHaveBeenCalled();
    expect(fetchNowPlayingInitialMock).toHaveBeenCalled();

    document.body.removeChild(searchElement);
  });
});
