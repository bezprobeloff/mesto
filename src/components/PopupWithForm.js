import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ initializeForm, handleSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._initializeForm = initializeForm;
    this._handleSubmit = handleSubmit;
    this._inputList = this._form.querySelectorAll('input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList
      .forEach(item => {
        inputValues[item.name] = item.value;
      });
    return inputValues;
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
