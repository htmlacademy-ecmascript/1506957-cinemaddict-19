import { createElement } from '../render.js';

function createFilmsListEmptyTemplate(){
  return `
  <h2 class="films-list__title">There are no movies in our database</h2>
  `;
}

export default class FilmsListEmptyContainer {
  getTemplate(){
    return createFilmsListEmptyTemplate();
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
