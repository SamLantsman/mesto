import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
    setEventListeners() {
        this._popupSelector.addEventListener("submit", (evt) => {
            this._popupSelector.querySelector(".popup__save-button").textContent =
                "Удаляю...";
            evt.preventDefault();
            this._handleSubmitCallback();
        });
        super.setEventListeners();
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

    _handleSubmitCallback() {
        this._handleSubmitCallback();
    }

    setSubmitButtonText(text) {
        this._popupSelector.querySelector(".popup__save-button").textContent = text;
    }
}