let profileSection = document.querySelector('.profile');
let profileName = profileSection.querySelector('.profile__name');
let profileJob = profileSection.querySelector('.profile__job');
let profileEditButton = profileSection.querySelector('.profile__button-edit');

let popupSection = document.querySelector('.popup');
let buttonClosePopup = popupSection.querySelector('.popup__button-close');
let formElement = popupSection.querySelector('.popup__form');
let nameInput = formElement.querySelector(".popup__input_type_user-name");
let jobInput = formElement.querySelector(".popup__input_type_user-job");

function togglePopup() {
  popupSection.classList.toggle('popup_opened');
}

function clickEditButtonHandler () {
  togglePopup();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

profileEditButton.addEventListener('click', clickEditButtonHandler);
buttonClosePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
