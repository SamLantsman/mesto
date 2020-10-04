let buttonOpenPopup = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close-image");
let popup = document.querySelector(".popup");
let saveButton = document.querySelector(".popup__save-button")

function popupToggle() {
    popup.classList.toggle("popup_is-opened");
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle);
saveButton.addEventListener("click", popupToggle);


let formElement = document.querySelector(".popup__save-button");

function formSubmitHandler(evt) {
    evt.preventDefault();
    let Input = document.querySelectorAll(".popup__text");

    let name = Input[0].value;
    let job = Input[1].value;

    let newName = document.querySelector(".profile__name");
    let newJob = document.querySelector(".profile__job");

    newName.textContent = name;
    newJob.textContent = job;
}

formElement.addEventListener("click", formSubmitHandler);