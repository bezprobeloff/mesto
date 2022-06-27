import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link}) {
    const imageElement = this._popup.querySelector('.popup__view-image');
    const imageDescription = this._popup.querySelector('.popup__description');
    imageElement.src = link;
    imageElement.alt = name;
    imageDescription.textContent = name;
    super.open();
  }
};
