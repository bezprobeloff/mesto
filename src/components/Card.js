export default class Card {
  constructor({ name, link, likes, _id, handleCardClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._handleCardClick = handleCardClick;
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

  _handleButtonLike = evt => {
    evt.target.classList.toggle('card__button-like_activated');
  }

  _handleButtonRemoveCard = (evt) => {
    const card = evt.target.closest('.card');
    card.remove();
  }

  _setEventListeners() {
    this._cardElement.querySelector('.card__button-like')
      .addEventListener('click', (evt) => this._handleButtonLike(evt));

    this._cardElement.querySelector('.card__button-remove')
      .addEventListener('click', (evt) => this._handleButtonRemoveCard(evt));

    this._cardElement.querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick());
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._cardElement.querySelector('.card__image');
    const cardName = this._cardElement.querySelector('.card__name');
    const cardLikes = this._cardElement.querySelector('.card__count-like');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;
    cardLikes.textContent = this._likes.length;

    return this._cardElement;
  }
}
