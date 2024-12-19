import AbstractView from '../../framework/view/abstract-view.js';

function createItemTemplate() {
  return `
  <li class="trip-events__item"></li>
  `;
}

export default class EventItem extends AbstractView {
  get template() {
    return createItemTemplate();
  }
}
