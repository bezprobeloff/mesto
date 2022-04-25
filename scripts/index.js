let profileSection = document.querySelector('.profile');
let profileName = profileSection.querySelector('.profile__name');
let profileJob = profileSection.querySelector('.profile__job');
let profileEditButton = profileSection.querySelector('.profile__button-edit');

let popupSection = document.querySelector('.popup');
let closeButtonPopup = popupSection.querySelector('.popup__button-close');
let formElement = popupSection.querySelector('.popup__form');
let nameInput = formElement.querySelector("input[name='name']");
let jobInput = formElement.querySelector("input[name='job']");

function clickEditButtonHandler () {
  popupSection.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function clickClosePopupButtonHandler () {
  popupSection.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupSection.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', clickEditButtonHandler);
closeButtonPopup.addEventListener('click', clickClosePopupButtonHandler);
formElement.addEventListener('submit', formSubmitHandler);

