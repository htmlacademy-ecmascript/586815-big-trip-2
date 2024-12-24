import TripSort from '../view/trip-sort-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class TripSortPresenter {
  #container = null;
  #sortComponent = new TripSort();

  constructor({container}) {
    this.#container = container;
  }

  init() {
    if (!this.#container.querySelector('.trip-events__msg')) {
      render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    }
  }
}

