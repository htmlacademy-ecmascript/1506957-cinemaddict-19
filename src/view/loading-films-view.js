import { createElement } from '../render.js';

function createLoadingFilmsTemplate() {
  return `
  <h2 class="films-list__title">Loading...</h2>
  `;
}

export default class LoadingFilms {
  #element = null;

  get template(){
    return createLoadingFilmsTemplate();
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
