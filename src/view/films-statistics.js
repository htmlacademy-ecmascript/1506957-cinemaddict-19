import { createElement } from '../render.js';

const MOVIES_COUNT = 100;

function createFilmStatisticsTemplate(){
  return `
  <p>${MOVIES_COUNT} films inside</p>
`;
}

export default class FilmsStatistics {
  #element = null;

  get template(){
    return createFilmStatisticsTemplate();
  }

  get element(){
    if(!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement(){
    this.#element = null;
  }
}
