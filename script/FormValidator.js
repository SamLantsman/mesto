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

    _toggleButtonState(input, buttonElement, form) {
        if (form.checkValidity()) {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        } else {
            this.saveButtonDisabler(buttonElement);
        }
    }

    _setEventlistener(form) {
        const inputElements = Array.from(
            this._form.querySelectorAll(this._inputSelector)
        );
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        inputElements.forEach((input) => {
            input.addEventListener("input", (evt) => {
                this._checkInputValidity(input, evt.target);
                this._toggleButtonState(input, buttonElement, form);
            });
        });

        this._toggleButtonState(
            this._form.querySelector(this._inputSelector),
            buttonElement, form
        );
    }

    saveButtonDisabler(buttonElement) {
        buttonElement = this._form.querySelector(this._submitButtonSelector);
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    }

    enableValidation() {
        const form = this._form.querySelector(this._formSelector);
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        this._setEventlistener(form);
    }
}