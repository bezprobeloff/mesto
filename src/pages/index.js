import {
  initialCards,
  userNameSelector,
  userJobSelector,
  userNameInput,
  userJobInput,
  cardNameInput,
  cardLinkInput,
  cardNameInputErrorText,
  cardLinkInputErrorText,
  cardListSection,
  cardTemplateSelector,
  popupViewImageSelector,
  popupEditProfileSelector,
  popupAddCardSelector
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputTextErrorSelector: '.popup__input-error'
};




const profileSection = document.querySelector('.profile');
/*
const profileName = profileSection.querySelector('.profile__name');
const profileJob = profileSection.querySelector('.profile__job');
*/
const profileEditButton = profileSection.querySelector('.profile__button-edit');
const profileAddButton = profileSection.querySelector('.profile__button-add');

// переменные попапа редактирования профиля
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector(".popup__input_type_user-name");
const jobInput = formProfile.querySelector(".popup__input_type_user-job");

// переменные попапа добавления карточки
/*
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCardInput = formAddCard.querySelector(".popup__input_type_card-name");
const linkCardInput = formAddCard.querySelector(".popup__input_type_card-link");
const nameCardInputErrorText = formAddCard.querySelector('.popup__input-error_type_card-name');
const linkCardInputErrorText = formAddCard.querySelector('.popup__input-error_type_card-link');
*/
/*
const openPopup = popup => {
  popup.classList.add('popup_opened');
  // добавление слушателя на закрытие попапа по Esc
  document.addEventListener('keydown', handleKeyEscClosePopup);
};
*/
/*
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  // удаление слушателя на закрытие попапа по Esc
  document.removeEventListener('keydown', handleKeyEscClosePopup);
};
*/

/*
const handleKeyEscClosePopup = evt => {
  if (evt.key !== 'Escape') return;

  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
};
*/

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
  // генерация события инпут для корректной валидации
  nameCardInput.dispatchEvent(new Event('input'));
  linkCardInput.dispatchEvent(new Event('input'));
  // если первый раз открыть и ввести в что-то и сразу очистить и закрыть
  // то при повторном открытии сохраняются ошибки, поэтому очищаем ошибки
  nameCardInput.classList.remove('popup__input_type_error');
  linkCardInput.classList.remove('popup__input_type_error');
  nameCardInputErrorText.textContent = '';
  linkCardInputErrorText.textContent = '';
};

const handleButtonAdd = () => {
  initializeFormAddCard();
  openPopup(popupAddCard);
};

/*
const handleClosePopup = evt => {
  if (evt.target.classList.contains('popup__button-close')
        || evt.target.classList.contains('popup')) {
    closePopup(evt.target.closest('.popup'));
  }
};
*/

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
//profileEditButton.addEventListener('click', handleButtonEdit);
//profileAddButton.addEventListener('click', handleButtonAdd);

/*
// реакции на кнопки и по оверлей для закрытия попапов
document.addEventListener('mousedown', handleClosePopup);
*/

// отправка формы
//formProfile.addEventListener('submit', handleFormSubmitProfile);
//formAddCard.addEventListener('submit', handleFormSubmitAddCard);

const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  jobSelector: userJobSelector
});

const popupWithImage = new PopupWithImage(popupViewImageSelector);
popupWithImage.setEventListeners();
//profileAddButton.addEventListener('click', popupWithImage.open.bind(popupWithImage));


const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card({
          name: cardItem.name,
          link: cardItem.link,
          handleCardClick: () => {
            const popup = popupWithImage.getPopupElement();
            const imageElement = popup.querySelector('.popup__view-image');
            const imageDescription = popup.querySelector('.popup__description');
            imageElement.src = card._link;
            imageElement.alt = card._name;
            imageDescription.textContent = card._name;

            popupWithImage.open();
          }
        },
        cardTemplateSelector
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardListSection
);
// рендер карточек
cardList.renderedItems();


const popupEditProfile = new PopupWithForm({
    initializeForm: () => {
      const userData = userInfo.getUserInfo();
      userNameInput.value = userData.name;
      userJobInput.value = userData.job;
      // генерация события инпут для корректной валидации
      userNameInput.dispatchEvent(new Event('input'));
      userJobInput.dispatchEvent(new Event('input'));
    },
    handleSubmit: evt => {
      evt.preventDefault();

      const inputValues = popupEditProfile._getInputValues();
      userInfo.setUserInfo(inputValues);

      popupEditProfile.close();
    }
  },
  popupEditProfileSelector
);
popupEditProfile.setEventListeners();
profileEditButton.addEventListener('click', popupEditProfile.open.bind(popupEditProfile));

const popupAddCard = new PopupWithForm({
    initializeForm: () => {
      // генерация события инпут для корректной валидации
      cardNameInput.dispatchEvent(new Event('input'));
      cardLinkInput.dispatchEvent(new Event('input'));
      // если первый раз открыть и ввести в что-то и сразу очистить и закрыть
      // то при повторном открытии сохраняются ошибки, поэтому очищаем ошибки
      cardNameInput.classList.remove('popup__input_type_error');
      cardLinkInput.classList.remove('popup__input_type_error');
      cardNameInputErrorText.textContent = '';
      cardLinkInputErrorText.textContent = '';
    },
    handleSubmit: evt => {
      evt.preventDefault();

      const inputValues = popupAddCard._getInputValues();

      const card = new Card({
        name: inputValues['card-name'],
        link: inputValues['card-link'],
        handleCardClick: () => {
          const popup = popupWithImage.getPopupElement();
          const imageElement = popup.querySelector('.popup__view-image');
          const imageDescription = popup.querySelector('.popup__description');
          imageElement.src = card._link;
          imageElement.alt = card._name;
          imageDescription.textContent = card._name;

          popupWithImage.open();
        }
      }, cardTemplateSelector);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
      popupAddCard.close();
    }
  },
  popupAddCardSelector,
);
popupAddCard.setEventListeners();
profileAddButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));


enableValidationForms();

//export { openPopup };
