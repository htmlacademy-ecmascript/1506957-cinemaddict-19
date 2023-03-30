import dayjs from 'dayjs';

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortByDate(filmA, filmB) {
  const weight = getWeightForNullDate(filmA.dueDate, filmB.dueDate);

  return weight ?? dayjs(filmB.dueDate).diff(dayjs(filmA.dueDate));
}

function sortByRating(cardA, cardB) {
  return cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;
}

export {sortByDate, sortByRating};
