import TripInfoMainContainer from '../view/trip-info/main-container-view.js';
import TripInfoContainer from '../view/trip-info/container-view.js';
import TripInfoTitle from '../view/trip-info/title-view.js';
import TripInfoDates from '../view/trip-info/dates-view.js';
import TripInfoCost from '../view/trip-info/cost-view.js';
import { RenderPosition, render, remove, replace } from '../framework/render.js';

export default class TripInfoPresenter {
  #container = null;
  #mainContainerComponent = new TripInfoMainContainer();
  #containerComponent = new TripInfoContainer();
  #eventsModel = null;
  #offersModel = null;
  #cost = 0;
  #costComponent = null;

  constructor({container, eventsModel, offersModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    render(this.#mainContainerComponent, this.#container, RenderPosition.AFTERBEGIN);
    render (this.#containerComponent, this.#mainContainerComponent.element, RenderPosition.AFTERBEGIN);
    render (new TripInfoTitle(), this.#containerComponent.element);
    render (new TripInfoDates(), this.#containerComponent.element);
  }

  #handleModelEvent = () => {
    this.#cost = 0;
    this.#eventsModel.events.forEach((event) => {
      this.#cost += event.basePrice;
      event.offers.forEach(() => {
        const offersByType = this.#offersModel.getOffersByType(event.type);
        const selectedOffers = this.#offersModel.getCurrentOffers(offersByType, event);
        selectedOffers.forEach((item) => {
          this.#cost += item.price;
        });
      });
    }
    );
    this.#renderCost();
  };

  #renderCost = () => {
    const cost = this.#cost;
    const prevCostComponent = this.#costComponent;
    this.#costComponent = new TripInfoCost({
      cost
    });

    if (prevCostComponent === null) {
      render (this.#costComponent, this.#mainContainerComponent.element);
      return;
    }

    replace(this.#costComponent, prevCostComponent);
    remove(prevCostComponent);
  };
}
