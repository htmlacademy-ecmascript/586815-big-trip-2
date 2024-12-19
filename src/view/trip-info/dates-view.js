import AbstractView from '../../framework/view/abstract-view.js';

function createDatesTemplate() {
  return `
  <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
  `;
}

export default class TripInfoDates extends AbstractView {
  get template() {
    return createDatesTemplate();
  }
}
