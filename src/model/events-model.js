import {randomPoints} from '../mock/mocks.js';
import Observable from '../framework/observable.js';
import { calculateDuration } from '../utils/common.js';

const EVENT_COUNT = 3;

export default class eventsModel extends Observable {
  #events = [];

  constructor () {
    super();
    this.#events = this.#addDurationToEvents(randomPoints.splice(0, EVENT_COUNT));
  }

  get events() {
    return this.#events;
  }

  #addDurationToEvents(events) {
    return events.map((event) => ({
      ...event,
      duration: calculateDuration(event.dateFrom, event.dateTo)
    }));
  }

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }
    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
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
