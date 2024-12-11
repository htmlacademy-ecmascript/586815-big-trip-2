import { createElement } from '../../render.js';

function createItemTemplate() {
  return `
  <li class="trip-events__item"></li>
  `;
}

export default class EventItem {
  getTemplate() {
    return createItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
