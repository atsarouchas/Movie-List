import { searchMovies } from '../searchMovies';
import { fetchData } from '../fetchData';

jest.mock('../fetchData');
global.process = {
  env: {
    MOVIE_DB_API_KEY: 'mock_api_key',
  },
} as unknown as NodeJS.Process;

describe('searchMovies', () => {
  it('should call fetchData with the correct URL', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const expectedUrl = `https://api.themoviedb.org/3/search/movie?api_key=mock_api_key&language=en-US&query=lord&page=1&include_adult=false`;

    await searchMovies('lord', 1);

    expect(mockedFetchData).toHaveBeenCalledWith(expectedUrl);
  });

  it('should return the data returned by fetchData', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const mockData = {
      results: [{ id: 'movie' }],
      total_pages: 10,
    };

    mockedFetchData.mockResolvedValue(mockData);

    const result = await searchMovies('lord', 2);

    expect(result).toEqual(mockData);
  });
});
