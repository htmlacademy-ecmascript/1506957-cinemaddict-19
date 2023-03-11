import AbstractView from '../framework/view/abstract-view.js';

function createLoadingFilmsViewTemplate() {
  return `
  <h2 class="films-list__title">Loading...</h2>
  `;
}
// пока что оставила и не завела отдельную вью именно под h2, потому что не знаю, как описать процесс loading
export default class LoadingFilmsView extends AbstractView {
  #element = null;

  get template(){
    return createLoadingFilmsViewTemplate();
  }

}
