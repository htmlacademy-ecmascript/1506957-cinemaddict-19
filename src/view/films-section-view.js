import AbstractView from '../framework/view/abstract-view.js';

function createFilmsSectionTemplate(){
  return `
  <section class="films"></section>
`;
}

export default class FilmsSection extends AbstractView {
  #element = null;

  get template(){
    return createFilmsSectionTemplate();
  }
}
