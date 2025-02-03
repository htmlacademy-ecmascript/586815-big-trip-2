import SortView from '../view/sort-view.js';
import ListView from '../view/trip-events/list-view.js';
import { render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import ListEmptyView from '../view/trip-events/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { SortType, FilterType } from '../const.js';
import { sortEventsByPrice, sortEventsByTime, sortEventsByDay } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import { newEventData } from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripEventsPresenter {
  #container = null;
  #sortComponent = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventListComponent = new ListView();
  #loadingComponent = new LoadingView();
  #eventsData = [];
  #presentersEvent = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #filtersModel = null;
  #noEventComponent = null;
  #newEventPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({container, eventsModel, destinationsModel, offersModel, filtersModel, onNewEventDestroy}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventListComponent,
      newEventData,
      destinationsModel,
      offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filtersModel.filter;
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

  init() {
    remove(this.#sortComponent);
    this.#eventsData = this.events;
    this.#renderEvents();
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
        onEventStateChange: this.#handleEventStateChange});
      this.#presentersEvent.set(this.#eventsData[i].id, eventPresenter);
      eventPresenter.init(this.#eventsData[i]);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderNoEvents () {
    this.#noEventComponent = new ListEmptyView({
      filterType: this.#filterType
    });
    render(this.#noEventComponent, this.#container);
  }

  renderError () {
    this.#clearEvents();
    render(new ListEmptyView({filterType: null }) ,this.#container);
  }

  createEvent() {
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if(this.#eventsData.length === 0) {
      remove(this.#noEventComponent);
      this.#renderSort();
      render(this.#eventListComponent, this.#container);
    }

    this.#newEventPresenter.init();
  }

  #clearEvents ({resetSortType = false} = {}) {
    this.#presentersEvent.forEach((presenter) => presenter.destroy());
    this.#presentersEvent.clear();
    remove(this.#sortComponent);
    remove(this.#eventListComponent);
    remove(this.#loadingComponent);
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#container);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#presentersEvent.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#presentersEvent.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
          this.#newEventPresenter.destroy();
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#presentersEvent.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch(err) {
          this.#presentersEvent.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#presentersEvent.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({resetSortType: true});
        this.#renderEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEvents();
        break;
    }
  };

  #handleEventStateChange = () => {
    this.#newEventPresenter.destroy();
    this.#presentersEvent.forEach((presenter) => presenter.resetLastEditForm());
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
}
