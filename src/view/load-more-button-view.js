import AbstractView from '../framework/view/abstract-view.js';

function createLoadMoreButtonViewTemplate() {
  return `
  <button class="films-list__show-more">Show more</button>
  `;
}

export default class LoadMoreButtonView extends AbstractView {
  #handlerClick = null;

  constructor({onClick}) {
    super();
    this.#handlerClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template(){
    return createLoadMoreButtonViewTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handlerClick();
  };
}
