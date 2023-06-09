import { DomElement } from '../DomElement';

describe('DomElement', () => {
  let domElement: DomElement;
  let mockChildElement: HTMLElement;

  beforeEach(() => {
    domElement = new DomElement('div');
    mockChildElement = document.createElement('span');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('on method adds event listener to the element', () => {
    const mockEventHandler = jest.fn();
    domElement.on('click', mockEventHandler);
    domElement.current.dispatchEvent(new Event('click'));
    expect(mockEventHandler).toHaveBeenCalledTimes(1);
  });

  it('appendElement method appends a child element', () => {
    domElement.appendElement(mockChildElement);
    expect(domElement.current.contains(mockChildElement)).toBeTruthy();
  });

  it('setAttribute method sets an attribute on the element', () => {
    const attrName = 'data-testid';
    const attrValue = 'test-id';
    domElement.setAttribute(attrName, attrValue);
    expect(domElement.current.getAttribute(attrName)).toBe(attrValue);
  });

  it('setInnerHtml method sets the inner HTML of the element', () => {
    const innerHtml = '<p>Hello, World!</p>';
    domElement.setInnerHtml(innerHtml);
    expect(domElement.current.innerHTML).toBe(innerHtml);
  });
});
