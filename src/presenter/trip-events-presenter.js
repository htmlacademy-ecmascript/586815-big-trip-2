import TripSort from '../view/trip-sort-view.js';
import EventList from '../view/trip-events/list-view.js';
import EventItem from '../view/trip-events/item-view.js';
import { render } from '../framework/render.js';
import { MessageListEmpty } from '../const.js';
import ListEmptyMessageView from '../view/trip-events/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/common.js';

export default class TripEventsPresenter {
  #container = null;
  #sortComponent = new TripSort();
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventListComponent = new EventList();
  #eventItem = null;
  #eventsData = [];
  #presentersPoints = new Map();

  constructor({container, eventsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

  }

  init() {
    this.#eventsData = [...this.#eventsModel.events];

    if(this.#eventsData.length === 0) {
      render(new ListEmptyMessageView({message: MessageListEmpty}), this.#container);
    }

    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#eventsData.length; i++) {
      this.#eventItem = new EventItem();
      render(this.#eventItem, this.#eventListComponent.element);
      const eventPresenter = new EventPresenter({
        container: this.#eventItem,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        eventData: this.#eventsData[i],
        onFavoriteButtonClick: this.#handleEventChange,
        onPointStateChange: this.#handlePointStateChange});
      this.#presentersPoints.set(this.#eventsData[i].id, eventPresenter);
      eventPresenter.init();
    }
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventsData = updateItem(this.#eventsData, updatedEvent);
    this.#presentersPoints.get(updatedEvent.id).updateEventData(updatedEvent);
  };

  #handlePointStateChange = () => {
    this.#presentersPoints.forEach((presenterPoint) => presenterPoint.resetLastEditForm());
  };
}
