import { FilterType } from '../const.js';
import { isEventInFuture, isCurrentDayInRange, isEventExpired } from './common.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventInFuture(event.dateFrom)),
  [FilterType.PRESENT]:(events) => events.filter((event) => isCurrentDayInRange(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventExpired(event.dateTo)),
};

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
      currentEvents: filterEvents
    }),
  );
}

export { generateFilter, filter };
