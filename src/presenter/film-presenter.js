import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {
  #filmsListContainer = null;
  #bodyElement = null;
  #film = null;
  #comments = [];
  #filmCardComponent = null;
  #popupComponent = null;
  #handleDataChange;

  constructor({filmsListContainer, bodyElement, onDataChange}){
    this.#filmsListContainer = filmsListContainer;
    this.#bodyElement = bodyElement;
    this.#handleDataChange = onDataChange;
  }

  init(film, comments){
    this.#film = film;
    this.#comments = comments;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

    // console.log(this.#film, this.#comments)
    this.#filmCardComponent = new FilmCardView({
      film: this.#film,
      onCardClick: this.#handlePopupClick(),
      onAddToWishlistClick: this.#handleAddToWishlistClick,
      onMarkAsWatchedClick: this.#handleMarkAsWatchedClick,
      onAddToFavourite: this.#handleAddToFavourite
    });

    this.#popupComponent = new PopupView({
      film,
      comments: film.comments.map((commentId) => this.#comments[commentId]),
      onEscClick: this.#handlePopupCloseButtonClick()
    }
    );

    if (prevFilmCardComponent === null || prevPopupComponent === null ){
      render(this.#filmCardComponent, this.#filmsListContainer);
      return;
    }

    if (this.#filmsListContainer.contains(prevFilmCardComponent.element)){
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#filmsListContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }
  }

  destroy(){
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
  }

  #handleAddToWishlistClick () {

  }

  #handleMarkAsWatchedClick(){

  }

  #handleAddToFavourite(){

  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'ESC') {
      evt.preventDefault();
      this.#replacePopuptoCard.call(this);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handlePopupCloseButtonClick (){
    this.#replacePopuptoCard();
  }

  #handlePopupClick() {
    this.#replaceCardtoPopup();
  }

  #replaceCardtoPopup() {
    this.#bodyElement.appendChild(this.#popupComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#bodyElement.classList.add('hide-overflow');
  }

  #replacePopuptoCard() {
    this.#popupComponent.element.remove();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#bodyElement.classList.remove('hide-overflow');
  }
}
