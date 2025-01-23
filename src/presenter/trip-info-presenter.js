import TripInfoMainContainer from '../view/trip-info/main-container-view.js';
import TripInfoContainer from '../view/trip-info/container-view.js';
import TripInfoTitle from '../view/trip-info/title-view.js';
import TripInfoDates from '../view/trip-info/dates-view.js';
import TripInfoCost from '../view/trip-info/cost-view.js';
import { RenderPosition, render, remove, replace } from '../framework/render.js';
import { sortEventsByDay } from '../utils/sort.js';
import { humanizeTaskDateTime } from '../utils/common.js';
import { isDatesChanged, isCitiesChanged, isCostChanged } from '../utils/main-info.js';

const MAX_CITY_COUNT = 3;

export default class TripInfoPresenter {
  #container = null;
  #mainContainerComponent = null;
  #containerComponent = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #cost = 0;
  #tripDestinations = [];
  #tripPeriod = [];
  #costComponent = null;
  #tripDestinationsComponent = null;
  #periodComponent = null;
  #previousEvents = [];

  constructor({container, eventsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#mainContainerComponent = new TripInfoMainContainer();
    this.#containerComponent = new TripInfoContainer();
  }

  #handleModelEvent = () => {
    if (this.#eventsModel.events.length === 0) {
      this.#destroy();
      return;
    }

    if (this.#mainContainerComponent === null) {
      this.init();
    }

    const datesChanged = isDatesChanged(this.#previousEvents, this.#eventsModel.events);
    const citiesChanged = isCitiesChanged(this.#previousEvents, this.#eventsModel.events, this.#destinationsModel);
    const costChanged = isCostChanged(this.#previousEvents, this.#eventsModel.events, this.#offersModel);

    const hasChanges = datesChanged || citiesChanged || costChanged;

    if (hasChanges) {
      render(this.#mainContainerComponent, this.#container, RenderPosition.AFTERBEGIN);
      render(this.#containerComponent, this.#mainContainerComponent.element, RenderPosition.AFTERBEGIN);
    }

    if (datesChanged) {
      this.#getChangeTripDestinations();
      this.#renderTripDestinations();
      this.#getTripPeriod(this.#eventsModel.events.sort(sortEventsByDay));
      this.#renderTripPeriod();
    }

    if (citiesChanged) {
      this.#getChangeTripDestinations();
      this.#renderTripDestinations();
    }

    if (costChanged) {
      this.#getChangeCost();
      this.#renderCost();
    }

    if (hasChanges) {
      this.#previousEvents = [...this.#eventsModel.events];
    }
  };

  #destroy = () => {
    remove(this.#mainContainerComponent);
    remove(this.#containerComponent);
    this.#costComponent = null;
    this.#tripDestinationsComponent = null;
    this.#periodComponent = null;
  };

  #getChangeCost = () => {
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
  };

  #getChangeTripDestinations = () => {
    this.#tripDestinations = [];

    const sortedEvents = this.#eventsModel.events.sort(sortEventsByDay);

    sortedEvents.forEach((event) => {
      const destinationName = this.#destinationsModel.getDestinationById(event.destination).name;
      this.#tripDestinations.push(destinationName);
    });

    this.#getTripPeriod(sortedEvents);

    if (this.#tripDestinations.length > MAX_CITY_COUNT) {
      this.#tripDestinations = [this.#tripDestinations[0], this.#tripDestinations[this.#tripDestinations.length - 1]].join('&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;');
      return;
    }

    this.#tripDestinations = [...this.#tripDestinations].join('&nbsp;&mdash;&nbsp;');
  };

  #getTripPeriod = (events) => {
    if (!events.length) {
      this.#tripPeriod = '';
      return;
    }

    const { dateMainInfo: firstDay } = humanizeTaskDateTime(events[0].dateFrom);
    const { dateMainInfo: lastDay } = humanizeTaskDateTime(events[events.length - 1].dateTo);

    const [firstDayDate, firstDayMonth] = firstDay.split(' ');
    const lastDayMonth = lastDay.split(' ')[1];

    if (firstDayMonth === lastDayMonth) {
      this.#tripPeriod = `${firstDayDate}&nbsp;&mdash;&nbsp;${lastDay}`;
    } else {
      this.#tripPeriod = `${firstDay}&nbsp;&mdash;&nbsp;${lastDay}`;
    }
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

  #renderTripDestinations = () => {
    const destinations = this.#tripDestinations;
    const prevTripDestinationsComponent = this.#tripDestinationsComponent;

    this.#tripDestinationsComponent = new TripInfoTitle({
      destinations
    });

    if (prevTripDestinationsComponent === null) {
      render (this.#tripDestinationsComponent, this.#containerComponent.element);
      return;
    }

    replace(this.#tripDestinationsComponent, prevTripDestinationsComponent);
    remove(prevTripDestinationsComponent);
  };

  #renderTripPeriod = () => {
    const period = this.#tripPeriod;
    const prevPeriodComponent = this.#periodComponent;

    this.#periodComponent = new TripInfoDates({
      period
    });

    if(prevPeriodComponent === null) {
      render (this.#periodComponent, this.#containerComponent.element);
      return;
    }

    replace(this.#periodComponent, prevPeriodComponent);
    remove(prevPeriodComponent);
  };
}
