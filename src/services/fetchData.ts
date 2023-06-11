import { cache } from '../libraries/data-cache/DataCache';
import { hideLoading } from '../libraries/dom/utils';

export const fetchData = async (url: string): Promise<any> => {
  const cachedData = cache.isDataInCache(url);
  try {
    if (cachedData) {
      return Promise.resolve(cachedData);
    }

    const response = await fetch(url);
    const data = await response.json();
    cache.setDataInCache(url, data);

    return data;
  } finally {
    hideLoading();
  }
};
