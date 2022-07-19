import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ initializeForm, handleSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__button_type_submit');
    this._buttonSubmitTextDefault = this._buttonSubmit.textContent;
    this._initializeForm = initializeForm;
    this._handleSubmit = handleSubmit;
    this._inputList = this._form.querySelectorAll('input');
  }

  getInputValues() {
    const inputValues = {};
    this._inputList
      .forEach(item => {
        inputValues[item.name] = item.value;
      });
    return inputValues;
  }

  // введем другой текст кнопке отправки
  setTextButton(text) {
    this._buttonSubmit.textContent = text;
  }
  // вернем текст по умолчанию
  resetTextButton() {
    this.setTextButton(this._buttonSubmitTextDefault);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  open() {
    this._initializeForm();
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
};
