import Observable from '../framework/observable.js';
import { calculateDuration } from '../utils/common.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #events = [];
  #mainApiService = null;

  constructor({mainApiService}) {
    super();
    this.#mainApiService = mainApiService;
  }

  get events() {
    return this.#addDurationToEvents(this.#events);
  }

  init(events) {
    this.#events = this.#addDurationToEvents(events.map(this.#adaptToClient));

    this._notify(UpdateType.INIT);
  }

  #adaptToClient(event) {
    const adaptedPoint = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'] ,
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite'],
    };

    const adaptedEvent = {
      ...adaptedPoint,
      duration: calculateDuration(adaptedPoint.dateFrom, adaptedPoint.dateTo),
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    return adaptedEvent;
  }

  #addDurationToEvents(events) {
    return events.map((event) => ({
      ...event,
      duration: calculateDuration(event.dateFrom, event.dateTo)
    }));
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#mainApiService.updatePoint(update);
      const updatedEvent = this.#adaptToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#mainApiService.addPoint(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#mainApiService.deletePoint(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }
}
