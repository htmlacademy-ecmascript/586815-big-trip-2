import EventPoint from '../view/trip-events/event-point-view.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
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
  #eventPointComponent = null;
  #editablePointComponent = null;
  #handleDataChange = null;
  #onPointStateChange = null;
  #mode = Mode.DEFAULT;

  constructor({container, destinationsModel, offersModel,eventData, onDataChange, onPointStateChange}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventData = eventData;
    this.#handleDataChange = onDataChange;
    this.#onPointStateChange = onPointStateChange;
  }

  init(eventData) {
    this.#eventData = eventData;
    const offersByType = this.#offersModel.getOffersByType(this.#eventData.type);
    this.#renderEvent(this.#eventData, offersByType);
  }

  #renderEvent (event, offersByType) {
    const prevEventPointComponent = this.#eventPointComponent;
    const prevEditablePointComponent = this.#editablePointComponent;

    this.#eventPointComponent = new EventPoint({
      event: event,
      selectedOffers: this.#offersModel.getCurrentOffers(offersByType, event),
      cityName: this.#destinationsModel.getDestinationById(event.destination).name,
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

    if (prevEventPointComponent === null || prevEditablePointComponent === null) {
      render(this.#eventPointComponent, this.#container.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventPointComponent, prevEditablePointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventPointComponent);
    remove(prevEditablePointComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editablePointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editablePointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  #openEditForm () {
    this.#onPointStateChange();
    replace(this.#editablePointComponent, this.#eventPointComponent);
    this.#mode = Mode.EDITING;
  }

  #closeEditForm () {
    this.#editablePointComponent.reset();
    replace(this.#eventPointComponent, this.#editablePointComponent);
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
      this.#eventPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editablePointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editablePointComponent.shake(resetFormState);
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
    remove(this.#eventPointComponent);
    remove(this.#editablePointComponent);
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
