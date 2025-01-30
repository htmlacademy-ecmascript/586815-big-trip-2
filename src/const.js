const TYPES_EVENT = [ 'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present ',
  PAST: 'past'
};

const MessageListEmpty = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  messageError: 'Failed to load latest route information'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const newEventData = {
  type: 'flight',
  destination: '',
  dateFrom: '',
  dateTo: '',
  basePrice: '0',
  isFavorite: false,
  offers: []
};

export {TYPES_EVENT, FilterType, MessageListEmpty, SortType, UserAction, UpdateType, newEventData };
