import AbstractView from '../../framework/view/abstract-view.js';

function createTitleTemplate() {
  return `
  <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
  `;
}

export default class TripInfoTitle extends AbstractView {
  get template() {
    return createTitleTemplate();
  }
}
