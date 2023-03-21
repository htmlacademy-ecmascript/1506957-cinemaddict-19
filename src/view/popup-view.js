/* eslint-disable no-unused-expressions */
import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import { COMMENT_EMOTION } from '../const/const.js';
import { getRandomReleaseDate } from '../utils/time.js';

const renderFilmDetailsEmoji = COMMENT_EMOTION.map((emoji) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
  <label class="film-details__emoji-label" for="emoji-${emoji}">
  <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>`).join('');

function createPopupTemplate({film, comments}){
  const {filmInfo, userDetails: {watchlist, alreadyWatched, favorite}} = film;
  const filmGenres = filmInfo.genre[0];
  const isActiveButtonStatus = (status) => status ? 'film-details__control-button--active' : '';

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
          <span class="film-details__comment-day">${comments[commentID].date}</span>
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
      <td class="film-details__cell">${dayjs(getRandomReleaseDate()).format('DD MMMM YYYY')}</td>
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
    <button type="button" class="film-details__control-button ${isActiveButtonStatus(watchlist)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button ${isActiveButtonStatus(alreadyWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button ${isActiveButtonStatus(favorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>
</div>`;

  const renderBottomContainer = () => `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">${renderComments()}
    </ul>

    <form class="film-details__new-comment" action="" method="get">
      <div class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${renderFilmDetailsEmoji}
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

export default class PopupView extends AbstractView {
  #film = null;
  #comments = null;
  #handlerClosePopup = null;

  constructor({film, comments, onEscClick}){
    super();
    this.#film = film;
    this.#comments = comments;
    this.#handlerClosePopup = onEscClick;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupHandler);
  }

  get template(){
    return createPopupTemplate({film: this.#film, comments: this.#comments});
  }

  #closePopupHandler = (evt) => {
    evt.preventDefault();
    this.#handlerClosePopup();
  };

}
