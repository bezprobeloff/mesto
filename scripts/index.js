const templateCard = document.querySelector('.template-card').content;

const cardsSection = document.querySelector('.cards');

const profileSection = document.querySelector('.profile');
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
const profileEditButton = profileSection.querySelector('.profile__button-edit');
const profileAddButton = profileSection.querySelector('.profile__button-add');

// переменные попапа редактирования профиля
const popupProfile = document.querySelector('.popup_type_edit-profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector(".popup__input_type_user-name");
const jobInput = formProfile.querySelector(".popup__input_type_user-job");

// переменные попапа добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__button-close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCardInput = formAddCard.querySelector(".popup__input_type_card-name");
const linkCardInput = formAddCard.querySelector(".popup__input_type_card-link");
const buttonSubmitCard = formAddCard.querySelector(".popup__button_type_submit");

// попап просмотра фото
const popupViewImage = document.querySelector('.popup_type_view-image');
const buttonClosePopupViewImage = popupViewImage.querySelector('.popup__button-close');
const viewImageElement = popupViewImage.querySelector('.popup__view-image');
const imageDescription = popupViewImage.querySelector('.popup__description');

const openPopup = popup => popup.classList.add('popup_opened');

const closePopup = popup => popup.classList.remove('popup_opened');

const onKeyEscClosePopup = evt => {
  if (evt.key !== 'Escape') return;

  const openedPopups = Array.from(document.querySelectorAll('.popup_opened'));

  openedPopups.forEach(popup => {
    closePopup(popup);
  });

};

const onOverlayClosePopup = evt => {
  const overlayPopup = evt.target;

  if (!overlayPopup.classList.contains('popup_opened')) return;

  closePopup(overlayPopup);
};

const onButtonEdit = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // генерация события инпут для корректной валидации
  nameInput.dispatchEvent(new Event('input'));
  jobInput.dispatchEvent(new Event('input'));
  openPopup(popupProfile);
};

const onButtonAdd = () => {
  buttonSubmitCard.disabled = true;
  if (!buttonSubmitCard.classList.contains('popup__button_disabled')) {
    buttonSubmitCard.classList.add('popup__button_disabled');
  }
  formAddCard.reset();
  openPopup(popupAddCard);
};

const onButtonClosePopup = evt => {
  const buttonClosePopup = evt.target;

  if (!buttonClosePopup.classList.contains('popup__button-close')) {
    return;
  }

  const popup = buttonClosePopup.closest('.popup');

  if (popup) {
    popup.classList.remove('popup_opened');
  }
};

const onFormSubmitProfile = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

const onButtonLike = evt => {
  const buttonLike = evt.target;

  if (!buttonLike.classList.contains('card__button-like')) return;

  buttonLike.classList.toggle('card__button-like_activated');
};

const onViewImage = evt => {
  const cardImage = evt.target;
  const card = {};

  if (!cardImage.classList.contains('card__image')) return;

  card.link = cardImage.src;
  card.name = cardImage.alt;

  viewImageElement.src = card.link;
  viewImageElement.alt = card.name;
  imageDescription.textContent = card.name;
  openPopup(popupViewImage);
};

const onButtonRemoveCard = evt => {
  const buttonRemoveCard = evt.target;

  if (!buttonRemoveCard.classList.contains('card__button-remove')) return;

  const card = buttonRemoveCard.closest('.card');
  card.remove();
};

const createCard = (card) => {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardName.textContent = card.name;

  return cardElement;
};

const renderCard = (card) => {
  cardsSection.prepend(createCard(card));
};

const renderCards = (cards) => {
  cards.forEach(card => renderCard(card));
};

const onFormSubmitAddCard = evt => {
  evt.preventDefault();
  const card = {};
  card.name = nameCardInput.value;
  card.link = linkCardInput.value;
  renderCard(card);
  closePopup(popupAddCard);
};

// реакции на кнопки открытия попапов
profileEditButton.addEventListener('click', onButtonEdit);
profileAddButton.addEventListener('click', onButtonAdd);

// реакции на кнопки закрытия попапов
document.addEventListener('click', onButtonClosePopup);

// открытие превьюшки карты
document.addEventListener('click', onViewImage);

// удаление карточки по кнопке ведро
document.addEventListener('click', onButtonRemoveCard);

// реакция на лайк
document.addEventListener('click', onButtonLike);

// закрытие попапа по Esc
document.addEventListener('keydown', onKeyEscClosePopup);

// закрытие попапа по клику вне попапа
document.addEventListener('mousedown', onOverlayClosePopup);

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
formAddCard.addEventListener('submit', onFormSubmitAddCard);

// рендер карточек
renderCards(initialCards);
