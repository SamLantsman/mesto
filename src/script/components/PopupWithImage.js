import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._link = data.link;
        this._name = data.name;

    }
    open() {
        this._popupSelector.querySelector('.popup__image-picture').src = this._link;
        this._popupSelector.querySelector('.popup__caption').textContent = this._name;
        this._popupSelector.querySelector('.popup__image-picture').alt = this._name;
        super.open();
    }
}