import { fetchGenres } from '../fetchGenres';
import { fetchData } from '../fetchData';

jest.mock('../fetchData');
global.process = {
  env: {
    MOVIE_DB_API_KEY: 'mock_api_key',
  },
} as unknown as NodeJS.Process;

describe('fetchGenres', () => {
  test('should call fetchData with the correct URL', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const expectedUrl =
      'https://api.themoviedb.org/3/genre/movie/list?api_key=mock_api_key&language=en-US';

    await fetchGenres();

    expect(mockedFetchData).toHaveBeenCalledWith(expectedUrl);
  });

  test('should return the data returned by fetchData', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const mockData = { genres: ['Action', 'Comedy'] };
    mockedFetchData.mockResolvedValue(mockData);

    const result = await fetchGenres();

    expect(result).toEqual(mockData);
  });
});
