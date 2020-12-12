import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
    setEventListeners() {
        this._popupSelector.addEventListener("submit", (evt) => {
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
}