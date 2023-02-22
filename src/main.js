import MainPresenter from './presenter/main-presenter.js';

const headerSiteElement = document.querySelector('.header');
const mainSiteElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const mainPresenter = new MainPresenter({header: headerSiteElement, main: mainSiteElement, footer: footerElement});


mainPresenter.initHeader();
mainPresenter.initMain();
mainPresenter.initFooter();
