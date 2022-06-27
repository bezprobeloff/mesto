import {
  userNameInput,
  userJobInput,
  cardNameInput,
  cardLinkInput,
  cardNameInputErrorText,
  cardLinkInputErrorText
} from './constants.js';

export const initializeEditProfileForm = ({ name, job}) => {
  userNameInput.value = name;
  userJobInput.value = job;
  // генерация события инпут для корректной валидации
  userNameInput.dispatchEvent(new Event('input'));
  userJobInput.dispatchEvent(new Event('input'));
};

export const initializeAddCardForm = () => {
  // генерация события инпут для корректной валидации
  cardNameInput.dispatchEvent(new Event('input'));
  cardLinkInput.dispatchEvent(new Event('input'));
  // если первый раз открыть и ввести в что-то и сразу очистить и закрыть
  // то при повторном открытии сохраняются ошибки, поэтому очищаем ошибки
  cardNameInput.classList.remove('popup__input_type_error');
  cardLinkInput.classList.remove('popup__input_type_error');
  cardNameInputErrorText.textContent = '';
  cardLinkInputErrorText.textContent = '';
};
