const forms = Array.from(document.forms);

const showInputError = (input) => {
  const inputError = document.querySelector(`.popup__input-error_type_${input.id}`);

  inputError.textContent = input.validationMessage;
};

const hideInputError = (input) => {
  const inputError = document.querySelector(`.popup__input-error_type_${input.id}`);

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
    console.log(`'${input.value}'`, input.validity.valid);
    return !input.validity.valid;
  });
};

const toggleButtonSubmitState = (inputList, buttonSubmit) => {
  console.log(hasInvalidInput(inputList));
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
  const buttonSubmit = form.querySelector('.popup__button');

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
    /*
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    */

    setEventListeners(form);
  });
};

enableValidation();
