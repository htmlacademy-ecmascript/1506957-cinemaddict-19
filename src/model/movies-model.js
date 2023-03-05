import { createMockMovies } from '../mock/movies.js';

export default class MoviesModel {
  movies = createMockMovies;

  getMovies() {
    return this.movies;
  }
}
