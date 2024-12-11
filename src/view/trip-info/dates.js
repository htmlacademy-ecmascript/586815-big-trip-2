import { createElement } from '../../render.js';

function createDatesTemplate() {
  return `
  <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
  `;
}

export default class TripInfoDates {
  getTemplate() {
    return createDatesTemplate();
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
