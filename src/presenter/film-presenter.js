import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #filmsListContainer = null;
  #bodyElement = null;
  #film = null;
  #comments = [];
  #mode = Mode.DEFAULT;

  #filmCardComponent = null;
  #popupComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({filmsListContainer, bodyElement, onDataChange, onModeChange}){
    this.#filmsListContainer = filmsListContainer;
    this.#bodyElement = bodyElement;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(film, comments){
    this.#film = film;
    this.#comments = comments;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmCardComponent = new FilmCardView({
      film: this.#film,
      onCardClick: this.#handlePopupClick, /// Надо # ?
      onAddToWishlistClick: this.#handleAddToWishlistClick,
      onMarkAsWatchedClick: this.#handleMarkAsWatchedClick,
      onAddToFavourite: this.#handleAddToFavourite
    });

    this.#popupComponent = new PopupView({
      film,
      comments: film.comments.map((commentId) => this.#comments[commentId]),
      onEscClick: this.#handlePopupCloseButtonClick
    }
    );

    if (prevFilmCardComponent === null || prevPopupComponent === null ){
      render(this.#filmCardComponent, this.#filmsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#popupComponent, prevPopupComponent);
    }
  }

  destroy(){
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
  }

  resetView(){
    if (this.mode !== Mode.DEFAULT){
      this.#replacePopuptoCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'ESC') {
      evt.preventDefault();
      this.#replacePopuptoCard.call(this);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handlePopupCloseButtonClick = () => {
    this.#replacePopuptoCard();
  };

  #handlePopupClick = () => {
    console.log('11')
    this.#replaceCardtoPopup();
  };

  #replaceCardtoPopup() {
    this.#bodyElement.classList.add('hide-overflow');
    console.log(this.#popupComponent.element)
    console.log(this.#bodyElement)
    this.#bodyElement.appendChild(this.#popupComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
  }

  #replacePopuptoCard() {
    this.#bodyElement.classList.remove('hide-overflow');
    this.#popupComponent.element.remove();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleAddToWishlistClick = () => {
    this.#handleDataChange({...this.#film, userDetails: {...!this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
  };

  #handleMarkAsWatchedClick = () => {
    this.#handleDataChange({...this.#film, userDetails: {...!this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  };

  #handleAddToFavourite = () => {
    this.#handleDataChange({...this.#film, userDetails: {...!this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
  };

}
