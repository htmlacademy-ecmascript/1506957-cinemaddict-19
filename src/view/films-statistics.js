import { createElement } from '../render.js';

function createFilmStatisticsTemplate(){
  return `
  <p>130 291 movies inside</p>
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
