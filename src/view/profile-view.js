import AbstractView from '../framework/view/abstract-view.js';

function createProfileTemplate() {
  return `
  <section class="header__profile profile">
<p class="profile__rating">Film Buff</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>
  `;
}

export default class ProfileView extends AbstractView {
  #element = null;

  get template() {
    return createProfileTemplate();
  }
}
