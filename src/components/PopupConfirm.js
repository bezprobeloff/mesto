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

  setEventListeners() {
    super.setEventListeners();
  }

  open(item) {
    super.open();
    //this._handleConfirmClick = this._handleConfirm(item);
    //console.log(this._handleConfirmClick);
    this._handleConfirmClick = this._handleConfirmClick.bind(null, item);
    this._buttonConfirm.addEventListener('click', this._handleConfirmClick);
  }

  close() {
    super.close();
    this._buttonConfirm.removeEventListener('click', this._handleConfirmClick);
  }
}
