import { destinations } from '../mock/mocks.js';


export default class DestinationsModel {
  constructor () {
    this.destinations = [];
  }

  init () {
    this.destinations = destinations;
  }

  getDestinations () {
    return this.destinations;
  }

  getDestinationById (eventDestination) {
    return this.destinations.find(({id}) => id === eventDestination);
  }

  getDestinationsNames () {
    return [...this.destinations.map((obj) => obj.name)];
  }
}
