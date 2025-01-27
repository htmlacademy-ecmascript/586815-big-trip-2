import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripFiltersPresenter from './presenter/trip-filters-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filters-model.js';
import MainApiService from './main-api-service.js';

const AUTHORIZATION = 'Basic hS2sfS44khh7rt3s';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFiltersContainer = tripHeaderContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newEventButtonComponent = tripHeaderContainer.querySelector('.trip-main__event-add-btn');
const mainApiServiceComponent = new MainApiService(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel({
  mainApiService: mainApiServiceComponent
});
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
new TripInfoPresenter({container: tripHeaderContainer, eventsModel, offersModel, destinationsModel});

MainApiService.fetchAllData(mainApiServiceComponent).then((response) => {
  const { points, destinations, offers} = response;
  destinationsModel.init(destinations);
  offersModel.init(offers);
  eventsModel.init(points);
}).catch((error) => {
  console.error('Error fetching data:', error);// eslint-disable-line no-console
}).finally(() => {
  newEventButtonComponent.disabled = false;
});

const tripEventsPresenter = new TripEventsPresenter({
  container: tripEventsContainer,
  eventsModel: eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const tripFiltersPresenter = new TripFiltersPresenter({container: tripFiltersContainer, filterModel, eventsModel});

tripFiltersPresenter.init();
tripEventsPresenter.init();
newEventButtonComponent.addEventListener('click', handleNewEventButtonClick);
newEventButtonComponent.disabled = true;

function handleNewEventFormClose() {
  newEventButtonComponent.disabled = false;
  if (eventsModel.events.length === 0) {
    tripEventsPresenter.init();
  }
}

function handleNewEventButtonClick() {
  tripEventsPresenter.createEvent();
  newEventButtonComponent.disabled = true;
}
