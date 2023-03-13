import { FilterType } from '../const/const.js';

const filter = {
  [FilterType.ALL]: (movies) => movies.filter((movie) => movie),
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist), /// ???
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched), /// ???
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.favorite), /// ???
};

export { filter };
