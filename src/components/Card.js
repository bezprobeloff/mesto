export default class Card {
  constructor({ name, link, likes = [], _id, owner = false, handleCardClick, removeCard, toggleLike}, cardSelector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._handleCardClick = handleCardClick;
    this._removeCard = removeCard.bind(this);
    this._toggleLike = toggleLike.bind(this);
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

  _handleButtonLike = evt => {
    this._toggleLike(this._id, this._likes)
      .then(res => {
        this._likes = res.likes;
        this._setCountLikes(this._likes);
      });
    evt.target.classList.toggle('card__button-like_activated');
  }

  _handleButtonRemoveCard = (evt) => {
    this._removeCard(this._id);
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
    const cardButtonRemove = this._cardElement.querySelector('.card__button-remove');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;
    cardLikes.textContent = this._likes.length;

    if(!this._owner) {
      cardButtonRemove.remove();
    }

    return this._cardElement;
  }
}
