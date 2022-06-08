import Card from './Card.js';

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
const nameCardInputErrorText = formAddCard.querySelector('.popup__input-error_type_card-name');
const linkCardInputErrorText = formAddCard.querySelector('.popup__input-error_type_card-link');

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

const initializeFormProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // генерация события инпут для корректной валидации
  nameInput.dispatchEvent(new Event('input'));
  jobInput.dispatchEvent(new Event('input'));
};

const onButtonEdit = () => {
  initializeFormProfile();
  openPopup(popupProfile);
};

const initializeFormAddCard = () => {
  formAddCard.reset();
  nameCardInput.dispatchEvent(new Event('input'));
  linkCardInput.dispatchEvent(new Event('input'));
  nameCardInput.classList.remove('popup__input_type_error');
  linkCardInput.classList.remove('popup__input_type_error');
  nameCardInputErrorText.textContent = '';
  linkCardInputErrorText.textContent = '';
};

const onButtonAdd = () => {
  initializeFormAddCard();
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


const renderCard = (card) => {
  const cardElement = new Card(card, '.template-card');
  cardsSection.prepend(cardElement.generateCard());
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

// закрытие попапа по Esc
document.addEventListener('keydown', onKeyEscClosePopup);

// закрытие попапа по клику вне попапа
document.addEventListener('mousedown', onOverlayClosePopup);

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
formAddCard.addEventListener('submit', onFormSubmitAddCard);

// рендер карточек
renderCards(initialCards);
