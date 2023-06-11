class DataCache {
  private cache: { [key: string]: any } = {};

  isDataInCache(url: string): any {
    if (this.cache[url]) {
      return this.cache[url];
    }

    return false;
  }

  setDataInCache(url: string, data: any) {
    this.cache[url] = data;
  }

  clearCache() {
    this.cache = {};
  }
}

export const cache = new DataCache();
