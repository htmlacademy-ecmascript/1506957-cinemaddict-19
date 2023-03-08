import { render } from '../render.js';
import ProfileView from '../view/profile-view.js';
import NavigationView from '../view/navigation-view.js';
import Filter from '../view/filter-view.js';
import FilmsStatistics from '../view/films-statistics.js';
import FilmsSection from '../view/films-section-view.js';
import FilmsListContainer from '../view/films-list-container.js';
import FilmCard from '../view/film-card-view.js';
import LoadMoreButton from '../view/load-more-button-view.js';
import FilmsListSection from '../view/films-list-section-view.js';
import FilmsListEmptyContainer from '../view/films-list-empty.js';
import {TITLES_FOR_EXTRA} from '../const/dev-const/dev-const.js';
import PopupView from '../view/popup-view.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #profileInHeader = new ProfileView();
  #navigationInMain = new NavigationView();
  #filterInMain = new Filter();
  #filmsStatisicOnFooter = new FilmsStatistics();
  #filmsSection = new FilmsSection();
  #filmsListEmptyContainer = new FilmsListEmptyContainer();
  #filmsListSection = new FilmsListSection();
  #filmsListSectionTopRated = new FilmsListSection(true, TITLES_FOR_EXTRA.TOP_RATED);
  #filmsListSectionMostCommented = new FilmsListSection(true, TITLES_FOR_EXTRA.MOST_COMMENTED);
  #filmsListContainer = new FilmsListContainer();
  #loadMoreButton;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #header;
  #main;
  #footer;
  #body;
  #filmsModel;
  #commentsModel;
  #films = null;
  #comments = null;

  constructor({header, main, footer, body, filmsModel, commentsModel}){
    this.#header = header;
    this.#main = main;
    this.#footer = footer;
    this.#body = body;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  initHeader(){
    render(this.#profileInHeader, this.#header);
  }

  initMain(){
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    render(this.#navigationInMain, this.#main);
    render(this.#filterInMain, this.#main);
    render(this.#filmsSection, this.#main);
    render(this.#filmsListSection, this.#filmsSection.element);
    render(this.#filmsListContainer, this.#filmsListSection.element);

    if (this.#films.length === 0) {
      render(this.#filmsListEmptyContainer, this.#filmsListContainer.element);
    }

    for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilmCard({film: this.#films[i]});
    }

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#loadMoreButton = new LoadMoreButton();
      render(this.#loadMoreButton, this.#filmsListSection.element);

      this.#loadMoreButton.element.addEventListener('click', this.#loadMoreButtonClickHandler);
    }
  }

  #loadMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard({film}));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#loadMoreButton.element.remove();
      this.#loadMoreButton.removeElement();
    }
  };

  #renderFilmCard(film) {
    const filmComponent = new FilmCard({film});
    const popupComponent = new PopupView({film});

    const replaceCardtoPopup = () => this.#body.appendChild(popupComponent.element);
    const replacePopuptoCard = () => popupComponent.element.remove();
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'ESC') {
        evt.preventDefault();
        replacePopuptoCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      replaceCardtoPopup();
      document.addEventListener('keydown', escKeyDownHandler);
      this.#body.classList.add('hide-overflow');
    });
    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      replacePopuptoCard();
      document.removeEventListener('keydown', escKeyDownHandler);
      this.#body.classList.remove('hide-overflow');
    });
    render(filmComponent, this.#filmsListContainer.element);
  }

  initFooter(){
    render(this.#filmsStatisicOnFooter, this.#footer);
  }
}
