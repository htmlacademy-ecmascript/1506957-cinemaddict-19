import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListEmptyTemplate(){
  return `
  <h2 class="films-list__title">There are no films in our database</h2>
  `;
}

export default class FilmsListEmptyContainerView extends AbstractView {
  #element = null;

  get template(){
    return createFilmsListEmptyTemplate();
  }
}
