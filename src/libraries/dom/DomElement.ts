export class DomElement {
  current: HTMLElement;

  constructor(type: string) {
    const createdElement = document.createElement(type);
    this.current = createdElement;
  }

  on(eventName: string, eventHandler: () => void) {
    this.current.addEventListener(eventName, eventHandler);
    return this;
  }

  appendElement(childElement: HTMLElement) {
    this.current.append(childElement);
    return this;
  }

  setAttribute(attrName: string, attrValue: any) {
    this.current.setAttribute(attrName, attrValue);
    return this;
  }

  setInnerHtml(innerHtml: string) {
    this.current.innerHTML = innerHtml;
    return this;
  }
}
