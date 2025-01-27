import Observable from '../framework/observable.js';
import { calculateDuration } from '../utils/common.js';
import { UpdateType } from '../const.js';

export default class eventsModel extends Observable {
  #events = [];
  #mainApiService = null;

  constructor({mainApiService}) {
    super();
    this.#mainApiService = mainApiService;
  }

  init(points) {
    this.#events = this.#addDurationToEvents(points.map(this.#adaptToClient));

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#addDurationToEvents(this.#events);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'] ,
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
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

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];
    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }
    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
