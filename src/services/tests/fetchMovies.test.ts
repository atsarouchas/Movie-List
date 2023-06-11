import { fetchMovies } from '../fetchMovies';
import { fetchData } from '../fetchData';

jest.mock('../fetchData');
global.process = {
  env: {
    MOVIE_DB_API_KEY: 'mock_api_key',
  },
} as unknown as NodeJS.Process;

describe('fetchMovies', () => {
  test('should call fetchData with the correct URL', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const expectedUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=mock_api_key&language=en-US&page=12`;

    await fetchMovies(12);

    expect(mockedFetchData).toHaveBeenCalledWith(expectedUrl);
  });

  test('should return the data returned by fetchData', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const mockData = [
      { id: 1, title: 'Movie1' },
      { id: 2, title: 'Movie2' },
    ];

    mockedFetchData.mockResolvedValue(mockData);

    const result = await fetchMovies(12);

    expect(result).toEqual(mockData);
  });
});
