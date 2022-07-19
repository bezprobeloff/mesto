import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({handleConfirmClick}, popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector('.popup__button_type_confirm');
    this._buttonConfirmTextDefault = this._buttonConfirm.textContent;
    this._handleConfirmClick = handleConfirmClick;
  }

  // введем другой текст кнопке отправки
  setTextButton(text) {
    this._buttonConfirm.textContent = text;
  }
  // вернем текст по умолчанию
  resetTextButton() {
    this.setTextButton(this._buttonConfirmTextDefault);
  }

  /*
  // передадим другой хендл сабмита
  setHandleSubmit(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }
  */

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
