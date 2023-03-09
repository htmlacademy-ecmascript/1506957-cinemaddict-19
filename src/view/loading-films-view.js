import AbstractView from '../framework/view/abstract-view.js';

function createLoadingFilmsTemplate() {
  return `
  <h2 class="films-list__title">Loading...</h2>
  `;
}

export default class LoadingFilms extends AbstractView {
  #element = null;

  get template(){
    return createLoadingFilmsTemplate();
  }

}
