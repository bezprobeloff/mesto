import {
  initialCards,
  formSelectors,
  userNameSelector,
  userJobSelector,
  userNameInput,
  userJobInput,
  profileEditButton,
  profileAddButton,
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

const enableValidationForms = () => {
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    const formValidator = new FormValidator(formSelectors, form);
    formValidator.enableValidation();
  });
};

enableValidationForms();

const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  jobSelector: userJobSelector
});

const popupWithImage = new PopupWithImage(popupViewImageSelector);
popupWithImage.setEventListeners();

const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card({
          name: cardItem.name,
          link: cardItem.link,
          handleCardClick: () => {
            popupWithImage.open(cardItem);
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
      const cardItem = {
        name: inputValues['card-name'],
        link: inputValues['card-link']
      };

      const card = new Card({
        name: cardItem.name,
        link: cardItem.link,
        handleCardClick: () => {
            popupWithImage.open({cardItem});
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
