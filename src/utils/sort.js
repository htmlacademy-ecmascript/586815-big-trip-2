import dayjs from 'dayjs';
import { getDurationInMs } from './common.js';

function sortEventsByPrice (eventB, eventA) {
  return eventA.basePrice - eventB.basePrice;
}

function sortEventsByTime (eventA, eventB) {
  return getDurationInMs(eventB.dateFrom, eventB.dateTo) - getDurationInMs(eventA.dateFrom, eventA.dateTo);
}

function sortEventsByDay (eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

export { sortEventsByPrice, sortEventsByTime, sortEventsByDay };
