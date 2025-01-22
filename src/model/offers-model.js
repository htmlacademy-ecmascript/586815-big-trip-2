export default class OffersModel {
  #offers = [];

  init(offers) {
    this.#offers = offers;
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
