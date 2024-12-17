import EventList from '../view/trip-events/list-view.js';
import EventItem from '../view/trip-events/item-view.js';
import EventPoint from '../view/trip-events/event-point-view.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
import { render } from '../render.js';

export default class TripEventsPresentor {
  eventListComponent = new EventList();
  eventItem = new EventItem();

  constructor({container, eventsModel, destinationsModel, offersModel}) {
    this.container = container;
    this.eventsModel = eventsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.eventTasks = [...this.eventsModel.getEvents()];
    render(this.eventListComponent, this.container);
    for (let i = 0; i < this.eventTasks.length; i++) {
      const offersOfType = this.offersModel.getOffersByType(this.eventTasks[i].type);
      const selectedOffers = this.offersModel.getCurrentOffers(offersOfType, this.eventTasks[i]);
      const destination = this.destinationsModel.getDestinationById(this.eventTasks[i].destination);
      const destinationsNames = this.destinationsModel.getDestinationsNames();

      const renderingContent = i === 0 ? new EditablePoint({event: this.eventTasks[i], destination: destination, destinationsNames: destinationsNames, offersOfType: offersOfType}) : new EventPoint({event: this.eventTasks[i], cityName: destination.name, selectedOffers: selectedOffers});

      render(renderingContent, this.eventListComponent.getElement());
    }
  }
}
