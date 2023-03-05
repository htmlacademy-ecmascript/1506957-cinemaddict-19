import { render } from '../render.js';
import ProfileView from '../view/profile-view.js';
import NavigationView from '../view/navigation-view.js';
import Filter from '../view/filter-view.js';
import FilmsStatistics from '../view/films-statistics.js';
import FilmsSection from '../view/films-section-view.js';
import FilmsListContainer from '../view/films-list-container.js';
import FilmCardArticle from '../view/film-card-article-view.js';
import LoadMoreButton from '../view/load-more-button-view.js';
import FilmsListSection from '../view/films-list-section-view.js';
import FilmsListEmptyContainer from '../view/films-list-empty.js';
import {TITLES_FOR_EXTRA} from '../const/dev-const/dev-const.js';

export default class MainPresenter{
  profileInHeader = new ProfileView();
  navigationInMain = new NavigationView();
  filterInMain = new Filter();
  filmsStatisicOnFooter = new FilmsStatistics();
  filmsSection = new FilmsSection();
  filmsListEmptyContainer = new FilmsListEmptyContainer();
  filmsListSection = new FilmsListSection();
  filmsListSectionTopRated = new FilmsListSection(true, TITLES_FOR_EXTRA.TOP_RATED);
  filmsListSectionMostCommented = new FilmsListSection(true, TITLES_FOR_EXTRA.MOST_COMMENTED);
  filmsListContainer = new FilmsListContainer();
  loadMoreButton = new LoadMoreButton();

  constructor({header, main, footer, moviesModel, commentsModel}){
    this.header = header;
    this.main = main;
    this.footer = footer;
    this.moviesModel = moviesModel;
    this.commentsModel = commentsModel;
  }

  initHeader(){
    render(this.profileInHeader, this.header);
  }

  initMain(){
    this.movies = [...this.moviesModel.getMovies()];
    this.comments = [...this.commentsModel.getComments()];
    render(this.navigationInMain, this.main);
    render(this.filterInMain, this.main);
    render(this.filmsSection, this.main); //
    render(this.filmsListSection, this.filmsSection.getElement());
    render(this.filmsListContainer, this.filmsListSection.getElement());

    if (this.movies.length === 0) {
      render(this.filmsListEmptyContainer, this.filmsListContainer.getElement());
    }

    for (let i = 0; i < this.movies.length; i++) {
      render(new FilmCardArticle({movie: this.movies[i], comments: this.comments}), this.filmsListContainer.getElement());
    }
    render(this.loadMoreButton, this.filmsListSection.getElement());

    render(this.filmsListSectionTopRated, this.filmsSection.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardArticle({movie: this.movies[i], comments: this.comments}), this.filmsListSectionTopRated.getElement());
    }
    render(this.filmsListSectionMostCommented, this.filmsSection.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardArticle({movie: this.movies[i], comments: this.comments}), this.filmsListSectionMostCommented.getElement());
    }
  }

  initFooter(){
    render(this.filmsStatisicOnFooter, this.footer);
  }
}
