import { destinations } from '../mock/mocks.js';


export default class DestinationsModel {
  #destinations = [];

  constructor () {
    this.#destinations = [];
  }

  init () {
    this.#destinations = destinations;
  }

  get destinations () {
    return this.#destinations;
  }

  getDestinationById (eventDestination) {
    return this.#destinations.find(({id}) => id === eventDestination);
  }

  get destinationsNames () {
    return [...this.#destinations.map((obj) => obj.name)];
  }
}
