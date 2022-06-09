export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._popupViewImage = document.querySelector('.popup_type_view-image');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _onButtonLike = evt => {
    const buttonLike = evt.target;

    if (!buttonLike.classList.contains('card__button-like')) return;

    buttonLike.classList.toggle('card__button-like_activated');
  }

  _onViewImage = evt => {
    const cardImage = evt.target;

    if (!cardImage.classList.contains('card__image')) return;

    const imageElement = this._popupViewImage.querySelector('.popup__view-image');
    const imageDescription = this._popupViewImage.querySelector('.popup__description');

    imageElement.src = this._link;
    imageElement.alt = this._name;
    imageDescription.textContent = this._name;
    this._openPopup(this._popupViewImage);
  }

  _onButtonRemoveCard = evt => {
    const buttonRemoveCard = evt.target;

    if (!buttonRemoveCard.classList.contains('card__button-remove')) return;

    const card = buttonRemoveCard.closest('.card');
    card.remove();
  }

  _openPopup = popup => popup.classList.add('popup_opened');

  _setEventListeners() {
    this._cardElement.addEventListener('click', (evt) => this._onButtonLike(evt));
    this._cardElement.addEventListener('click', (evt) => this._onButtonRemoveCard(evt));
    this._cardElement.addEventListener('click', (evt) => this._onViewImage(evt));
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._cardElement.querySelector('.card__image');
    const cardName = this._cardElement.querySelector('.card__name');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;

    return this._cardElement;
  }
}
