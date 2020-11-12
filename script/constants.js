export const gallery = document.querySelector(".gallery");
export const fullImage = document.querySelector(".popup__image-picture");
export const fullImageText = document.querySelector(".popup__caption");
export const popupFullImage = document.querySelector(".popup__image");
export const popupAddCard = document.querySelector(".popup__add-card");
export const saveButtonAddCard = popupAddCard.querySelector(
    ".popup__save-button"
);
export const place = document.querySelector(".popup__text-place");
export const link = document.querySelector(".popup__text-image");

export const popupEditProfile = document.querySelector(".popup__edit-profile");

export const buttonOpenPopupEditProfile = document.querySelector(
    ".profile__edit-button"
);
export const buttonOpenPopupAddCard = document.querySelector(
    ".profile__add-button"
);

export const buttonClosePopupEditProfile = popupEditProfile.querySelector(
    ".popup__close-image"
);
export const buttonClosePopupAddCard = popupAddCard.querySelector(
    ".popup__close-image"
);

export const buttonClosePopupFullImage = popupFullImage.querySelector(
    ".popup__close-image"
);

export const saveButtonEditProfile = popupEditProfile.querySelector(
    ".popup__save-button"
);

export const nameElement = document.querySelector(".profile__name");
export const jobElement = document.querySelector(".profile__job");

export const nameInput = document.querySelector(".popup__text-name");
export const jobInput = document.querySelector(".popup__text-job");

export const data = {
    formSelector: ".popup__content",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popup__text_invalid",
    errorClass: "error",
};