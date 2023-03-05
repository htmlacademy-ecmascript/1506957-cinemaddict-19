import { createElement } from '../render.js';

const renderComments = (comments) => `<ul class="film-details__comments-list">${comments.map((comment) => `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
</span>
<div>
  <p class="film-details__comment-text">${comment.comment}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${comment.author}</span>
    <span class="film-details__comment-day">${comment.date}</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`)}
</ul>`;

function createPopupBottomContainerTemplate(film){
  const {comments} = film;

  return `
  <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        ${renderComments(comments)}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
  `;
}

export default class FilmDetailsBottomContainer {
  film = null;

  constructor (film){
    this.film = film;
  }

  getTemplate(){
    return createPopupBottomContainerTemplate(this.film);
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
