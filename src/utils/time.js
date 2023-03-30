import dayjs from 'dayjs';
import { getRandomInteger, getRandomArrayElement } from './common.js';

const MINUTES_IN_ONE_HOUR = 60;

const DATE = ['2019-05-11T00:00:00.000Z', '2018-06-10T00:00:00.000Z','2017-04-06T00:00:00.000Z','2022-01-10T00:00:00.000Z','2023-01-10T00:00:00.000Z'];

const durationTime = (duration) => {
  const hours = Math.floor((duration) / MINUTES_IN_ONE_HOUR);
  const minutes = duration - hours * MINUTES_IN_ONE_HOUR;
  if (duration < MINUTES_IN_ONE_HOUR && hours === 0) {
    return `${minutes}M`;
  }
  if (duration > MINUTES_IN_ONE_HOUR && minutes === 0) {
    return `${hours}H`;
  }
  return `${hours}H ${minutes}M`;
};
const getRandomReleaseDate = `${getRandomInteger(2019, 2022)}-${getRandomInteger(1, 12)}-${getRandomInteger(1, 31)}`;
const getRandomReleaseTime = () => `${getRandomArrayElement(DATE)}`;

const humanizeCommentDate = (commentDate) => commentDate ? dayjs(commentDate).format('YYYY MMMM DD HH:mm') : '';

export { durationTime, getRandomReleaseTime, getRandomReleaseDate, humanizeCommentDate};
