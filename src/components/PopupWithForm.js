import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    Array.from(this._form.querySelectorAll('input'))
      .forEach(item => {
        inputValues[item.name] = item.value;
      });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
};
