export class DomElement {
  element: HTMLElement;

  constructor(type: string) {
    const createdElement = document.createElement(type);
    this.element = createdElement;
  }

  on(eventName: string, eventHandler: () => void) {
    this.element.addEventListener(eventName, eventHandler);
    return this;
  }

  appendElement(childElement: HTMLElement) {
    this.element.append(childElement);
    return this;
  }

  setAttribute(attrName: string, attrValue: any) {
    this.element.setAttribute(attrName, attrValue);
    return this;
  }

  setInnerHtml(innerHtml: string) {
    this.element.innerHTML = innerHtml;
    return this;
  }
}
