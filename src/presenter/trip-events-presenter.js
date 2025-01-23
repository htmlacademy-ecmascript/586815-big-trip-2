import TripSort from '../view/trip-sort-view.js';
import EventList from '../view/trip-events/list-view.js';
import { render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import ListEmptyMessageView from '../view/trip-events/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { SortType, FilterType } from '../const.js';
import { sortEventsByPrice, sortEventsByTime, sortEventsByDay } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import { newEventPointData } from '../const.js';

export default class TripEventsPresenter {
  #container = null;
  #sortComponent = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventListComponent = new EventList();
  #loadingComponent = new LoadingView();
  #eventsData = [];
  #presentersPoints = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #filterModel = null;
  #noEventComponent = null;
  #newEventPresenter = null;
  #isLoading = true;

  constructor({container, eventsModel, destinationsModel, offersModel, filterModel, onNewEventDestroy}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventListComponent,
      newEventPointData,
      destinationsModel,
      offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    remove(this.#sortComponent);
    this.#eventsData = this.events;
    this.#renderEvents();
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortEventsByDay);
      case SortType.TIME:
        return filteredEvents.sort(sortEventsByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
    }

    return filteredEvents;
  }

  #renderEvents() {
    this.#eventsData = this.events;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#eventsData.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#container);
    for (let i = 0; i < this.#eventsData.length; i++) {
      const eventPresenter = new EventPresenter({
        container: this.#eventListComponent,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        eventData: this.#eventsData[i],
        onDataChange: this.#handleViewAction,
        onPointStateChange: this.#handlePointStateChange});
      this.#presentersPoints.set(this.#eventsData[i].id, eventPresenter);
      eventPresenter.init(this.#eventsData[i]);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderNoEvents () {
    this.#noEventComponent = new ListEmptyMessageView({
      filterType: this.#filterType
    });
    render(this.#noEventComponent, this.#container);
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if(this.#eventsData.length === 0) {
      remove(this.#noEventComponent);
      this.#renderSort();
      render(this.#eventListComponent, this.#container);
    }

    this.#newEventPresenter.init();
  }

  #clearEvents () {
    this.#presentersPoints.forEach((presenter) => presenter.destroy());
    this.#presentersPoints.clear();
    remove(this.#sortComponent);
    remove(this.#eventListComponent);
    remove(this.#loadingComponent);
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#presentersPoints.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEvents();
        break;
    }
  };

  #handlePointStateChange = () => {
    this.#newEventPresenter.destroy();
    this.#presentersPoints.forEach((presenterPoint) => presenterPoint.resetLastEditForm());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#eventsData = this.events;
    this.#clearEvents();
    remove(this.#eventListComponent);
    this.#renderEvents();
  };

  #renderSort() {
    this.#sortComponent = new TripSort({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#container);
  }
}
