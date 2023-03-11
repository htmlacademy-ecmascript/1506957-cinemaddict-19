import { render, remove } from '../framework/render.js';
import ProfileView from '../view/profile-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmsStatisticsView from '../view/films-statistics-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmCardView from '../view/film-card-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListEmptyContainerView from '../view/films-list-empty-view.js';
import PopupView from '../view/popup-view.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #profileComponent = new ProfileView();
  #filterComponent = new FilterView();
  #sortComponent = new SortView();
  #filmsStatistic = new FilmsStatisticsView();
  #filmsSection = new FilmsSectionView();
  #filmsListEmptyContainer = new FilmsListEmptyContainerView();
  #filmsListSection = new FilmsListSectionView();
  #loadMoreButton;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #header;
  #main;
  #footer;
  #body;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #comments = [];

  constructor({header, main, footer, body, filmsModel, commentsModel}){
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#body = body;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init(){
    render(this.#profileComponent, this.#header);

    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    render(this.#filterComponent, this.#main);
    render(this.#sortComponent, this.#main);
    render(this.#filmsSection, this.#main);
    render(this.#filmsListSection, this.#filmsSection.element);

    if (this.#films.length === 0) {
      render(this.#filmsListEmptyContainer, this.#filmsListSection.element);
      return;
    }

    for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilmCardView({film: this.#films[i], comments: this.#comments});
    }


    // for (const film of this.#films) {
    //   this.#renderFilmCardView({film: film, comments: this.#comments});
    // }

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#loadMoreButton = new LoadMoreButtonView({
        onClick: this.#handleLoadMoreButtonClick
      });
      render(this.#loadMoreButton, this.#filmsListSection.element);
    }
    render(this.#filmsStatistic, this.#footer);
  }

  #handleLoadMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCardView({film: film, comments: this.#comments}));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#loadMoreButton.element);
    }
  };

  #renderFilmCardView({film, comments}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'ESC') {
        evt.preventDefault();
        replacePopuptoCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const filmCardComponent = new FilmCardView({
      film,
      onCardClick: () => {
        replaceCardtoPopup.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
        this.#body.classList.add('hide-overflow');
      }
    });

    const popupComponent = new PopupView({
      film: film,
      comments: comments,
      onEscClick: () => {
        replacePopuptoCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
        this.#body.classList.remove('hide-overflow');
      }
    });

    function replaceCardtoPopup() {
      this.#body.appendChild(popupComponent.element);
    }

    function replacePopuptoCard() {
      popupComponent.element.remove();
    }

    render(filmCardComponent, this.#filmsListSection.element.querySelector('.films-list__container'));
  }

}
