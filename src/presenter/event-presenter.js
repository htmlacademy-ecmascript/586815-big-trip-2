import EventView from '../view/trip-events/event-view.js';
import EditEventView from '../view/trip-events/edit-event-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey, getUpdateType} from '../utils/common.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #container = null;
  #offersModel = [];
  #destinationsModel = [];
  #eventData = {};
  #eventComponent = null;
  #editEventComponent = null;
  #handleDataChange = null;
  #onEventStateChange = null;
  #mode = Mode.DEFAULT;

  constructor({container, destinationsModel, offersModel,eventData, onDataChange, onEventStateChange}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventData = eventData;
    this.#handleDataChange = onDataChange;
    this.#onEventStateChange = onEventStateChange;
  }

  init(eventData) {
    this.#eventData = eventData;
    const offersByType = this.#offersModel.getOffersByType(this.#eventData.type);
    this.#renderEvent(this.#eventData, offersByType);
  }

  #renderEvent (event, offersByType) {
    const prevEventComponent = this.#eventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#eventComponent = new EventView({
      event: event,
      selectedOffers: this.#offersModel.getCurrentOffers(offersByType, event),
      cityName: this.#destinationsModel.getDestinationById(event.destination).name,
      onOpenButtonClick: this.#openButtonClickHandler,
      onFavoriteButtonClick: this.#toggleFavoriteStatus
    });

    this.#editEventComponent = new EditEventView({
      event: event,
      allOffers: this.#offersModel,
      allDestinations: this.#destinationsModel,
      onFormSubmit: this.#formSubmitHandler,
      onCloseButtonClick: this.#closeButtonClickHandler,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#container.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventComponent, prevEditEventComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  #openEditForm () {
    this.#onEventStateChange();
    replace(this.#editEventComponent, this.#eventComponent);
    this.#mode = Mode.EDITING;
  }

  #closeEditForm () {
    this.#editEventComponent.reset();
    replace(this.#eventComponent, this.#editEventComponent);
    this.#mode = Mode.DEFAULT;
  }

  #toggleFavoriteStatus = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#eventData, isFavorite: !this.#eventData.isFavorite},
    );
  };

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editEventComponent.shake(resetFormState);
  }

  #openButtonClickHandler = () => {
    this.#openEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  resetLastEditForm () {
    if (this.#mode === Mode.EDITING) {
      this.#closeEditForm();
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  }

  #formSubmitHandler = (updatedEvent) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      getUpdateType(updatedEvent, this.#eventData) ? UpdateType.MINOR : UpdateType.PATCH,
      updatedEvent,
    );
  };

  #closeButtonClickHandler = () => {
    this.#closeEditForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closeEditForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
