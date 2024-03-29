import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const/const.js';

function createSortTemplate() {
  return `
  <ul class="sort">
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}"">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}"">Sort by rating</a></li>
</ul>
  `;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor(onSortTypeChange){
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template(){
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    // console.log('1')
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
