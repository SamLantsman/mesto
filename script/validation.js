const showError = (form, input, { errorClass, inputErrorClass }) => {
    const errorElement = form.querySelector(`#${input.id}-${errorClass}`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);

}

const hideError = (form, input, { errorClass, inputErrorClass }) => {
    const errorElement = form.querySelector(`#${input.id}-${errorClass}`);
    errorElement.textContent = '';
    input.classList.remove(inputErrorClass);
}

const checkInputValidity = (form, input, rest) => {
    if (input.checkValidity()) {
        console.log(input.checkValidity());
        hideError(form, input, rest);
    } else {
        showError(form, input, rest);
    }
};

function toggleButtonState(form, buttonElement, { inactiveButtonClass }) {
    if (form.checkValidity()) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function setEventlistener(form, { inputSelector, submitButtonSelector, ...rest }) {
    const inputElements = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);

    inputElements.forEach((input) => {

        input.addEventListener('input', (evt) => {
            checkInputValidity(form, evt.target, rest);
            toggleButtonState(form, buttonElement, rest);
        });
    });
    toggleButtonState(form, buttonElement, rest);
}

function enableValidation({ formSelector, ...rest }) {
    const formElements = Array.from(document.querySelectorAll(formSelector));
    formElements.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventlistener(form, rest);
    })
}

enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: '.popup__text_invalid',
    errorClass: 'error'
})