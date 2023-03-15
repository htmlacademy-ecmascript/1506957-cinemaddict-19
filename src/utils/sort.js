// import dayjs from 'dayjs';
// import { SortType } from '../const/const.js';
// // eslint-disable-next-line no-undef
// // const minMax = require('dayjs/plugin/minMax');
// // dayjs.extend(minMax);
// // const a = dayjs.max(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))
// // console.log(a)

// function isTaskExpired(dueDate) {
//   return dueDate && dayjs().isAfter(dueDate, 'D');
// }

// const sort = {
//   [SortType.DEFAULT]: (films) => films.filter((film) => film),
//   [SortType.DATE]: (films) => films.filter((film) => isTaskExpired(film.filmInfo.release.date)),
//   // [SortType.DATE]: (films) => films.filter((film) => dayjs.max(dayjs(), film)),
//   [SortType.RATING]: (films) => films.filter((film) => film.filmInfo.totalRating),
// };

// export { sort };
