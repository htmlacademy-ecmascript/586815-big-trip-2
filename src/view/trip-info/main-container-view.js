import AbstractView from '../../framework/view/abstract-view.js';

function createMainContainerTemplate() {
  return `
  <section class="trip-main__trip-info  trip-info"></section>
  `;
}

export default class TripInfoMainContainer extends AbstractView {
  get template() {
    return createMainContainerTemplate();
  }
}
