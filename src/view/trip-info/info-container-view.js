import AbstractView from '../../framework/view/abstract-view.js';

function createContainerTemplate() {
  return `
  <div class="trip-info__main"></div>
  `;
}

export default class InfoContainerView extends AbstractView {
  get template() {
    return createContainerTemplate();
  }
}
