import "./index.css";
import { initialCards } from "../script/initialCards.js";
import Card from "../script/components/Card.js";
import Section from "../script/components/Section.js";
import {
    nameImput,
    jobImput,
    profileJob,
    profileName,
    avatarInput,
    avatar,
    buttonOpenPopupEditProfile,
    buttonOpenPopupAddCard,
    buttonOpenPopupUpdateAvatar,
    popupSaveButton,
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
import Api from "../script/components/Api.js";
import PopupWithSubmit from "../script/components/PopupWithSubmit";

buttonOpenPopupEditProfile.addEventListener("click", () => {
    const inputValues = user.getUserInfo();

    nameImput.value = inputValues.userName;
    jobImput.value = inputValues.userJob;

    PopupEditProfile.open();
});

buttonOpenPopupUpdateAvatar.addEventListener("click", () => {
    PopupUpdateAvatar.open();
});

const popupEditProfileValidation = new FormValidator(data, popupEditProfile);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(data, popupAddCard);
popupAddCardValidation.enableValidation();

const fullImagePopup = new PopupWithImage(initialCards, ".popup__image");
fullImagePopup.setEventListeners();

const user = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__job",
});

const PopupEditProfile = new PopupWithForm({
    popupSelector: ".popup__edit-profile",
    handleFormSubmit: (formData) => {
        const userInfo = api.updateUserInfo(formData);
        userInfo.then((data) => {
                user.setUserInfo(data);
            })
            .finally(() => {
                PopupEditProfile.setSubitButtonText("Сохранить");
            });

        PopupEditProfile.close();
    },
});

const PopupUpdateAvatar = new PopupWithForm({
    popupSelector: ".popup__update-avatar",
    handleFormSubmit: () => {
        const newAvatar = api.updateAvatar(avatarInput.value);
        newAvatar.then((data) => {
            avatar.src = data.avatar;
            PopupUpdateAvatar.close();
        }).finally(() => {
            PopupUpdateAvatar.setSubitButtonText("Сохранить");
        });
    },
});

PopupUpdateAvatar.setEventListeners();

PopupEditProfile.setEventListeners();

const api = new Api({
    url: "https://mesto.nomoreparties.co./v1/cohort-18/",
    headers: {
        authorization: "009139ff-d881-4763-b796-0ba6b710c85a",
        "Content-Type": "application/json",
    },
});

const userInfo = api.getUserInfo();

let userId = null;

userInfo
    .then((data) => {
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
        avatar.src = data.avatar;
        userId = data._id;
    })
    .catch();

const cardInfo = api.getCardsInfo();

cardInfo.then((data) => {
    const PopupDeleteCard = new PopupWithSubmit(".popup__delete-card");

    PopupDeleteCard.setEventListeners();
    const generateCard = (data) => {
        const card = new Card({
                data: data,
                handleCardClick: (data) => {
                    fullImagePopup.open(data);
                },
                handleDeleteIconClick: (cardId) => {
                    PopupDeleteCard.setSubmitAction(() => {
                        api.deleteCard(cardId).then(() => {
                            PopupDeleteCard.close();
                            card.removeCard();
                        });
                    });
                    PopupDeleteCard.open();
                },
                handleLikeClick: (cardId, isLiked) => {
                    if (!isLiked) {
                        const addLike = api.addLike(cardId);
                        addLike.then((data) => {
                            card.addLike(data);
                        });
                    } else {
                        const removeLike = api.removeLike(cardId);
                        removeLike.then((data) => {
                            card.removeLike(data);
                        });
                    }
                },
            },
            userId,
            ".template",
            api
        );
        const cardElement = card.generateCard();

        cardList.addItem(cardElement);
    };

    const cardList = new Section({
            items: data,
            renderer: (item) => {
                generateCard(item);
            },
        },
        ".gallery",
        api
    );

    cardList.renderItems();
    const PopupAddCard = new PopupWithForm({
        popupSelector: ".popup__add-card",
        handleFormSubmit: () => {
            const newCard = { name: place.value, link: link.value };

            const renderNewCard = api.addNewCard(newCard);

            renderNewCard
                .then((data) => {
                    generateCard(data);
                    place.value = "";
                    link.value = "";

                    popupAddCardValidation.saveButtonDisabler();
                    PopupAddCard.close();
                })
                .finally(() => {
                    PopupAddCard.setSubitButtonText("Создать");;
                });
        },
    });
    PopupAddCard.setEventListeners();

    buttonOpenPopupAddCard.addEventListener("click", () => {
        PopupAddCard.open();
    });
});