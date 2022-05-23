const showInputError = (input) => {
  const inputError = document.querySelector(`.popup__input-error_type_${input.id}`);

  input.classList.add('popup__input_type_error');
  inputError.textContent = input.validationMessage;
};

const hideInputError = (input) => {
  const inputError = document.querySelector(`.popup__input-error_type_${input.id}`);

  input.classList.remove('popup__input_type_error');
  inputError.textContent = '';
};

const isValid = (input) => {
  if (!input.validity.valid) {
    showInputError(input);
  } else {
    hideInputError(input);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

const toggleButtonSubmitState = (inputList, buttonSubmit) => {
  if(hasInvalidInput(inputList)) {
    buttonSubmit.classList.add('popup__button_disabled');
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove('popup__button_disabled');
    buttonSubmit.disabled = false;
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonSubmit = form.querySelector('.popup__button_type_submit');

  toggleButtonSubmitState(inputList, buttonSubmit);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(input);

      toggleButtonSubmitState(inputList, buttonSubmit);
    });
  });
};

const enableValidation = () => {
  const forms = Array.from(document.forms);

  forms.forEach(form => {
    setEventListeners(form);
  });
};

enableValidation();
