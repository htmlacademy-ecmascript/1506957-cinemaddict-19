import { createComments } from '../mock/comments.js';

export default class CommentsModel {
  comments = createComments;

  getComments() {
    return this.comments;
  }
}
