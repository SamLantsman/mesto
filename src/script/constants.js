export const gallery = document.querySelector(".gallery");
export const popupAddCard = document.querySelector(".popup__add-card");

export const place = document.querySelector(".popup__text-place");
export const link = document.querySelector(".popup__text-image");

export const nameImput = document.querySelector(".popup__text-name");
export const jobImput = document.querySelector(".popup__text-job");

export const popupEditProfile = document.querySelector(".popup__edit-profile");

export const buttonOpenPopupEditProfile = document.querySelector(
    ".profile__edit-button"
);
export const buttonOpenPopupAddCard = document.querySelector(
    ".profile__add-button"
);
export const data = {
    formSelector: ".popup__content",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popup__text_invalid",
    errorClass: "error",
};