import './index.css';
import { initialCards } from "../script/initialCards.js";
import Card from "../script/components/Card.js";
import Section from "../script/components/Section.js";
import {
    gallery,
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
    PopupEditProfile.open();
});

buttonOpenPopupAddCard.addEventListener("click", () => {
    PopupAddCard.open();
});

const popupEditProfileValidation = new FormValidator(data, popupEditProfile);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(data, popupAddCard);
popupAddCardValidation.enableValidation();

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card({
                    data: item,
                    handleCardClick: () => {
                        const popup = new PopupWithImage(item, ".popup__image");
                        popup.open();
                        popup.setEventListeners();
                    },
                },
                ".template"
            );
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        },
    },
    ".gallery"
);
cardList.renderItems();

const PopupAddCard = new PopupWithForm({
    popupSelector: ".popup__add-card",
    handleFormSubmit: () => {
        const data = { name: place.value, link: link.value };
        const card = new Card({
                data: data,
                handleCardClick: () => {},
            },
            ".template"
        );
        const cardElement = card.generateCard();
        gallery.prepend(cardElement);

        place.value = "";
        link.value = "";

        popupAddCardValidation.saveButtonDisabler();
        PopupAddCard.close();
    },
});

PopupAddCard.setEventListeners();

const PopupEditProfile = new PopupWithForm({
    popupSelector: ".popup__edit-profile",
    handleFormSubmit: (formData) => {
        const user = new UserInfo({
            nameSelector: ".popup__text-name",
            jobSelector: ".popup__text-job",
        });
        user.setUserInfo(formData);
        PopupEditProfile.close();
        user.getUserInfo(formData);
    },
});

PopupEditProfile.setEventListeners();