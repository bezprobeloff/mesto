export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    // добавление слушателя на закрытие попапа по Esc
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // удаление слушателя на закрытие попапа по Esc
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key !== 'Escape') return;

    this.close();
  }

  _handleClose(evt) {
    if (evt.target.classList.contains('popup__button-close')
          || evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  setEventListeners() {
    // реакции на кнопки и по оверлей для закрытия попапов
    this._popup.addEventListener('mousedown', this._handleClose);
  }
};
