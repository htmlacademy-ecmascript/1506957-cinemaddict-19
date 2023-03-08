import { createComments } from '../mock/comments.js';

export default class CommentsModel {
  #comments = createComments;

  get comments() {
    return this.#comments;
  }
}
