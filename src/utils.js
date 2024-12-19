import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const SORT_COUNT = 0.5;
const DAYJS_FORMAT = 2;

dayjs.extend(duration);

const calculateDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const diff = dayjs.duration(end.diff(start));
  const days = diff.days();
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

export {getRandomArrayElement, getRandomSentences, getRandomInteger, getRandomArray, humanizeTaskDateTime, calculateDuration};