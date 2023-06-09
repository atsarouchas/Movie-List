import { hideLoading } from '../../libraries/dom/utils';
import { searchMovies } from '../searchMovies';

jest.mock('../../libraries/dom/utils', () => ({
  hideLoading: jest.fn(),
}));

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('searchMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return movie data', async () => {
    const query = 'action';
    const pageNumber = 1;
    const mockData = {
      results: [{ id: 'movie' }],
      total_pages: 10,
    };

    const response = {
      json: jest.fn().mockResolvedValue(mockData),
    };

    fetchMock.mockResolvedValue(response as any);

    const result = await searchMovies(query, pageNumber);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
    );

    expect(response.json).toHaveBeenCalled();
    expect(result).toEqual(mockData);
    expect(hideLoading).toHaveBeenCalled();
  });

  it('should hide loading even if an error occurs', async () => {
    const query = 'action';
    const pageNumber = 1;

    const error = new Error('Network error');
    fetchMock.mockRejectedValue(error);

    await expect(searchMovies(query, pageNumber)).rejects.toThrow(
      'Network error'
    );

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
    );

    expect(hideLoading).toHaveBeenCalled();
  });
});
