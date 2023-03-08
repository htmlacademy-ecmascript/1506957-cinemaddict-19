import { createMockFilms } from '../mock/films.js';

export default class FilmsModel {
  #films = createMockFilms;

  get films() {
    return this.#films;
  }
}
