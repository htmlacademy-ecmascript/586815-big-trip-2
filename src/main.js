import TripInfoPresentor from './presenter/trip-info-presenter.js';
import TripFiltresPresentor from './presenter/trip-filtres-presenter.js';
import TripSortPresentor from './presenter/trip-sort-presenter.js';
import TripEventsPresentor from './presenter/trip-events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFiltresContainer = tripHeaderContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripInfoPresentor = new TripInfoPresentor({container: tripHeaderContainer});
const tripFiltresPresentor = new TripFiltresPresentor({container: tripFiltresContainer});
const sortPresentor = new TripSortPresentor({container: tripEventsContainer });

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

eventsModel.init();
destinationsModel.init();
offersModel.init();

const eventPointsPresentor = new TripEventsPresentor({
  container: tripEventsContainer,
  eventsModel,
  destinationsModel,
  offersModel
});

tripInfoPresentor.init();
tripFiltresPresentor.init();
sortPresentor.init();
eventPointsPresentor.init();
