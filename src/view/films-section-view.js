import { createElement } from '../render.js';

function createFilmsSectionTemplate(){
  return `
  <section class="films"></section>
`;
}

export default class FilmsSection {
  #element = null;

  get template(){
    return createFilmsSectionTemplate();
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
