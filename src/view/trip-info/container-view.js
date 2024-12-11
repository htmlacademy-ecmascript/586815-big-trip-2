import { createElement } from '../../render.js';

function createContainerTemplate() {
  return `
  <div class="trip-info__main"></div>
  `;
}

export default class TripInfoContainer {
  getTemplate() {
    return createContainerTemplate();
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
