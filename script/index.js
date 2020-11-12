import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import {
    gallery,
    nameInput,
    jobInput,
    nameElement,
    jobElement,
    buttonClosePopupFullImage,
    buttonOpenPopupEditProfile,
    buttonClosePopupEditProfile,
    buttonOpenPopupAddCard,
    buttonClosePopupAddCard,
    saveButtonEditProfile,
    popupEditProfile,
    popupAddCard,
    popupFullImage,
    saveButtonAddCard,
    place,
    link,
    data,
} from "./constants.js";
import { closePopup, openPopup, backgroundPopupCloser } from "./utils.js";
import { FormValidator } from "./FormValidator.js";

buttonOpenPopupEditProfile.addEventListener("click", () => {
    openPopup(popupEditProfile);
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
});

buttonClosePopupEditProfile.addEventListener("click", () => {
    closePopup(popupEditProfile);

});

buttonOpenPopupAddCard.addEventListener("click", () => {
    openPopup(popupAddCard);
});

buttonClosePopupAddCard.addEventListener("click", () => {
    closePopup(popupAddCard);
});

buttonClosePopupFullImage.addEventListener("click", () => {
    closePopup(popupFullImage);
});

saveButtonEditProfile.addEventListener("click", formSubmitHandler);

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

popupEditProfile.addEventListener("click", backgroundPopupCloser);

popupAddCard.addEventListener("click", backgroundPopupCloser);

popupFullImage.addEventListener("click", backgroundPopupCloser);

initialCards.forEach((item) => {
    const card = new Card(item, ".template");
    const cardElement = card.generateCard();
    gallery.append(cardElement);
});

saveButtonAddCard.addEventListener("click", (evt) => {
    evt.preventDefault();

    const data = { name: place.value, link: link.value };
    const card = new Card(data, ".template");
    const cardElement = card.generateCard();
    gallery.prepend(cardElement);

    closePopup(popupAddCard);

    place.value = "";
    link.value = "";
});

const popupEditProfileValidation = new FormValidator(data, popupEditProfile);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(data, popupAddCard);
popupAddCardValidation.enableValidation();