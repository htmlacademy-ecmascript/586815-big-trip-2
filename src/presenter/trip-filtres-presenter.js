import TripFiltres from '../view/trip-filtres-view.js';
import { render } from '../framework/render.js';

export default class TripFiltresPresenter {
  #container = null;
  #filtresComponent = new TripFiltres();

  constructor({container}) {
    this.#container = container;
  }

  init() {
    render(this.#filtresComponent, this.#container);
  }
}
