import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._link = data.link;
        this._name = data.name;
    }
    open(data) {
        const fullImage = this._popupSelector.querySelector(
            ".popup__image-picture"
        );

        fullImage.src = data.link;
        this._popupSelector.querySelector(".popup__caption").textContent =
            data.name;
        fullImage.alt = data.alt;
        super.open();
    }
}