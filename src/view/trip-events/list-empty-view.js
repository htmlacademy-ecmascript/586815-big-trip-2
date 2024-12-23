import AbstractView from '../../framework/view/abstract-view.js';
import { currentFilter } from '../../mock/mocks.js';

function createListEmptyMessageTemplate (message) {
  return `
<p class="trip-events__msg">${message}</p>
`;
}

export default class ListEmptyMessageView extends AbstractView {
  #message = null;

  constructor ({message}) {
    super();
    this.#message = message[currentFilter.toUpperCase()];
  }

  get template() {
    return createListEmptyMessageTemplate(this.#message);
  }
}
