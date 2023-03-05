import { getRandomArrayElement, getRandomElementsArray, getRandomInteger, getRandomIntegerWithDot } from '../utils/common.js';
import { durationTime, getRanomReleaseTime, getRandomTime } from '../utils/time.js';
import { FILM_TITLE, TOTAL_FILM_RATING_MIN, TOTAL_FILM_RATING_MAX, POSTERS, AGE_RATING, DICRECTOR_OF_FILM, WRITERS_OF_FILM, ACTORS_OF_FILM, RELEASE_COUNTRY, DURATION_TIME_MIN, DURATION_TIME_MAX, GENRES, DESCRIPTIONS, DESCRIPTION_LENGTH_MIN, DESCRIPTION_LENGTH_MAX } from '../const/mock-const/films-const.js';
import { getCommentsIds } from './comments.js';

const MOVIE_COUNT = 5;
const GENRE_MAX_COUNT = 3;
// const findID = comments.find((item) => item.id === movieId);

const createMovie = (index) => (
  {
    'id': index + 1,
    'comments': getCommentsIds(),
    'filmInfo': {
      'title': getRandomArrayElement(FILM_TITLE),
      'alternativeTitle': getRandomArrayElement(DESCRIPTIONS),
      'totalRating': getRandomIntegerWithDot(TOTAL_FILM_RATING_MIN, TOTAL_FILM_RATING_MAX),
      'poster': `images/posters/${getRandomArrayElement(POSTERS)}`,
      'ageRating': getRandomArrayElement(AGE_RATING),
      'director': getRandomArrayElement(DICRECTOR_OF_FILM),
      'writers': getRandomElementsArray(WRITERS_OF_FILM, WRITERS_OF_FILM.length),
      'actors': getRandomElementsArray(ACTORS_OF_FILM, ACTORS_OF_FILM.length),
      'release': {
        'date': getRanomReleaseTime(),
        'releaseCountry': getRandomArrayElement(RELEASE_COUNTRY),
      },
      'duration': durationTime(getRandomInteger(DURATION_TIME_MIN, DURATION_TIME_MAX)),
      'genre': [getRandomElementsArray(GENRES, GENRE_MAX_COUNT)],
      'description': getRandomElementsArray(DESCRIPTIONS, (getRandomInteger(DESCRIPTION_LENGTH_MIN, DESCRIPTION_LENGTH_MAX))),
    },
    'userDetails': {
      'watchlist': Boolean(getRandomInteger(0,1)),
      'alreadyWatched': Boolean(getRandomInteger(0,1)),
      'watchingDate': getRandomTime(),
      'favorite': Boolean(getRandomInteger(0,1))
    }
  }
);

const createMockMovies = Array.from({ length: MOVIE_COUNT }, (_, index) => createMovie(index));

export { createMockMovies };

