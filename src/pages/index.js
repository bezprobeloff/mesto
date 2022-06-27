import './styles/index.css';
import {
  initialCards,
  formSelectors,
  userNameSelector,
  userJobSelector,
  profileEditButton,
  profileAddButton,
  cardListSection,
  cardTemplateSelector,
  popupViewImageSelector,
  popupEditProfileSelector,
  popupAddCardSelector
} from '../utils/constants.js';

import {
  initializeEditProfileForm,
  initializeAddCardForm
} from '../utils/utils.js';

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
      initializeEditProfileForm(userData);
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
      initializeAddCardForm();
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
