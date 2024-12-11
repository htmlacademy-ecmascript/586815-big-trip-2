import { createElement } from '../../render.js';

function createTitleTemplate() {
  return `
  <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
  `;
}

export default class TripInfoTitle {
  getTemplate() {
    return createTitleTemplate();
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
