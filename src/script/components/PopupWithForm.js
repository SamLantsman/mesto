import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector(".popup__content");
    }

    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll(".popup__text");
        this._formValues = {};
        this._inputList.forEach(
            (input) => (this._formValues[input.name] = input.value)
        );

        return this._formValues;
    }

    setEventListeners() {
        this._popupSelector.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();

    }
}