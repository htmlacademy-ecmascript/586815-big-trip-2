import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltresPresenter from './presenter/trip-filtres-presenter.js';
import TripSortPresenter from './presenter/trip-sort-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFiltresContainer = tripHeaderContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripInfoPresentor = new TripInfoPresenter({container: tripHeaderContainer});
const tripFiltresPresentor = new TripFiltresPresenter({container: tripFiltresContainer});
const sortPresentor = new TripSortPresenter({container: tripEventsContainer });

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

eventsModel.init();
destinationsModel.init();
offersModel.init();

const eventPointsPresentor = new TripEventsPresenter({
  container: tripEventsContainer,
  eventsModel,
  destinationsModel,
  offersModel
});

tripInfoPresentor.init();
tripFiltresPresentor.init();
sortPresentor.init();
eventPointsPresentor.init();
