import AbstractView from '../framework/view/abstract-view.js';

function createLoadMoreButtonTemplate() {
  return `
  <button class="films-list__show-more">Show more</button>
  `;
}

export default class LoadMoreButton extends AbstractView {
  #element = null;

  get template(){
    return createLoadMoreButtonTemplate();
  }
}
