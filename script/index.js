console.log("Hello world!");


let buttonOpenPopup = document.querySelector(".profile-info__edit-button");
let buttonClosePopup = document.querySelector(".popup__close-image");
let popup = document.querySelector(".popup");
let popupInternal = document.querySelector(".popup__content");

function popupToggle() {
    popup.classList.toggle("popup_is-opened");
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle);

let formElement = document.querySelector(".popup__save-button");

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector(".input__text_type_name");
    let jobInput = document.querySelector(".input__text_type_description");
    popupToggle
}

formElement.addEventListener("click", formSubmitHandler);
formElement.addEventListener("click", popupToggle)