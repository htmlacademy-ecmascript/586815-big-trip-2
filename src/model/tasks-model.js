import {randomPoints, destinations, offersList} from '../mock/tasks.js';

const TASK_COUNT = 3;

const getOffersOfType = (point) => offersList.find((item) => item.type === point.type).offers;

const getCurrentOffers = (offers, point) => offers.filter((offer) => point.offers.includes(offer.id));

const destinationNames = [...destinations.map((obj) => obj.name)];

const normalize = (array) => array.map((point)=> ({
  ...point,
  destination: destinations.find(({id}) => id === point.destination),
  offers: getCurrentOffers(getOffersOfType(point), point)
}));

export default class TasksModel {
  points = normalize(randomPoints).splice(0, TASK_COUNT);

  getTasks() {
    return this.points;
  }
}

export { getOffersOfType, destinationNames };
