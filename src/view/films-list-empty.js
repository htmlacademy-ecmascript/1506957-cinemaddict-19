import { createElement } from '../render.js';

function createFilmsListEmptyTemplate(){
  return `
  <h2 class="films-list__title">There are no films in our database</h2>
  `;
}

export default class FilmsListEmptyContainer {
  #element = null;

  get template(){
    return createFilmsListEmptyTemplate();
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
