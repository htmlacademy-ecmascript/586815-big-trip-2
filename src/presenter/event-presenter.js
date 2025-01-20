import EventPoint from '../view/trip-events/event-point-view.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey, getUpdateType } from '../utils/common.js';
import {UserAction, UpdateType} from '../const.js';

export default class EventPresenter {
  #container = null;
  #offersModel = [];
  #destinationsModel = [];
  #eventData = {};
  #eventPointComponent = null;
  #editablePointComponent = null;
  #handleDataChange = null;
  #onPointStateChange = null;
  #isOpenEditForm = false;

  constructor({container, destinationsModel, offersModel,eventData, onDataChange, onPointStateChange}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventData = eventData;
    this.#handleDataChange = onDataChange;
    this.#onPointStateChange = onPointStateChange;
  }

  init(eventData) {
    const offersByType = this.#offersModel.getOffersByType(eventData.type);
    //От pointInfo буду избавляться
    const pointInfo = {
      selectedOffers: this.#offersModel.getCurrentOffers(offersByType, eventData),
      destination: this.#destinationsModel.getDestinationById(eventData.destination),
    };

    this.#renderEvent(eventData, pointInfo);
  }

  #renderEvent (event, info) {

    this.#eventPointComponent = new EventPoint({
      event: event,
      selectedOffers: info.selectedOffers,
      cityName: info.destination.name,
      onOpenButtonClick: this.#openButtonClickHandler,
      onFavoriteButtonClick: this.#toggleFavoriteStatus
    });

    this.#editablePointComponent = new EditablePoint({
      event: event,
      allOffers: this.#offersModel,
      allDestinations: this.#destinationsModel,
      onFormSubmit: this.#formSubmitHandler,
      onCloseButtonClick: this.#closeButtonClickHandler,
      onDeleteClick: this.#handleDeleteClick
    });

    if (this.#isOpenEditForm) {
      render(this.#editablePointComponent, this.#container.element);
    }

    render(this.#eventPointComponent, this.#container.element);
  }

  #openEditForm () {
    this.#onPointStateChange();
    this.#isOpenEditForm = true;
    replace(this.#editablePointComponent, this.#eventPointComponent);
  }

  #closeEditForm () {
    this.#editablePointComponent.reset();
    this.#isOpenEditForm = false;
    replace(this.#eventPointComponent, this.#editablePointComponent);
  }

  #toggleFavoriteStatus = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {...this.#eventData, isFavorite: !this.#eventData.isFavorite},
    );
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closeEditForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #openButtonClickHandler = () => {
    this.#openEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #formSubmitHandler = (updatedEvent) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      getUpdateType(updatedEvent, this.#eventData) ? UpdateType.MINOR : UpdateType.PATCH,
      updatedEvent,
    );
    this.#closeEditForm();
  };

  #closeButtonClickHandler = () => {
    this.#closeEditForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  resetLastEditForm () {
    if (this.#isOpenEditForm) {
      this.#closeEditForm();
    }
  }

  destroy() {
    remove(this.#eventPointComponent);
    remove(this.#editablePointComponent);
  }

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };
}
