import { cache } from './DataCache';

describe('DataCache', () => {
  beforeEach(() => {
    cache.clearCache();
  });
  test('isDataInCache returns cached data if available', () => {
    const url = '/data';
    const data = { id: 1, name: 'John Doe' };

    cache.setDataInCache(url, data);

    const result = cache.isDataInCache(url);

    expect(result).toEqual(data);
  });

  test('isDataInCache returns false if data is not in cache', () => {
    const url = '/data';

    const result = cache.isDataInCache(url);

    expect(result).toBe(false);
  });

  test('setDataInCache stores data in the cache', () => {
    const url = '/data';
    const data = { id: 1, name: 'John Doe' };

    cache.setDataInCache(url, data);

    const result = cache.isDataInCache(url);

    expect(result).toEqual(data);
  });
});
