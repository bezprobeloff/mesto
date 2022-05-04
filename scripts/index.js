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

const togglePopup = popup => popup.classList.toggle('popup_opened');

const onButtonEdit = () => {
  togglePopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const onButtonAdd = () => togglePopup(popupAddCard);

const onButtonClosePopupProfile = () => togglePopup(popupProfile);

const onButtonClosePopupAddCard = () => togglePopup(popupAddCard);

const onFormSubmitProfile = evt => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupProfile);
}

// реакции на кнопки открытия попапов
profileEditButton.addEventListener('click', onButtonEdit);
profileAddButton.addEventListener('click', onButtonAdd)

// реакции на кнопки закрытия попапов
buttonClosePopupProfile.addEventListener('click', onButtonClosePopupProfile);
buttonClosePopupAddCard.addEventListener('click', onButtonClosePopupAddCard);

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
