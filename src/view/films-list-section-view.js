import { createElement } from '../render.js';

function createFilmsListSectionTemplate(isExtra, title){
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
  <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title || 'All movies. Upcoming'}</h2>
  </section>`;
}

export default class FilmsListSection {
  element = null;
  isExtra = null;
  title = null;

  constructor(isExtra, title) {
    this.isExtra = isExtra;
    this.title = title;
  }

  getTemplate(){
    return createFilmsListSectionTemplate(this.isExtra, this.title);
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
