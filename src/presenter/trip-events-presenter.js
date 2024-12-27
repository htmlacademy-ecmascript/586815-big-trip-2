import TripSort from '../view/trip-sort-view.js';
import EventList from '../view/trip-events/list-view.js';
import EventItem from '../view/trip-events/item-view.js';
import { render, remove } from '../framework/render.js';
import { MessageListEmpty } from '../const.js';
import ListEmptyMessageView from '../view/trip-events/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortEventsByPrice, sortEventsByTime, sortEventsByDay } from '../utils/sort.js';

export default class TripEventsPresenter {
  #container = null;
  #sortComponent = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventListComponent = new EventList();
  #eventItem = null;
  #eventsData = [];
  #presentersPoints = new Map();
  #currentSortType = SortType.DAY;
  #sourceEventsData = [];

  constructor({container, eventsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

  }

  init() {
    this.#eventsData = [...this.#eventsModel.events];
    this.#sourceEventsData = [...this.#eventsModel.events];

    this.#eventsData.sort(sortEventsByDay);

    if(this.#eventsData.length === 0) {
      render(new ListEmptyMessageView({message: MessageListEmpty}), this.#container);
    }
    this.#renderSort();
    this.#renderEvents();
  }

  #renderEvents() {
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
    this.#sourceEventsData = updateItem(this.#sourceEventsData, updatedEvent);
    this.#presentersPoints.get(updatedEvent.id).updateEventData(updatedEvent);
  };

  #handlePointStateChange = () => {
    this.#presentersPoints.forEach((presenterPoint) => presenterPoint.resetLastEditForm());
  };

  #sortEvents (sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#eventsData.sort(sortEventsByDay);
        break;
      case SortType.TIME:
        this.#eventsData.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this.#eventsData.sort(sortEventsByPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    remove(this.#eventListComponent);
    this.#renderEvents();
  };

  #renderSort() {
    this.#sortComponent = new TripSort({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container);
  }
}
