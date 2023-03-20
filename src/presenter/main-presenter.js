import { render, remove, RenderPosition } from '../framework/render.js';
import ProfileView from '../view/profile-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmsStatisticsView from '../view/films-statistics-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListEmptyContainerView from '../view/films-list-empty-view.js';
import { generateFilter } from '../mock/filters.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils/common.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #profileComponent = new ProfileView();
  #emptyFilmsListComponent = new FilmsListEmptyContainerView();
  #filmsStatisticComponent = new FilmsStatisticsView();
  #filmsSectionComponent = new FilmsSectionView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #sortComponent = new SortView();
  #loadMoreButtonComponent;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #header;
  #main;
  #footer;
  #body;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #comments = [];
  #filmPresenters = new Map();

  constructor({header, main, footer, body, filmsModel, commentsModel}){
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#body = body;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init(){
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#renderBoard();
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderFilmsCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#loadMoreButtonComponent.element);
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenters.get(updatedFilm.id).init(updatedFilm);
  };

  #renderProfile(){
    render(this.#profileComponent, this.#header);
  }

  #renderSort(){
    render(this.#sortComponent, this.#main);
  }

  #renderFilter(){
    render(new FilterView(generateFilter(this.#films)), this.#main);
  }

  #renderNoFilms(){
    render(this.#emptyFilmsListComponent, this.#filmsSectionComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderFilmsStatistic(){
    render(this.#filmsStatisticComponent, this.#footer);
  }

  #renderLoadMoreButton(){
    this.#loadMoreButtonComponent = new LoadMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick
    });
    render(this.#loadMoreButtonComponent, this.#filmsListSectionComponent.element);
  }

  #clearFilmsList(){
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #renderFilmsList(){
    const minLengthPerStep = Math.min(this.#films.length, FILMS_COUNT_PER_STEP);

    render(this.#filmsSectionComponent, this.#main);
    render(this.#filmsListSectionComponent, this.#filmsSectionComponent.element);

    for (let i = 0; i < minLengthPerStep; i++) {
      // (console.log(this.#films))
      this.#renderFilmCard(this.#films[i]); // здесь в косоли undefind??
      // console.log(this.#renderFilmCard(this.#films[i]));
    }
    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderFilmsCards(from, to) {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film)); // ????
  }

  #renderFilmCard(film) {
    const filmsListContainer = this.#filmsListSectionComponent.element.querySelector('.films-list__container');

    const filmPresenter = new FilmPresenter({
      filmsListContainer: filmsListContainer,
      bodyElement: this.#body,
      onDataChange: this.#handleFilmChange,
    });
    filmPresenter.init(film, this.#comments);
    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderBoard(){
    this.#renderProfile();
    if (this.#films === 0) {
      this.#renderNoFilms();
    }

    this.#renderFilter();
    this.#renderSort();
    this.#renderFilmsList();
    this.#renderFilmsStatistic();
  }
}
