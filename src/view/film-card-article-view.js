import { createElement } from '../render.js';

function createFilmCardArticleTemplate({movie, comments}){
  const {filmInfo, userDetails} = movie;
  const commentsLength = comments.length;

  const isActiveStatus = (status) => status ? 'film-card__controls-item--active' : '';

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">${filmInfo.duration}</span>
          <span class="film-card__genre">${filmInfo.genre}</span>
        </p>
        <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description}</p>
        <span class="film-card__comments">${commentsLength} comment${commentsLength > 1 ? 's' : ''}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActiveStatus(userDetails.watchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isActiveStatus(userDetails.alreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isActiveStatus(userDetails.favorite)}" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
}

export default class FilmCardArticle {
  movie = null;
  comments = [];

  constructor({movie, comments}) {
    this.movie = movie;
    this.comments = comments;
  }

  getTemplate(){
    return createFilmCardArticleTemplate({movie: this.movie, comments: this.comments});
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
