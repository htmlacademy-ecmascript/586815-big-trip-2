import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class MainApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  #adaptPointToServer(point) {
    const { id, destination, offers, type, basePrice, dateFrom, dateTo, isFavorite } = point;
    const adaptedPoint = {
      id,
      destination,
      offers,
      type,
      'base_price': basePrice,
      'date_from': dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'is_favorite': isFavorite,
    };

    return adaptedPoint;
  }

  static fetchAllData(apiServiceInstance) {
    return Promise.all([
      apiServiceInstance.points,
      apiServiceInstance.destinations,
      apiServiceInstance.offers
    ]).then(([points, destinations, offers]) => ({
      points,
      destinations,
      offers
    }));
  }
}
