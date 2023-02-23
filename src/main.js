import MainPresenter from './presenter/main-presenter.js';
import MoviesModel from './model/movies-model.js';

const headerSiteElement = document.querySelector('.header');
const mainSiteElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const moviesModel = new MoviesModel();
const mainPresenter = new MainPresenter({
  header: headerSiteElement,
  main: mainSiteElement,
  footer: footerElement,
  moviesModel
});

mainPresenter.initHeader();
mainPresenter.initMain();
mainPresenter.initFooter();
