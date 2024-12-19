import TripSort from '../view/trip-sort-view.js';
import { render } from '../framework/render.js';

export default class TripSortPresenter {
  #container = null;
  #sortComponent = new TripSort();

  constructor({container}) {
    this.#container = container;
  }

  init() {
    render(this.#sortComponent, this.#container);
  }
}

