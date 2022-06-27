export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const userNameSelector = '.profile__name';
export const userJobSelector = '.profile__job';
export const userNameInput = document.querySelector(".popup__input_type_user-name");
export const userJobInput = document.querySelector(".popup__input_type_user-job");
export const cardNameInput = document.querySelector(".popup__input_type_card-name");
export const cardLinkInput = document.querySelector(".popup__input_type_card-link");
export const cardNameInputErrorText = document.querySelector('.popup__input-error_type_card-name');
export const cardLinkInputErrorText = document.querySelector('.popup__input-error_type_card-link');

export const cardListSection = '.cards';
export const cardTemplateSelector = '.template-card';
export const viewImageSelector = '.popup__view-image';
export const viewImageDescriptionSelector = '.popup__description';
export const popupViewImageSelector = '.popup_type_view-image';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupAddCardSelector = '.popup_type_add-card';