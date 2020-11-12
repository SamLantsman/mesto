export class FormValidator {
    constructor(data, form) {
        this._form = form;
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }

    _showError(input) {
        this._form.querySelector(`#${input.id}-${this._errorClass}`).textContent =
            input.validationMessage;
        input.classList.add(this._inputErrorClass);
    }

    _hideError(input) {
        this._form.querySelector(`#${input.id}-${this._errorClass}`).textContent =
            "";
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(input) {
        if (input.checkValidity()) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    _toggleButtonState(input) {
        if (input.checkValidity()) {
            this._form
                .querySelector(this._submitButtonSelector)
                .classList.remove(this._inactiveButtonClass);
            this._form.querySelector(this._submitButtonSelector).disabled = false;
        } else {
            this._form
                .querySelector(this._submitButtonSelector)
                .classList.add(this._inactiveButtonClass);
            this._form.querySelector(this._submitButtonSelector).disabled = true;
        }
    }

    _setEventlistener() {
        const inputElements = Array.from(
            this._form.querySelectorAll(this._inputSelector)
        );
        inputElements.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState(input);
            });
            this._toggleButtonState(input);
        });
    }

    enableValidation() {
        this._form
            .querySelector(this._formSelector)
            .addEventListener("submit", (evt) => {
                evt.preventDefault();
            });

        this._setEventlistener();
    }
}