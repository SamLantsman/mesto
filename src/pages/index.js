import "./index.css";
import { initialCards } from "../script/initialCards.js";
import Card from "../script/components/Card.js";
import Section from "../script/components/Section.js";
import {
    nameImput,
    jobImput,
    buttonOpenPopupEditProfile,
    buttonOpenPopupAddCard,
    popupEditProfile,
    popupAddCard,
    place,
    link,
    data,
} from "../script/constants.js";
import FormValidator from "../script/components/FormValidator.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";

buttonOpenPopupEditProfile.addEventListener("click", () => {
    const inputValues = user.getUserInfo();

    nameImput.value = inputValues.userName;
    jobImput.value = inputValues.userJob;

    PopupEditProfile.open();
});

buttonOpenPopupAddCard.addEventListener("click", () => {
    PopupAddCard.open();
});

const popupEditProfileValidation = new FormValidator(data, popupEditProfile);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(data, popupAddCard);
popupAddCardValidation.enableValidation();

const fullImagePopup = new PopupWithImage(initialCards, ".popup__image");
fullImagePopup.setEventListeners();

const generateCard = (data) => {
    const card = new Card({
            data: data,
            handleCardClick: (data) => {
                fullImagePopup.open(data);
            },
        },
        ".template"
    );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
};

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            generateCard(item);
        },
    },
    ".gallery"
);
cardList.renderItems();

const PopupAddCard = new PopupWithForm({
    popupSelector: ".popup__add-card",
    handleFormSubmit: () => {
        const data = { name: place.value, link: link.value };
        generateCard(data);

        place.value = "";
        link.value = "";

        popupAddCardValidation.saveButtonDisabler();
        PopupAddCard.close();
    },
});

const user = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__job",
});

PopupAddCard.setEventListeners();

const PopupEditProfile = new PopupWithForm({
    popupSelector: ".popup__edit-profile",
    handleFormSubmit: (formData) => {
        user.setUserInfo(formData);
        PopupEditProfile.close();
    },
});

PopupEditProfile.setEventListeners();