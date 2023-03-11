import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListContainerTemplate(){
  return `
  <div class="films-list__container">
</div>
  `;
}

export default class FilmsListContainer extends AbstractView {
  #element = null;

  get template(){
    return createFilmsListContainerTemplate();
  }
}
