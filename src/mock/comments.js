import { getRandomArrayElement } from '../utils/common';
import { COMMENT_EMOTION } from '../const/const.js';
import { AUTHORS, COMMENTS } from './const/comments-const.js';
import { getRandomTime } from '../utils/time.js';

const COMMENTS_COUNT = 2;

const createComment = (index) => ( {
  'id': index.toString(),
  'author': getRandomArrayElement(AUTHORS),
  'comment': getRandomArrayElement(COMMENTS),
  'date': getRandomTime(),
  'emotion': getRandomArrayElement(COMMENT_EMOTION)
}
);

const comments = Array.from({length: COMMENTS_COUNT}, (_, index) => createComment(index)); // UPPERCASE ???

const getCommentsIds = comments.map((comment) => comment.id);

export { comments, COMMENTS_COUNT, getCommentsIds };
