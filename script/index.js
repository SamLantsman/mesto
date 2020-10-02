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
    let nameInput = document.querySelector(".popup__text_type_name");
    let jobInput = document.querySelector(".popup__text_type_job");

    let name = nameInput.value;
    let job = jobInput.value;

    let newName = document.querySelector(".profile__name");
    let newJob = document.querySelector(".profile__job-title");

    newName.textContent = name;
    newJob.textContent = job;
}

formElement.addEventListener("click", formSubmitHandler);