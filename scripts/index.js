import Card from './Card.js';
import FormValidator from './FormValidator.js';

const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputTextErrorSelector: '.popup__input-error'
};

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

const handleKeyEscClosePopup = evt => {
  if (evt.key !== 'Escape') return;

  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
};

const initializeFormProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // генерация события инпут для корректной валидации
  nameInput.dispatchEvent(new Event('input'));
  jobInput.dispatchEvent(new Event('input'));
};

const handleButtonEdit = () => {
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

const handleButtonAdd = () => {
  initializeFormAddCard();
  openPopup(popupAddCard);
};

const handleClosePopup = evt => {
  if (evt.target.classList.contains('popup__button-close')
        || evt.target.classList.contains('popup')) {
    closePopup(evt.target.closest('.popup'));
  }
};

const handleFormSubmitProfile = evt => {
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

const handleFormSubmitAddCard = evt => {
  evt.preventDefault();

  renderCard({name: nameCardInput.value, link: linkCardInput.value});
  closePopup(popupAddCard);
};

const enableValidationForms = () => {
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    const formValidator = new FormValidator(formSelectors, form);
    formValidator.enableValidation();
  });
};

// реакции на кнопки открытия попапов
profileEditButton.addEventListener('click', handleButtonEdit);
profileAddButton.addEventListener('click', handleButtonAdd);

// реакции на кнопки и по оверлей для закрытия попапов
document.addEventListener('mousedown', handleClosePopup);

// закрытие попапа по Esc
document.addEventListener('keydown', handleKeyEscClosePopup);

// отправка формы
formProfile.addEventListener('submit', handleFormSubmitProfile);
formAddCard.addEventListener('submit', handleFormSubmitAddCard);

// рендер карточек
renderCards(initialCards);
enableValidationForms();
