import { debounce } from './debounce';

describe('utils', () => {
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should call the callback after the specified timeout', () => {
      const callback = jest.fn();
      const debouncedCallback = debounce(callback, 500);

      debouncedCallback();
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should debounce multiple calls and execute the callback only once', () => {
      const callback = jest.fn();
      const debouncedCallback = debounce(callback, 500);

      debouncedCallback();
      debouncedCallback();
      debouncedCallback();
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should cancel and restart the debounce timer on consecutive calls', () => {
      const callback = jest.fn();
      const debouncedCallback = debounce(callback, 500);

      debouncedCallback();
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);

      debouncedCallback();
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
