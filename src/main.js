// import TripFilters from './view/trip-filters-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filters-model.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFiltersContainer = tripHeaderContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newEventButtonComponent = tripHeaderContainer.querySelector('.trip-main__event-add-btn');
const tripInfoPresenter = new TripInfoPresenter({container: tripHeaderContainer});

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const tripEventsPresenter = new TripEventsPresenter({
  container: tripEventsContainer,
  eventsModel: eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const tripFiltersPresenter = new TripFiltersPresenter({container: tripFiltersContainer, filterModel, eventsModel});

destinationsModel.init();
offersModel.init();
tripInfoPresenter.init();
tripFiltersPresenter.init();
tripEventsPresenter.init();
newEventButtonComponent.addEventListener('click', handleNewEventButtonClick);

function handleNewEventFormClose() {
  newEventButtonComponent.disabled = false;
}

function handleNewEventButtonClick() {
  tripEventsPresenter.createEvent();
  newEventButtonComponent.disabled = true;
}
