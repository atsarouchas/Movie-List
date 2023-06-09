import { fetchGenres } from '../fetchGenres';
import { hideLoading } from '../../libraries/dom/utils';

jest.mock('../../libraries/dom/utils', () => ({
  hideLoading: jest.fn(),
}));

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('fetchGenres', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch genres successfully and hide loading', async () => {
    const genres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
    ];
    const response = {
      json: jest.fn().mockResolvedValue(genres),
    };

    fetchMock.mockResolvedValue(response as any);

    const result = await fetchGenres();

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
    );
    expect(response.json).toHaveBeenCalled();
    expect(result).toEqual(genres);
    expect(hideLoading).toHaveBeenCalled();
  });

  test('should handle fetch error and hide loading', async () => {
    const error = new Error('Failed to fetch genres');
    fetchMock.mockRejectedValue(error);

    await expect(fetchGenres()).rejects.toThrow(error);
    expect(hideLoading).toHaveBeenCalled();
  });
});
