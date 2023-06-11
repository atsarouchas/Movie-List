import { fetchData } from '../fetchData';
import { cache } from '../../libraries/data-cache/DataCache';
import { hideLoading } from '../../libraries/dom/utils';

jest.mock('../../libraries/data-cache/DataCache');
jest.mock('../../libraries/dom/utils');

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('fetchData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    cache.clearCache();
  });

  test('should return cached data if available', async () => {
    const url = 'https://example.com/api/data';
    const cachedData = { id: 1, name: 'Cached Data' };
    jest.spyOn(cache, 'isDataInCache').mockReturnValue(cachedData);

    const result = await fetchData(url);

    expect(cache.isDataInCache).toHaveBeenCalledWith(url);
    expect(result).toEqual(cachedData);
    expect(fetch).not.toHaveBeenCalled();
    expect(cache.setDataInCache).not.toHaveBeenCalled();
    expect(hideLoading).toHaveBeenCalled();
  });

  test('should fetch data and cache it if not available in cache', async () => {
    const url = 'https://example.com/api/data/2';
    const responseData = { id: 2, name: 'Fetched Data' };
    const response = { json: jest.fn().mockResolvedValue(responseData) };
    fetchMock.mockResolvedValue(response as any);

    const result = await fetchData(url);

    expect(cache.isDataInCache).toHaveBeenCalledWith(url);
    expect(fetchMock).toHaveBeenCalledWith(url);
    expect(response.json).toHaveBeenCalled();
    expect(cache.setDataInCache).toHaveBeenCalledWith(url, responseData);
    expect(result).toEqual(responseData);
    expect(hideLoading).toHaveBeenCalled();
  });

  test('should hide loading even if an error occurs', async () => {
    const url = 'https://example.com/api/data';
    const errorMessage = 'An error occurred';
    jest.spyOn(cache, 'isDataInCache').mockReturnValue(false);
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error(errorMessage));

    await expect(fetchData(url)).rejects.toThrow(errorMessage);
    expect(hideLoading).toHaveBeenCalled();
  });
});
