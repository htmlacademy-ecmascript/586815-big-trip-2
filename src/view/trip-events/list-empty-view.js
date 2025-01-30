import AbstractView from '../../framework/view/abstract-view.js';
import { MessageListEmpty } from '../../const.js';

function createListEmptyTemplate (filterType) {
  return `
<p class="trip-events__msg">${filterType !== null ? MessageListEmpty[filterType] : MessageListEmpty.messageError}</p>
`;
}

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
