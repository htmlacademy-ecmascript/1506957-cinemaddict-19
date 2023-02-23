import { getRandomArrayElement, getRandomElementsArray, getRandomInteger, getRandomIntegerWithDot, renameKeysToCamel } from '../utils/common.js';
import { durationTime, getRanomReleaseTime, getRanomWatchingTime } from '../utils/time.js';
import { FILM_TITLE_LIST, TOTAL_FILM_RATING_MIN, TOTAL_FILM_RATING_MAX, POSTER_IMAGE, AGE_RATING_LIST, DICRECTOR_OF_FILM_LIST, WRITERS_OF_FILM_LIST, ACTORS_OF_FILM_LIST, RELEASE_COUNTRY_LIST, DURATION_TIME_MIN, DURATION_TIME_MAX, GENRE_LIST, DESCRIPTION, DESCRIPTION_LENGTH_MIN, DESCRIPTION_LENGTH_MAX } from '../const/films-const.js';

const MOVIE_COUNT = 5;

const createMovie = (index) => (
  {
    'id': index + 1,
    'comments': [
      // $Comment.id$, $Comment.id$
    ],
    'film_info': {
      'title': getRandomArrayElement(FILM_TITLE_LIST),
      'alternative_title': getRandomArrayElement(DESCRIPTION),
      'total_rating': getRandomIntegerWithDot(TOTAL_FILM_RATING_MIN, TOTAL_FILM_RATING_MAX),
      'poster': `images/posters/${getRandomArrayElement(POSTER_IMAGE)}`,
      'age_rating': getRandomArrayElement(AGE_RATING_LIST),
      'director': getRandomArrayElement(DICRECTOR_OF_FILM_LIST),
      'writers': getRandomElementsArray(WRITERS_OF_FILM_LIST, WRITERS_OF_FILM_LIST.length),
      'actors': getRandomElementsArray(ACTORS_OF_FILM_LIST, ACTORS_OF_FILM_LIST.length),
      'release': {
        'date': getRanomReleaseTime(),
        'release_country': getRandomArrayElement(RELEASE_COUNTRY_LIST),
      },
      'duration': durationTime(getRandomInteger(DURATION_TIME_MIN, DURATION_TIME_MAX)),
      'genre': [getRandomArrayElement(GENRE_LIST)],
      'description': getRandomElementsArray(DESCRIPTION, (getRandomInteger(DESCRIPTION_LENGTH_MIN, DESCRIPTION_LENGTH_MAX))),
    },
    'user_details': {
      'watchlist': Boolean(getRandomInteger(0,1)),
      'already_watched': Boolean(getRandomInteger(0,1)),
      'watching_date': getRanomWatchingTime(),
      'favorite': Boolean(getRandomInteger(0,1))
    }
  }
);

const renameMovieMock = (index) => renameKeysToCamel(createMovie(index));
const createMockMovies = Array.from({ length: MOVIE_COUNT }, (_, index) => renameMovieMock(index));

console.log(createMockMovies);

export { createMockMovies };

