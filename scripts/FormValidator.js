export default class  FormValidator {
  constructor(settings, form) {
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inputTextErrorSelector = settings.inputTextErrorSelector;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(settings.inputSelector));
    this._buttonSubmit = this._form.querySelector(settings.submitButtonSelector);
  }

  _showInputError = (input) => {
    const inputError = document.querySelector(`${this._inputTextErrorSelector}_type_${input.id}`);

    input.classList.add(this._inputErrorClass);
    inputError.textContent = input.validationMessage;
  }

  _hideInputError = (input) => {
    const inputError = document.querySelector(`${this._inputTextErrorSelector}_type_${input.id}`);

    input.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
  }

  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some(input => {
      return !input.validity.valid;
    });
  }

  _toggleButtonSubmitState = () => {
    if(this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  }

  _setEventListeners = () => {
    this._toggleButtonSubmitState();

    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);

        this._toggleButtonSubmitState();
      });
    });
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
