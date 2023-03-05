/* eslint-disable no-unused-expressions */
import { createElement } from '../render.js';

function createPopupTopContainerTemplate({movie}){
  const {filmInfo} = movie;
  const filmGenres = filmInfo.genre[0];

  const renderFilmDetailsPoster = () => {`<div class="film-details__poster">
    <img class="film-details__poster-img" src="./images/posters/${filmInfo.poster}" alt="">

    <p class="film-details__age">${filmInfo.ageRating}</p>
  </div>`;
  };
  const renderFilmDetailsInfo = () => {`<div class="film-details__info-head">
  <div class="film-details__title-wrap">
    <h3 class="film-details__title">${filmInfo.title}</h3>
    <p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
  </div>

  <div class="film-details__rating">
    <p class="film-details__total-rating">${filmInfo.totalRating}</p>
  </div>
</div>`;};
  const renderGenreTemplate = (genres) => (
    `<td class="film-details__term">${
      genres.length > 1 ? 'Genres' : 'Genre'
    }</td>
    <td class="film-details__cell">
      ${genres.map((genre) => (
      `<span class="film-details__genre">${genre}</span>`
    )).join('')}</td>`
  );
  const renderFIlmDetailsTable = () => {`<tr class="film-details__row">
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
  <td class="film-details__cell">${filmInfo.release.date}</td>
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
</tr>`;};

  return `
  <div class="film-details__top-container">
  <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
  <div class="film-details__info-wrap">
        ${renderFilmDetailsPoster()}
    <div class="film-details__info">
        ${renderFilmDetailsInfo()}
      <table class="film-details__table">
        ${renderFIlmDetailsTable()}
      </table>

      <p class="film-details__film-description">
        ${filmInfo.description}
      </p>
    </div>
  </div>

  <section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>
</div>
  `;
}

export default class FilmDetailsTopContainer {
  movie = null;

  constructor ({movie}) {
    this.movie = movie;
  }

  getTemplate(){
    return createPopupTopContainerTemplate(this.movie);
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
