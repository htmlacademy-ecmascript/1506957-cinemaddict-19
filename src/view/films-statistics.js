import AbstractView from '../framework/view/abstract-view.js';

const MOVIES_COUNT = 100;

function createFilmStatisticsTemplate(){
  return `
  <p>${MOVIES_COUNT} films inside</p>
`;
}

export default class FilmsStatistics extends AbstractView {
  #element = null;

  get template(){
    return createFilmStatisticsTemplate();
  }
}
