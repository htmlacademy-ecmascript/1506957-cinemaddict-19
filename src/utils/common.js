const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomElementsArray = (arr, length) => {
  const value = [];
  // eslint-disable-next-line eqeqeq
  while (value.length != length) {
    const newElement = getRandomArrayElement(arr);
    value.push(newElement);
  }
  return value;
};

const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomIntegerWithDot = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

const renameSpacetoDashAndLowerCase = (str) => (str.replace(/ /g, '-')).toLowerCase();

function isTaskInWatchlist(inWatchlist){
  return ;
}

export {getRandomArrayElement, getRandomElementsArray, getRandomInteger, renameSpacetoDashAndLowerCase, getRandomIntegerWithDot};
