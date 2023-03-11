import MainPresenter from './presenter/main-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const bodyElement = document.querySelector('body');
const footerElement = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const mainPresenter = new MainPresenter({
  header: headerElement,
  main: mainElement,
  footer: footerElement,
  body: bodyElement,
  popupContainer: bodyElement,
  filmsModel,
  commentsModel
});

mainPresenter.init();
