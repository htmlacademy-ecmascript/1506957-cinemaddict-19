import { getRandomInteger } from './common.js';

const MINUTES_IN_ONE_HOUR = 60;

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

const getRanomReleaseTime = () => `${getRandomInteger(2019, 2023)}-${getRandomInteger(1, 12)}-${getRandomInteger(1, 31)}T${getRandomInteger(0, 23)}:${getRandomInteger(0,59)}:${getRandomInteger(0, 59)}.000Z`;

const getRandomTime = () => `${getRandomInteger(2019, 2023)}-${getRandomInteger(1, 12)}-${getRandomInteger(1, 31)}T${getRandomInteger(0, 23)}:${getRandomInteger(0,59)}:${getRandomInteger(0, 59)}.554Z`;

export { durationTime, getRandomTime, getRanomReleaseTime};
