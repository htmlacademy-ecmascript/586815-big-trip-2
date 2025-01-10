import { offersList } from '../mock/mocks.js';


export default class OffersModel {
  #offers = [];

  constructor () {
    this.#offers = [];
  }

  init () {
    this.#offers = offersList;
  }

  getDestinations () {
    return this.#offers;
  }

  getOffersByType (eventType) {
    return this.#offers.find(({type}) => type === eventType);
  }

  getCurrentOffers (offersByType, point) {
    return offersByType.offers.filter((offer) => point.offers.includes(offer.id));
  }
}
