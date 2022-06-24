export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    // добавление слушателя на закрытие попапа по Esc
    document.addEventListener('keydown', this._handleEscLose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // удаление слушателя на закрытие попапа по Esc
    document.removeEventListener('keydown', this._handleEscLose);
  }

  _handleEscLose(evt) {
    if (evt.key !== 'Escape') return;

    this.close();
    //const openedPopup = document.querySelector('.popup_opened');
    //closePopup(openedPopup);
  }

  _handleClose(evt) {
    //скорее всего рефакторить надо
    if (evt.target.classList.contains('popup__button-close')
          || evt.target.classList.contains('popup')) {
      this.close().bind(this);
    }
  };

  setEventListeners() {
    // реакции на кнопки и по оверлей для закрытия попапов
    this._popup.addEventListener('mousedown', this._handleClose);
  }
};
