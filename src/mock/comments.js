import { getRandomArrayElement, getRandomInteger } from '../utils/common';
import {COMMENT_EMOTION} from '../const/dev-const/dev-const.js';
import { AUTHORS, COMMENTS} from '../const/mock-const/comments-const.js';
import { getRandomTime } from '../utils/time.js';

const COMMENTS_COUNT = 2;
// [index]:
const createComment = (index) => ( {
  'id': index,
  'author': getRandomArrayElement(AUTHORS),
  'comment': getRandomArrayElement(COMMENTS),
  'date': getRandomTime(),
  'emotion': getRandomArrayElement(COMMENT_EMOTION)
}
);
const createComments = Array.from({length: COMMENTS_COUNT}, (_, index) => createComment(index));
const getRandomComment = getRandomArrayElement(createComments);

const createLocalComment = () => (
  {
    'comment': getRandomComment.comment,
    'emotion': getRandomComment.emotion,
  }
);

createLocalComment();

const getCommentsIds = () => {
  const offersIds = [];

  while (offersIds.length < 2) {
    const currentElement = getRandomInteger(0, createComments.length - 1);
    if (!offersIds.includes(currentElement)) {
      offersIds.push(currentElement);
    }
  }
  return offersIds;
};

export { createComments, COMMENTS_COUNT, getCommentsIds };
