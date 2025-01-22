export default class DestinationsModel {
  #destinations = [];

  init (destinations) {
    this.#destinations = destinations;
  }

  get destinations () {
    return this.#destinations;
  }

  getDestinationById (eventDestinationId) {
    return this.#destinations.find(({id}) => id === eventDestinationId);
  }

  getDestinationByName (destinationName) {
    return this.#destinations.find(({name}) => name === destinationName);
  }

  get destinationsNames () {
    return [...this.#destinations.map((obj) => obj.name)];
  }
}
