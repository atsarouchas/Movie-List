import { fetchMovies } from '../fetchMovies';
import { hideLoading } from '../../libraries/dom/utils';

jest.mock('../../libraries/dom/utils', () => ({
  hideLoading: jest.fn(),
}));

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('fetchMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch movies successfully and hide loading', async () => {
    const movies = [
      { id: 1, title: 'Movie1' },
      { id: 2, title: 'Movie2' },
    ];
    const response = {
      json: jest.fn().mockResolvedValue(movies),
    };

    fetchMock.mockResolvedValue(response as any);

    const result = await fetchMovies(1);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`
    );
    expect(response.json).toHaveBeenCalled();
    expect(result).toEqual(movies);
    expect(hideLoading).toHaveBeenCalled();
  });

  test('should handle fetch error and hide loading', async () => {
    const error = new Error('Failed to fetch movies');
    fetchMock.mockRejectedValue(error);

    await expect(fetchMovies(2)).rejects.toThrow(error);
    expect(hideLoading).toHaveBeenCalled();
  });
});
