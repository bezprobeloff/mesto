const initialCards = [
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

// попап просмотра фото
const popupViewImage = document.querySelector('.popup_type_view-image');
const buttonClosePopupViewImage = popupViewImage.querySelector('.popup__button-close');
const viewImageElement = popupViewImage.querySelector('.popup__view-image');
const imageDescription = popupViewImage.querySelector('.popup__description');

const openPopup = popup => popup.classList.add('popup_opened');

const closePopup = popup => popup.classList.remove('popup_opened');

const onButtonEdit = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
};

const onButtonAdd = () => {
  formAddCard.reset();
  openPopup(popupAddCard);
};

const onButtonClosePopupProfile = () => closePopup(popupProfile);

const onButtonClosePopupViewImage = () => closePopup(popupViewImage);

const onButtonClosePopupAddCard = () => closePopup(popupAddCard);

const onFormSubmitProfile = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

const onButtonLike = (evt) => {
  evt.target.classList.toggle('card__button-like_activated');
};

const onViewImage = (card) => {
  viewImageElement.src = card.link;
  viewImageElement.alt = card.name;
  imageDescription.textContent = card.name;
  openPopup(popupViewImage);
};

const onButtonRemoveCard = (evt) => {
  const card = evt.target.closest('.card');
  card.remove();
};

const createCard = (card) => {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');
  const cardButtonRemove = cardElement.querySelector('.card__button-remove');
  const cardButtonLike = cardElement.querySelector('.card__button-like');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => onViewImage(card));
  cardName.textContent = card.name;
  cardButtonRemove.addEventListener('click', onButtonRemoveCard);
  cardButtonLike.addEventListener('click', onButtonLike);

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
buttonClosePopupProfile.addEventListener('click', onButtonClosePopupProfile);
buttonClosePopupAddCard.addEventListener('click', onButtonClosePopupAddCard);
buttonClosePopupViewImage.addEventListener('click', onButtonClosePopupViewImage);

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
formAddCard.addEventListener('submit', onFormSubmitAddCard);

renderCards(initialCards);
