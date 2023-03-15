import { filter } from '../utils/filter.js';

function generateFilter(film) {
  return Object.entries(filter).map(
    ([filterName, filterMovie]) => ({
      name: filterName,
      count: filterMovie(film).length
    })
  );
}

export { generateFilter };
