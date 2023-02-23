import { createMockComments } from '../mock/comments.js';

export default class MoviesModel {
  comments = createMockComments;

  getComments() {
    return this.comments;
  }
}
