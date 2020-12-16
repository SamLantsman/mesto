import Popup from "./Popup.js";
import renderLoading from "./utils.js";
export default class PopupWithSubmit extends Popup {
    setEventListeners() {
        this._popupSelector.addEventListener("submit", (evt) => {
            renderLoading(true, this._popupSelector);
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

    setSubmitButtonText() {
        renderLoading(false, this._popupSelector);
    }
}