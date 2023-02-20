import { createElement } from '../render.js';

function createLoadingFilmsTemplate() {
  return `
  <h2 class="films-list__title">Loading...</h2>
  `;
}

export default class LoadingFilms {
  getTemplate(){
    return createLoadingFilmsTemplate();
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
