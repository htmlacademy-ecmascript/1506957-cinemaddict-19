import { getRandomArrayElement, getRandomInteger } from '../utils/common';
import { COMMENT_EMOTION, COMMENT_ID_MIN, COMMENT_ID_MAX, AUTHORS_LIST, COMMENTS_LIST} from '../const/comments-const.js';

const createComment = () => (
  {
    'id': getRandomInteger(COMMENT_ID_MIN, COMMENT_ID_MAX),
    'author': getRandomArrayElement(AUTHORS_LIST),
    'comment': getRandomArrayElement(COMMENTS_LIST),
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': getRandomArrayElement(COMMENT_EMOTION)
  }
);

const createLocalComment = () => (
  {
    'comment': '',
    'emotion': '',
  }
);

console.log(createLocalComment());

const createMockComments = '';

export { createMockComments };
