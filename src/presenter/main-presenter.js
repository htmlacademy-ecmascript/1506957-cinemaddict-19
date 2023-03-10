import { render } from '../render.js';
import ProfileView from '../view/profile-view.js';
import NavigationView from '../view/navigation-view.js';
import Filter from '../view/filter-view.js';
import FilmsStatistics from '../view/films-statistics.js';
import FilmsSection from '../view/films-section-view.js';
import FilmsListContainer from '../view/films-list-container.js';
import FilmsListSection from '../view/films-list-section-view.js';
import FilmsListSectionTitle from '../view/films-list-section-title-view.js';
import FilmCardArticle from '../view/film-card-article-view.js';
import LoadMoreButton from '../view/load-more-button-view.js';
import FilmsListSectionExtra from '../view/films-list-section-extra-view.js';

const FILMS_COUNT_PER_PAGE = 5;
const EXTRA_FILMS_COUNT = 2;

export default class MainPresenter{
  profileInHeader = new ProfileView();
  navigationInMain = new NavigationView();
  filterInMain = new Filter();
  filmsStatisicOnFooter = new FilmsStatistics();
  filmsSection = new FilmsSection();
  filmsListSection = new FilmsListSection();
  filmsListSectionTitle = new FilmsListSectionTitle();
  filmsListContainer = new FilmsListContainer();
  // filmCard = new FilmCardArticle(); Почему если заношу в переменную, то на 45 строчке не рендериться 5 шт???
  loadMoreButton = new LoadMoreButton();

  constructor({header, main, footer}){
    this.header = header;
    this.main = main;
    this.footer = footer;

  }

  initHeader(){
    render(this.profileInHeader, this.header);
  }

  initMain(){
    render(this.navigationInMain, this.main);
    render(this.filterInMain, this.main);
    render(this.filmsSection, this.main);
    render(this.filmsListSection, this.filmsSection.getElement());
    render(this.filmsListSectionTitle, this.filmsListSection.getElement());
    render(this.filmsListContainer, this.filmsListSection.getElement());

    for (let i = 0; i < FILMS_COUNT_PER_PAGE; i++) {
      render(new FilmCardArticle(), this.filmsListContainer.getElement());
    }
    render(this.loadMoreButton, this.filmsListSection.getElement());

    for (let i = 0; i < EXTRA_FILMS_COUNT; i++){
      render(new FilmsListSectionExtra, this.filmsSection.getElement());
    }
  }

  initFooter(){
    render(this.filmsStatisicOnFooter, this.footer);
  }
}
