import { createElement } from '../render.js';

function createFilmsListSectionTemplate(){
  return `
  <section class="films-list">
  </section>
  `;
}

export default class FilmsListSection {
  getTemplate(){
    return createFilmsListSectionTemplate();
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
