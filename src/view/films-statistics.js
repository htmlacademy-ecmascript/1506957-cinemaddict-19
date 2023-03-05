import { createElement } from '../render.js';

const MOVIES_COUNT = 100;

function createFilmStatisticsTemplate(){
  return `
  <p>${MOVIES_COUNT} movies inside</p>
`;
}

export default class FilmsStatistics {

  getTemplate(){
    return createFilmStatisticsTemplate();
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
