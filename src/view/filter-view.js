import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked){
  const {name, count} = filter;
  return `
  <a href="#${name}" class="main-navigation__item main-navigation__item--${isChecked ? 'active' : 'count'}">${name === 'All' ? `${name} movies` : `${name} <span class="main-navigation__item-count">${count}</span>`}</a>`;
}

function createFilterTemplate(filterItems){
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return `
  <nav class="main-navigation">
  ${filterItemsTemplate}
</nav>
  `;
}

export default class FilterView extends AbstractView {
  #element = null;
  #filter = null;


  constructor(filter){
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
