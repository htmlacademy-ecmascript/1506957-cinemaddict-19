import { mockFilms } from '../mock/films.js';

export default class FilmsModel {
  #films = mockFilms;

  get films() {
    return this.#films;
  }
}
