import { fetchMovieDetails } from '../fetchMovieDetails';
import { fetchData } from '../fetchData';

jest.mock('../fetchData');
global.process = {
  env: {
    MOVIE_DB_API_KEY: 'mock_api_key',
  },
} as unknown as NodeJS.Process;

describe('fetchMovieDetails', () => {
  it('should call fetchData with the correct URL', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const expectedUrl = `https://api.themoviedb.org/3/movie/11?api_key=mock_api_key&language=en-US&append_to_response=videos,reviews,similar`;

    await fetchMovieDetails(11);

    expect(mockedFetchData).toHaveBeenCalledWith(expectedUrl);
  });

  it('should return the data returned by fetchData', async () => {
    const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
    const mockData = [
      { videos: { results: ['result1'] } },
      { similar: { results: ['result1'] } },
      { reviews: { results: ['result1'] } },
    ];
    mockedFetchData.mockResolvedValue(mockData);

    const result = await fetchMovieDetails(12);

    expect(result).toEqual(mockData);
  });
});
