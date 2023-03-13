import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListSectionViewTemplate(isExtra, title){
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
  <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${title || 'All films. Upcoming'}</h2>
  <div class="films-list__container">
  </div>
  </section>`;
}

export default class FilmsListSectionView extends AbstractView {
  #element = null;
  #isExtra = null;
  #title = null;

  constructor(isExtra, title) {
    super();
    this.#isExtra = isExtra;
    this.#title = title;
  }

  get template(){
    return createFilmsListSectionViewTemplate(this.#isExtra, this.#title);
  }

}
