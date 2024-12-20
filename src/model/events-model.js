import {randomPoints} from '../mock/mocks.js';

const EVENT_COUNT = 3;

export default class eventsModel {
  #events = [];

  constructor () {
    this.#events = [];
  }

  init () {
    this.#events = randomPoints.splice(0, EVENT_COUNT);
  }

  get events() {
    return this.#events;
  }
}
