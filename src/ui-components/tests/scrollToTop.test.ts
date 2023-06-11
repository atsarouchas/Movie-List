const hideScrollToTopMock = jest.fn();
const showScrollToTopMock = jest.fn();

jest.mock('../../libraries/dom', () => ({
  hideScrollToTop: hideScrollToTopMock,
  showScrollToTop: showScrollToTopMock,
}));

import { scrollToTop } from '../scrollToTop';

describe('scrollToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should scroll to top when "scroll-to-top" element is clicked', () => {
    const scrollToMock = jest.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });

    const scrollToTopElement = document.createElement('div');
    scrollToTopElement.id = 'scroll-to-top';
    document.body.appendChild(scrollToTopElement);

    scrollToTop();

    const clickEvent = new MouseEvent('click');
    scrollToTopElement.dispatchEvent(clickEvent);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    document.body.removeChild(scrollToTopElement);
    scrollToMock.mockRestore();
  });

  it('should show "scroll-to-top" element when pageYOffset is greater than 2000', () => {
    window.pageYOffset = 2500;
    scrollToTop();

    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    expect(showScrollToTopMock).toHaveBeenCalled();
    expect(hideScrollToTopMock).not.toHaveBeenCalled();
  });

  it('should hide "scroll-to-top" element when pageYOffset is less than or equal to 2000', () => {
    window.pageYOffset = 1500;
    scrollToTop();

    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    expect(showScrollToTopMock).not.toHaveBeenCalled();
    expect(hideScrollToTopMock).toHaveBeenCalled();
  });
});
