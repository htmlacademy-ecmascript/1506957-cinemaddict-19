/* eslint-disable no-unused-expressions */
import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { COMMENT_EMOTION } from '../const/const.js';
import { getRandomReleaseDate, humanizeCommentDate } from '../utils/time.js';

// eslint-disable-next-line no-undef
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const renderEmojisTemplate = (currentEmoji) => COMMENT_EMOTION.map((emoji) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}${emoji === currentEmoji ? 'checked' : ''}">
  <label class="film-details__emoji-label" for="emoji-${emoji}">
  <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>`).join('');

function createPopupTemplate({film, comments}){
  const {filmInfo, currentEmoji, commentInput, isOnWashlist, isOnWatched, isOnFavorite} = film;
  console.log(film, film.userDetails.watchlist)
  const filmGenres = filmInfo.genre[0];
  const renderComments = () => {
    const commentsTemplate = [];
    for (const commentID of film.comments) {
      commentsTemplate.push(`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comments[commentID].emotion}.png" width="55" height="55" alt="emoji-${comments[commentID].emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comments[commentID].comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments[commentID].author}</span>
          <span class="film-details__comment-day">${(dayjs(humanizeCommentDate(comments[commentID].date, 'D MMMM YYYY')).fromNow())}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
      </li>`);
    }
    return commentsTemplate.join('');
  };

  const renderGenreTemplate = (genres) => (
    `<td class="film-details__term">${
      genres.length > 1 ? 'Genres' : 'Genre'
    }</td>
    <td class="film-details__cell">
      ${genres.map((genre) => (
      `<span class="film-details__genre">${genre}</span>`
    )).join('')}</td>`
  );

  const renderTopContainer = () => `<div class="film-details__top-container">
  <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
  <div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="">
    <p class="film-details__age">${filmInfo.ageRating}</p>
  </div>
    <div class="film-details__info">
    <div class="film-details__info-head">
    <div class="film-details__title-wrap">
      <h3 class="film-details__title">${filmInfo.title}</h3>
      <p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
    </div>

    <div class="film-details__rating">
      <p class="film-details__total-rating">${filmInfo.totalRating}</p>
    </div>
    </div>
      <table class="film-details__table">
      <tr class="film-details__row">
      <td class="film-details__term">Director</td>
      <td class="film-details__cell">${filmInfo.director}</td>
      </tr>
      <tr class="film-details__row">
      <td class="film-details__term">Writers</td>
      <td class="film-details__cell">${filmInfo.writers}</td>
      </tr>
      <tr class="film-details__row">
      <td class="film-details__term">Actors</td>
      <td class="film-details__cell">${filmInfo.actors}</td>
      </tr>
      <tr class="film-details__row">
      <td class="film-details__term">Release Date</td>
      <td class="film-details__cell">${dayjs(getRandomReleaseDate).format('DD MMMM YYYY')}</td>
      </tr>
      <tr class="film-details__row">
      <td class="film-details__term">Duration</td>
      <td class="film-details__cell">${filmInfo.duration}</td>
      </tr>
      <tr class="film-details__row">
      <td class="film-details__term">Country</td>
      <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
      </tr>
      <tr class="film-details__row">
      ${renderGenreTemplate(filmGenres)}
      </tr>
      </table>

      <p class="film-details__film-description">
        ${filmInfo.description}
      </p>
    </div>
  </div>

  <section class="film-details__controls">
    <button type="button" class="film-details__control-button ${isOnWashlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button ${isOnWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button ${isOnFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>
</div>`;

  const renderBottomContainer = () => `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">${renderComments()}
    </ul>

    <form class="film-details__new-comment" action="" method="get">
      <div class="film-details__add-emoji-label">
      ${currentEmoji ? `
      <img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-${currentEmoji}">` : ''}
      </div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentInput ? commentInput : ''}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${renderEmojisTemplate(currentEmoji)}
        </label>
      </div>
    </form>
  </section>`;
  return `
  <section class="film-details">
  <div class="film-details__inner">
        ${renderTopContainer()}
        ${renderBottomContainer()}
  </div>
  </section>
  `;
}

export default class PopupView extends AbstractStatefulView {
  #comments = null;
  #handleClosePopup = null;

  constructor({film, comments, onEscClick}){
    super();
    this._setState(PopupView.parseFilmToState(film));
    this.#comments = comments;
    this.#handleClosePopup = onEscClick;
    this._restoreHandlers();
  }

  get template(){
    return createPopupTemplate({film: this._state, comments: this.#comments});
  }

  reset(commentInput){
    this.updateElement(
      PopupView.parseFilmToState(commentInput)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emojiChangeHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  #closePopupHandler = (evt) => {
    evt.preventDefault();
    this.#handleClosePopup(PopupView.parseFilmToState(this._state));
  };

  #emojiChangeHandler = (evt) => {
    evt.preventDefault();
    // console.log('emoji')
    this.updateElement({
      ...this._state,
      currentEmoji: evt.target.value,
    });
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      commentInput: evt.target.value
    });
  };

  #watchlistClickHandler = (evt) => {
    // console.log('watchlist')
    evt.preventDefault();
    this.updateElement({
      ...this._state,
      isOnWashlist: !this._state.isOnWashlist
    });
  };

  #watchedClickHandler = (evt) => {
    // console.log('watched')
    evt.preventDefault();
    this.updateElement({
      ...this._state,
      isOnWatched: !this._state.isOnWatched
    });
  };

  #favoriteClickHandler = (evt) => {
    // console.log('favorite')
    evt.preventDefault();
    this.updateElement({
      ...this._state,
      isOnFavorite: !this._state.isOnFavorite
    });
  };


  static parseFilmToState(film) {
    return {...film,
      currentEmoji: null,
      commentInput: null,
      isOnWashlist: film.userDetails.watchlist !== null,
      isOnWatched: film.userDetails.alreadyWatched !== null,
      isOnFavorite: film.userDetails.favorite !== null
    };
  }

  static parseStateToFilm(state) {
    const film = {...state};

    if (!film.isOnWashlist) {
      film.userDetails.watchlist = null;
    }

    delete film.currentEmoji;
    delete film.commentInput;
    delete film.isOnWashlist;
    delete film.isOnWatched;
    delete film.isOnFavorite;
    return film;
  }
}
