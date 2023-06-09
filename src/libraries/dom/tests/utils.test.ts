import {
  showLoading,
  hideLoading,
  showEndOfResults,
  hideEndOfResults,
  showError,
  hideError,
  showScrollToTop,
  hideScrollToTop,
  showMovieOverview,
  hideMovieOverview,
  showModal,
  hideModal,
} from '../utils';

describe('DOM utils', () => {
  let getElementByIdSpy: jest.SpyInstance;
  let querySelectorSpy: jest.SpyInstance;
  let appendSpy: jest.SpyInstance;
  let removeChildSpy: jest.SpyInstance;
  let classListMock: Partial<DOMTokenList>;

  beforeEach(() => {
    getElementByIdSpy = jest.spyOn(document, 'getElementById');
    querySelectorSpy = jest.spyOn(document, 'querySelector');
    appendSpy = jest.spyOn(window.HTMLElement.prototype, 'append');
    removeChildSpy = jest.spyOn(window.HTMLElement.prototype, 'removeChild');
    classListMock = {
      remove: jest.fn(),
      add: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('showLoading should remove "display-none" class from loading container element', () => {
    getElementByIdSpy.mockReturnValueOnce({
      classList: classListMock,
    } as any);

    showLoading();

    expect(getElementByIdSpy).toHaveBeenCalledWith('loading-container');
    expect(classListMock.remove).toHaveBeenCalledWith('display-none');
  });

  test('hideLoading should add "display-none" class to loading container element', () => {
    getElementByIdSpy.mockReturnValueOnce({
      classList: classListMock,
    } as any);

    hideLoading();

    expect(getElementByIdSpy).toHaveBeenCalledWith('loading-container');
    expect(classListMock.add).toHaveBeenCalledWith('display-none');
  });

  test('showEndOfResults should remove "display-none" class from end of results element', () => {
    getElementByIdSpy.mockReturnValueOnce({
      classList: classListMock,
    } as any);

    showEndOfResults();

    expect(getElementByIdSpy).toHaveBeenCalledWith('end-of-results');
    expect(classListMock.remove).toHaveBeenCalledWith('display-none');
  });

  test('hideEndOfResults should add "display-none" class to end of results element', () => {
    getElementByIdSpy.mockReturnValueOnce({
      classList: classListMock,
    } as any);

    hideEndOfResults();

    expect(getElementByIdSpy).toHaveBeenCalledWith('end-of-results');
    expect(classListMock.add).toHaveBeenCalledWith('display-none');
  });

  // Write similar tests for other functions...
});