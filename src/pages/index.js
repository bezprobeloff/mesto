import './index.css';
import {
  initialCards,
  formSelectors,
  userNameSelector,
  userJobSelector,
  userNameInput,
  userJobInput,
  profileEditButton,
  profileAddButton,
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

const formValidators = {};

const enableValidationForms = () => {
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    const formValidator = new FormValidator(formSelectors, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = formValidator;
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

const createCard = ({ name, link}) => {
  const card = new Card({
    name,
    link,
    handleCardClick: () => {
        popupWithImage.open({ name, link});
    }
  }, cardTemplateSelector);
  const cardElement = card.generateCard();

  return cardElement;
};

const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
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
      formValidators['formEditProfile'].resetValidation();
    },
    handleSubmit: evt => {
      evt.preventDefault();

      const inputValues = popupEditProfile.getInputValues();
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
      formValidators['formAddCard'].resetValidation();
    },
    handleSubmit: evt => {
      evt.preventDefault();

      const inputValues = popupAddCard.getInputValues();
      const cardItem = {
        name: inputValues['card-name'],
        link: inputValues['card-link']
      };

      const cardElement = createCard(cardItem);
      cardList.addItem(cardElement);
      popupAddCard.close();
    }
  },
  popupAddCardSelector,
);
popupAddCard.setEventListeners();
profileAddButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));
