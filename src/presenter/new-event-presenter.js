import { remove, render, RenderPosition } from '../framework/render.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isEscapeKey } from '../utils/common.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventEditComponent = null;
  #newEventPointData = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({eventListContainer, onDataChange, onDestroy, newEventPointData,
    destinationsModel, offersModel}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#newEventPointData = newEventPointData;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EditablePoint({
      event: this.#newEventPointData,
      allOffers: this.#offersModel,
      allDestinations: this.#destinationsModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isNewEvent: true,
    });

    render(this.#eventEditComponent, this.#eventListContainer.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { ...event},
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
