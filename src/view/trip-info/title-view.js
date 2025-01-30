import AbstractView from '../../framework/view/abstract-view.js';

function createTitleTemplate(destinations) {
  return `
  <h1 class="trip-info__title">${ destinations }</h1>
  `;
}

export default class TitleView extends AbstractView {
  #destinations = null;

  constructor({destinations}) {
    super();
    this.#destinations = destinations;
  }


  get template() {
    return createTitleTemplate(this.#destinations);
  }
}
