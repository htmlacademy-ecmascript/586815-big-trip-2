import {randomPoints} from '../mock/mocks.js';

const EVENT_COUNT = 3;

export default class eventsModel {
  constructor () {
    this.events = [];
  }

  init () {
    this.events = randomPoints.splice(0, EVENT_COUNT);
  }

  getEvents() {
    return this.events;
  }
}
