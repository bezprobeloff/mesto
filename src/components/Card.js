export default class Card {
  constructor({ name, link, likes = [], _id, owner = {}, userId, handleCardClick, handleRemoveCardClick, handleButtonLike}, cardSelector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._ownerId = owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._handleButtonLike = handleButtonLike.bind(this);

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setCountLikes(likes) {
    this._cardElement.querySelector('.card__count-like')
      .textContent = likes.length;
  }

  _getStateLike() {
    return this._likes
    .find(owner => owner._id === this._userId);
  }

  renderLikes(likes) {
    this.setLikes(likes);
    this._setCountLikes(this._likes);
    if(this._getStateLike()) {
      this._cardElement.querySelector('.card__button-like')
        .classList.add('card__button-like_activated');
    } else {
      this._cardElement.querySelector('.card__button-like')
        .classList.remove('card__button-like_activated');
    }
  }

  _setEventListeners() {
    this._cardElement.querySelector('.card__button-like')
      .addEventListener('click', () => this._handleButtonLike());

    this._cardElement.querySelector('.card__button-remove')
      .addEventListener('click', () => this._handleRemoveCardClick());

    this._cardElement.querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick());
  }

  getId() {
    return this._id;
  }

  getLikes() {
    return this._likes;
  }

  setLikes(likes) {
    this._likes = likes;
  }

  remove() {
    this._cardElement.remove();
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this.renderLikes(this._likes);
    this._setEventListeners();
    const cardImage = this._cardElement.querySelector('.card__image');
    const cardName = this._cardElement.querySelector('.card__name');

    const cardButtonRemove = this._cardElement.querySelector('.card__button-remove');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;

    if(this._ownerId !== this._userId) {
      cardButtonRemove.remove();
    }

    return this._cardElement;
  }
}
