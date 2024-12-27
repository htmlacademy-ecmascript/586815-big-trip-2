const TYPES_POINT = [ 'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present ',
  PAST: 'Past'
};

const MessageListEmpty = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export {TYPES_POINT, FilterType, MessageListEmpty, SortType };
