import TripFilters from '../view/trip-filters-view.js';
import { render } from '../framework/render.js';

export default class TripFiltersPresenter {
  #container = null;
  #filters = null;

  constructor({container, filters}) {
    this.#container = container;
    this.#filters = filters;
  }

  init() {
    render(new TripFilters({filters: this.#filters}), this.#container);
  }
}
