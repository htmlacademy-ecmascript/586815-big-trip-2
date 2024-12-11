import { createElement } from '../../render.js';

function createMainContainerTemplate() {
  return `
  <section class="trip-main__trip-info  trip-info"></section>
  `;
}

export default class TripInfoMainContainer {
  getTemplate() {
    return createMainContainerTemplate();
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
