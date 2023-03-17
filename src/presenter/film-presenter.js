import { replace, render, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {
  #filmsListContainer = null;
  #bodyElement = null;
  #film = null;
  #comments = [];
  #filmFilmCardComponent = null;
  #popupComponent = null;

  constructor({filmsListContainer, bodyElement}){
    this.#filmsListContainer = filmsListContainer;
    this.#bodyElement = bodyElement;
  }

  init(film, comments){
    this.#film = film;
    this.#comments = comments;
// console.log(this.#film, this.#comments)
    this.#filmFilmCardComponent = new FilmCardView({
      film: this.#film,
      onCardClick: () => {
        this.#replaceCardtoPopup.call(this);
        document.addEventListener('keydown', this.#escKeyDownHandler);
        this.#bodyElement.classList.add('hide-overflow');
      }
    });

    this.#popupComponent = new PopupView({
      film,
      comments: film.comments.map((commentId) => this.#comments[commentId]),
      onEscClick: () => {
        this.#replacePopuptoCard.call(this);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
        this.#bodyElement.classList.remove('hide-overflow');
      }
    });

    render(this.#filmFilmCardComponent, this.#filmsListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'ESC') {
      evt.preventDefault();
      this.#replacePopuptoCard.call(this);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardtoPopup() {
    this.#bodyElement.appendChild(this.#popupComponent.element);
  }

  #replacePopuptoCard() {
    this.#popupComponent.element.remove();
  }
}
