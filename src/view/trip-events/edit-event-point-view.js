import AbstractView from '../../framework/view/abstract-view.js';
import { humanizeTaskDateTime } from '../../utils/common.js';
import { TYPES_POINT } from '../../const.js';

function createEditableEventTemplate(event, destination, destinationsNames, offersByType) {
  const { type, dateFrom, dateTo, basePrice, offers } = event;

  const departure = humanizeTaskDateTime(dateFrom);
  const arrival = humanizeTaskDateTime(dateTo);
  const getStatusOffer = (id) => offers.includes(id) ? 'checked' : '';
  const getLastWordTitle = (title) => title.split(' ')[title.split(' ').length - 1];
  const getStatusType = (itemType) => itemType.toLowerCase() === type ? 'checked' : '';

  return `
<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
${TYPES_POINT.map((item) =>`
                        <div class="event__type-item">
                          <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${getStatusType(item)}>
                          <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
                        </div>`
  ).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinationsNames.map((city) =>`<option value="${city}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${departure.editableDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${arrival.editableDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">

                      ${offersByType.offers.map((offer) =>
    `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getLastWordTitle(offer.title)}-1" type="checkbox" name="event-offer-${getLastWordTitle(offer.title)}"
                        ${getStatusOffer(offer.id)}>
                        <label class="event__offer-label" for="event-offer-${getLastWordTitle(offer.title)}-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`).join('')}

                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${destination.pictures.map((picture) =>`
                        <img class="event__photo" src="${picture.src}" alt="${picture.description}">
                      `).join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
  `;
}

export default class EditablePoint extends AbstractView {
  #handleFormSubmit = null;
  #handleCloseButtonClick = null;


  constructor ({event, destination, destinationsNames, offersByType, onFormSubmit, onCloseButtonClick}) {
    super();
    this.event = event;
    this.destination = destination;
    this.destinationsNames = destinationsNames;
    this.offersByType = offersByType;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseButtonClick = onCloseButtonClick;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonHandler);
  }

  get template() {
    return createEditableEventTemplate(this.event, this.destination, this.destinationsNames, this.offersByType);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseButtonClick();
  };
}
