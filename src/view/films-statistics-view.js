import AbstractView from '../framework/view/abstract-view.js';
import { FILMS_COUNT } from '../mock/films.js';

function createFilmStatisticsTemplate(){
  return `
  <p>${FILMS_COUNT} films inside</p>
`;
}

export default class FilmsStatisticsView extends AbstractView {
  #element = null;

  get template(){
    return createFilmStatisticsTemplate();
  }
}
