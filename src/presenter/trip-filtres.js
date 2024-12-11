import TripFiltres from '../view/trip-filtres.js';
import { render } from '../render.js';

export default class TripFiltresPresentor {
  filtresComponent = new TripFiltres();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.filtresComponent, this.container);
  }
}
