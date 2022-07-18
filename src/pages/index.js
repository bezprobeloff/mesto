import './index.css';

import {
  formSelectors,
  apiConfig,
  userNameSelector,
  userJobSelector,
  userAvatarSelector,
  userNameInput,
  userJobInput,
  profileEditButton,
  profileAddButton,
  cardListSection,
  cardTemplateSelector,
  popupViewImageSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupConfirmSelector,
  popupUpdateAvatarSelector
} from '../utils/constants.js';

import Api from '../components/Api';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const api = new Api(apiConfig);

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
// включаем валидацию форм
enableValidationForms();

const popupUpdateAvatar = new PopupWithForm({
  initializeForm: () => {
    formValidators['formUpdateAvatar'].resetValidation();
  }
},
  popupUpdateAvatarSelector
);

const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  jobSelector: userJobSelector,
  avatarSelector: userAvatarSelector,
  handleAvatarClick: () => {
    // создадим хендл сабмита для попапа
    const newHandleSubmit = (evt) => {
      evt.preventDefault();

      const avatarLink = popupUpdateAvatar.getInputValues()
          .avatar;
      api.updateAvatar(avatarLink)
        .then(res => {
          popupUpdateAvatar.setTextButtonSubmit('Сохранение...');

          userInfo.updateAvatar(res.avatar);
          popupUpdateAvatar.close();
        })
        .catch(err => {
          console.log(err);
        });
    };
    // запишем хендл
    popupUpdateAvatar.setHandleSubmit(newHandleSubmit);
    popupUpdateAvatar.setEventListeners();
    popupUpdateAvatar.open();
  }
});

userInfo.setEventListeners();

// получим данные пользователя и проинициализируем на странице
api.getUser()
  .then(data => {
    userInfo.initialize(data);
  })
  .catch(err => {
    console.log(err);
  });

const popupConfirm = new PopupWithForm({},
  popupConfirmSelector
);

popupConfirm.setEventListeners();

const popupWithImage = new PopupWithImage(popupViewImageSelector);
popupWithImage.setEventListeners();

const createCard = ({ name, link, likes, _id, owner}) => {
  const card = new Card({
    name,
    link,
    likes,
    _id,
    owner,
    userId: userInfo.getUserId(),
    handleButtonLike: () => {
      const stateLike = card.getLikes()
        .find(owner => owner._id === userInfo._id);

      if(!stateLike) {
        api.setLike(card.getId())
          .then(res => {
            card.renderLikes(res.likes);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api.removeLike(card.getId())
          .then(res => {
            card.renderLikes(res.likes);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleCardClick: () => {
        popupWithImage.open({ name, link});
    },
    handleRemoveCardClick : () => {
      // создадим хендл для попапа
      const newHandleSubmit = (evt) => {
        evt.preventDefault();

        api.removeCard(card.getId())
          .then(res => {
            card.remove();
            popupConfirm.close();
          })
          .catch(err => {
            console.log(err);
          });
      };
      // запишем хендл
      popupConfirm.setHandleSubmit(newHandleSubmit);
      popupConfirm.setEventListeners();
      popupConfirm.open();
    }
  }, cardTemplateSelector);
  const cardElement = card.generateCard();

  return cardElement;
};

//создаем класс разметки карточки с пустым массивом
const cardList = new Section({
    items: null,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardList.addItem(cardElement);
    }
  },
  cardListSection
);
// получим данные карточек из сервера
api.getInitialCards()
  .then(res => {
    const dataCards = res.map(data => {
      return {
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        owner: data.owner
      }
    });
    // передадим массив данных
    cardList.setInitialArray(dataCards);
    // и сделаем рендер карточек
    cardList.renderedItems();
  }
);

const popupEditProfile = new PopupWithForm({
    initializeForm: () => {
      const userData = userInfo.getUserInfo();
      userNameInput.value = userData.name;
      userJobInput.value = userData.job;
      formValidators['formEditProfile'].resetValidation();
    },
    handleSubmit: evt => {
      evt.preventDefault();
      popupEditProfile.setTextButtonSubmit('Сохранение...');
      const inputValues = popupEditProfile.getInputValues();
      api.setUser({name: inputValues.name, about: inputValues.job})
        .then(res => {
          userInfo.setUserInfo(inputValues);
          popupEditProfile.close();
        }
      );
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
      popupAddCard.setTextButtonSubmit('Сохранение...');
      const inputValues = popupAddCard.getInputValues();
      const cardItem = {
        name: inputValues['card-name'],
        link: inputValues['card-link']
      };

      api.createCard(cardItem)
        .then(res => {
          cardItem._id = res._id;
          cardItem.owner = res.owner;
          const cardElement = createCard(cardItem);
          cardList.addItem(cardElement);
          popupAddCard.close();
        }
      );
    }
  },
  popupAddCardSelector,
);
popupAddCard.setEventListeners();
profileAddButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));
