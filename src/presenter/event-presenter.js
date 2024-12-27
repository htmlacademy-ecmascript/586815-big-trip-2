import EventPoint from '../view/trip-events/event-point-view.js';
import EditablePoint from '../view/trip-events/edit-event-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

export default class EventPresenter {
  #container = null;
  #offersModel = [];
  #destinationsModel = [];
  #eventData = {};
  #eventPointComponent = null;
  #editablePointComponent = null;
  #onFavoriteButtonClick = null;
  #onPointStateChange = null;
  #isOpenEditForm = false;

  constructor({container, destinationsModel, offersModel,eventData, onFavoriteButtonClick, onPointStateChange}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventData = eventData;
    this.#onFavoriteButtonClick = onFavoriteButtonClick;
    this.#onPointStateChange = onPointStateChange;
  }

  updateEventData(updatedEventData) {
    this.#eventData = updatedEventData;
    remove(this.#eventPointComponent);
    this.init();
  }

  init() {
    const offersByType = this.#offersModel.getOffersByType(this.#eventData.type);
    const pointInfo = {
      offersByType: offersByType,
      selectedOffers: this.#offersModel.getCurrentOffers(offersByType, this.#eventData),
      destination: this.#destinationsModel.getDestinationById(this.#eventData.destination),
      destinationsNames: this.#destinationsModel.destinationsNames,
    };

    this.#renderEvent(this.#eventData, pointInfo);
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
      destination: info.destination,
      destinationsNames: info.destinationsNames,
      offersByType: info.offersByType,
      onFormSubmit: this.#formSubmitHandler,
      onCloseButtonClick: this.#closeButtonClickHandler
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
    this.#isOpenEditForm = false;
    replace(this.#eventPointComponent, this.#editablePointComponent);
  }

  #toggleFavoriteStatus = () => {
    this.#onFavoriteButtonClick({...this.#eventData, isFavorite: !this.#eventData.isFavorite});
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

  #formSubmitHandler = () => {
    this.#closeEditForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
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
}
