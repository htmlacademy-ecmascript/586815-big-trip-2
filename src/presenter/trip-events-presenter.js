import EventList from '../view/trip-events/list-view.js';
import EventItem from '../view/trip-events/item-view.js';
import EventPoint from '../view/trip-events/event-point-view.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
import { render, replace } from '../framework/render.js';

export default class TripEventsPresenter {
  #container = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventListComponent = new EventList();
  #eventItem = null;
  #eventTasks = [];

  constructor({container, eventsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventTasks = [...this.#eventsModel.events];
    render(this.#eventListComponent, this.#container);
    for (let i = 0; i < this.#eventTasks.length; i++) {
      this.#eventItem = new EventItem();
      render(this.#eventItem, this.#eventListComponent.element);
      const offersByType = this.#offersModel.getOffersByType(this.#eventTasks[i].type);
      const pointInfo = {
        offersByType: offersByType,
        selectedOffers: this.#offersModel.getCurrentOffers(offersByType, this.#eventTasks[i]),
        destination: this.#destinationsModel.getDestinationById(this.#eventTasks[i].destination),
        destinationsNames: this.#destinationsModel.destinationsNames,
      };
      this.#renderEvent(this.#eventTasks[i], pointInfo);
    }
  }

  #renderEvent (event, info) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventPointComponent = new EventPoint({
      event: event,
      selectedOffers: info.selectedOffers,
      cityName: info.destination.name,
      onArrowClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const EditablePointComponent = new EditablePoint({
      event: event,
      destination: info.destination,
      destinationsNames: info.destinationsNames,
      offersByType: info.offersByType,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseButtonClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(EditablePointComponent, eventPointComponent);
    }
    function replaceFormToPoint() {
      replace(eventPointComponent, EditablePointComponent);
    }

    render(eventPointComponent, this.#eventItem.element);
  }
}

// const offersOfType = this.#offersModel.getOffersByType(this.#eventTasks[i].type);
// const selectedOffers = this.#offersModel.getCurrentOffers(offersOfType, this.#eventTasks[i]);
// const destination = this.#destinationsModel.getDestinationById(this.#eventTasks[i].destination);
// const destinationsNames = this.#destinationsModel.destinationsNames;
// // i === 0 ? new EditablePoint({event: this.eventTasks[i], destination: destination, destinationsNames: destinationsNames, offersOfType: offersOfType}) :
// const renderingContent = new EventPoint({event: this.#eventTasks[i], cityName: destination.name, selectedOffers: selectedOffers});
