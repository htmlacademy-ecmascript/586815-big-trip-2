export default class DestinationsModel {
  #destinations = [];

  get destinations () {
    return this.#destinations;
  }

  get destinationsNames () {
    return [...this.#destinations.map((obj) => obj.name)];
  }

  init (destinations) {
    this.#destinations = destinations;
  }

  getDestinationById (eventDestinationId) {
    return this.#destinations.find(({id}) => id === eventDestinationId);
  }

  getDestinationByName (destinationName) {
    return this.#destinations.find(({name}) => name === destinationName);
  }

  #isCorrectDestination(value) {
    const foundDestination = this.#destinations.find(({ name }) => name === value);
    return foundDestination !== undefined;
  }

  getCurrentDestination(value) {
    if (this.#isCorrectDestination(value)){
      const destination = this.getDestinationByName(value);
      return {
        currentDestination: destination,
        id: destination.id,
      };
    }

    return {
      currentDestination: '',
      id: '',
    };
  }
}
