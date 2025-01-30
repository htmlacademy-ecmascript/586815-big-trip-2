import AbstractView from '../../framework/view/abstract-view.js';

function createDatesTemplate(period) {
  return `
  <p class="trip-info__dates">${ period }</p>
  `;
}

export default class DatesView extends AbstractView {
  #period = null;

  constructor({ period }) {
    super();
    this.#period = period;
  }

  get template() {
    return createDatesTemplate(this.#period);
  }
}
