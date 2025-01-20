import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

const SORT_COUNT = 0.5;
const DAYJS_FORMAT = 2;

dayjs.extend(duration);
dayjs.extend(isBetween);

const getDurationInMs = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom));

const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs.duration(getDurationInMs(dateFrom, dateTo));
  const days = Math.floor(diff.asDays());
  const hours = diff.hours();
  const minutes = diff.minutes();

  if (days > 0) {
    return `${days.toString().padStart(DAYJS_FORMAT, '0')}D ${hours.toString().padStart(DAYJS_FORMAT, '0')}H ${minutes.toString().padStart(DAYJS_FORMAT, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(DAYJS_FORMAT, '0')}H ${minutes.toString().padStart(DAYJS_FORMAT, '0')}M`;
  } else {
    return `${minutes.toString().padStart(DAYJS_FORMAT, '0')}M`;
  }
};

const humanizeTaskDateTime = (dueDate) =>
  dueDate ? {
    dateTimeFull: dayjs(dueDate).format('YYYY-MM-DDTHH-mm'),
    dateFull: dayjs(dueDate).format('YYYY-MM-DD'),
    date: dayjs(dueDate).format('MMM D'),
    time: dayjs(dueDate).format('HH:mm'),
    editableDate: dayjs(dueDate).format('DD/MM/YY HH:mm')
  } : '';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArray(items) {
  return items.slice().sort(() => Math.random() - SORT_COUNT);
}

function getRandomSentences(sentences) {
  const shuffledSentences = [...sentences].sort(() => Math.random() - SORT_COUNT);
  const randomCount = Math.floor(Math.random() * 5) + 1;
  return shuffledSentences.slice(0, randomCount).join(' ');
}

function getRandomInteger () {
  return Math.random();
}

function isEventInFuture(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

function isEventExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isCurrentDayInRange(startDate, endDate) {
  return dayjs().isBetween(startDate, endDate, 'day', '[]');
}

function updateItem(eventsData, updatedItem) {
  return eventsData.map((item) =>
    item.id === updatedItem.id ? {...item, ...updatedItem} : item
  );
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const getUpdateType = (updatedEvent, currentEvent) => updatedEvent.dateFrom !== currentEvent.dateFrom || updatedEvent.basePrice !== currentEvent.basePrice || updatedEvent.duration !== currentEvent.duration;

export {getRandomArrayElement, getRandomSentences, getRandomInteger, getRandomArray, humanizeTaskDateTime, calculateDuration, isEventInFuture, isCurrentDayInRange, isEventExpired, updateItem, getDurationInMs, isEscapeKey, getUpdateType};
