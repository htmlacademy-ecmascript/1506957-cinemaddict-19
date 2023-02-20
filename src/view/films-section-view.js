import { createElement } from '../render.js';

function createFilmsSectionTemplate(){
  return `
  <section class="films"></section>
`;
}

export default class FilmsSection {
  getTemplate(){
    return createFilmsSectionTemplate();
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
