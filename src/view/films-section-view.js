import AbstractView from '../framework/view/abstract-view.js';

function createFilmsSectionViewTemplate(){
  return `
  <section class="films"></section>
`;
}

export default class FilmsSectionView extends AbstractView {
  #element = null;

  get template(){
    return createFilmsSectionViewTemplate();
  }
}
