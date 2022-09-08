export default class Card {
  constructor(
    {
      name,
      link,
      likes = [],
      _id,
      owner = {},
      userId,
      handleCardClick,
      handleRemoveCardClick,
      handleButtonLike,
    },
    cardSelector
  ) {
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

    this._element = this._getTemplate();
    this._nameElement = this._element.querySelector(".card__name");
    this._countLikeElement = this._element.querySelector(".card__count-like");
    this._buttonLikeElement = this._element.querySelector(".card__button-like");
    this._buttonRemoveElement = this._element.querySelector(
      ".card__button-remove"
    );
    this._imageElement = this._element.querySelector(".card__image");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setCountLikes(likes) {
    this._countLikeElement.textContent = likes.length;
  }

  _getStateLike() {
    return this._likes.find((owner) => owner._id === this._userId);
  }

  renderLikes(likes) {
    this.setLikes(likes);
    this._setCountLikes(this._likes);
    if (this._getStateLike()) {
      this._buttonLikeElement.classList.add("card__button-like_activated");
    } else {
      this._buttonLikeElement.classList.remove("card__button-like_activated");
    }
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener("click", () =>
      this._handleButtonLike()
    );

    this._buttonRemoveElement.addEventListener("click", () =>
      this._handleRemoveCardClick()
    );

    this._imageElement.addEventListener("click", () => this._handleCardClick());
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
    this._element.remove();
  }

  generateCard() {
    this.renderLikes(this._likes);
    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;

    if (this._ownerId !== this._userId) {
      this._buttonRemoveElement.remove();
    }

    return this._element;
  }
}
