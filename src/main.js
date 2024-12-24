import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import TripSortPresenter from './presenter/trip-sort-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import { generateFilter } from './utils/filter.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFiltersContainer = tripHeaderContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripInfoPresenter = new TripInfoPresenter({container: tripHeaderContainer});
const sortPresenter = new TripSortPresenter({container: tripEventsContainer });

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

eventsModel.init();
destinationsModel.init();
offersModel.init();

const eventPointsPresenter = new TripEventsPresenter({
  container: tripEventsContainer,
  eventsModel,
  destinationsModel,
  offersModel
});

const filters = generateFilter(eventsModel.events);
const tripFiltersPresenter = new TripFiltersPresenter({container: tripFiltersContainer, filters: filters});

tripInfoPresenter.init();
tripFiltersPresenter.init();
eventPointsPresenter.init();
sortPresenter.init();

