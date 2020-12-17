export default class FormValidator {
    constructor(data, form) {
        this._form = form;
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
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
        const closeImage = this._form.querySelector(".popup__close-image");
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._inputs.forEach((input) => {
            input.addEventListener("input", (evt) => {
                this._checkInputValidity(input, evt.target);
                this._toggleButtonState(input, buttonElement, form);
            });
        });

        this._form.parentElement.addEventListener("click", (evt) => {
            if (evt.target !== evt.currentTarget && evt.target !== closeImage) {
                return;
            }
            this._resetInputErrors();
        });

        this._toggleButtonState(
            this._form.querySelector(this._inputSelector),
            buttonElement,
            form
        );
    }

    saveButtonDisabler(buttonElement) {
        buttonElement = this._form.querySelector(this._submitButtonSelector);
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    }

    enableValidation() {
        const form = this._form;
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventlistener(form);
    }

    _resetInputErrors() {
        this._inputs.forEach((input) => {
            this._hideError(input);
        });
    }
}