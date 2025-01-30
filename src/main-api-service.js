import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class MainApiService extends ApiService {
  get events() {
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
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
    return response;
  }

  #adaptToServer(point) {
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
      apiServiceInstance.events,
      apiServiceInstance.destinations,
      apiServiceInstance.offers
    ]).then(([events, destinations, offers]) => ({
      events,
      destinations,
      offers
    }));
  }
}
