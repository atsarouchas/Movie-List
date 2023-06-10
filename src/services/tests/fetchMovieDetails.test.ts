import { fetchMovieDetails } from '../fetchMovieDetails';
import { hideLoading } from '../../libraries/dom/utils';

jest.mock('../../libraries/dom/utils', () => ({
  hideLoading: jest.fn(),
}));

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('fetchMovieDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch movie details successfully and hide loading', async () => {
    const movieDetails = [
      { videos: { results: ['result1'] } },
      { similar: { results: ['result1'] } },
      { reviews: { results: ['result1'] } },
    ];
    const response = {
      json: jest.fn().mockResolvedValue(movieDetails),
    };

    fetchMock.mockResolvedValue(response as any);

    const result = await fetchMovieDetails(1);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/1?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&append_to_response=videos,reviews,similar`
    );
    expect(response.json).toHaveBeenCalled();
    expect(result).toEqual(movieDetails);
    expect(hideLoading).toHaveBeenCalled();
  });

  test('should handle fetch error and hide loading', async () => {
    const error = new Error('Failed to fetch movie details');
    fetchMock.mockRejectedValue(error);

    await expect(fetchMovieDetails(2)).rejects.toThrow(error);
    expect(hideLoading).toHaveBeenCalled();
  });
});
