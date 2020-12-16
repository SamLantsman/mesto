import "./index.css";
import Card from "../script/components/Card.js";
import Section from "../script/components/Section.js";
import {
    nameImput,
    jobImput,
    profileJob,
    profileJobSelector,
    profileName,
    profileNameSelector,
    avatarInput,
    avatar,
    avatarSelector,
    buttonOpenPopupEditProfile,
    buttonOpenPopupAddCard,
    buttonOpenPopupUpdateAvatar,
    popupUpdateAvatarForm,
    popupUpdateAvatarSelector,
    popupEditProfileForm,
    popupEditProfileSelector,
    popupAddCard,
    popupDeleteCardSelector,
    popupFullImageSelector,
    cardTemplateSelector,
    gallerySectionSelector,
    popupAddCardSelector,
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

    popupEditProfile.open();
});

buttonOpenPopupUpdateAvatar.addEventListener("click", () => {
    popupUpdateAvatar.open();
});

const popupEditProfile = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (formData) => {
        const userInfo = api.updateUserInfo(formData);
        userInfo
            .then((data) => {
                user.setUserInfo(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditProfile.setSubitButtonText("Сохранить");
                popupEditProfile.close();
            });
    },
});
const popupEditProfileValidation = new FormValidator(
    data,
    popupEditProfileForm
);
popupEditProfileValidation.enableValidation();

popupEditProfile.setEventListeners();

const popupAddCardValidation = new FormValidator(data, popupAddCard);
popupAddCardValidation.enableValidation();

const popupUpdateAvatar = new PopupWithForm({
    popupSelector: popupUpdateAvatarSelector,
    handleFormSubmit: () => {
        const newAvatar = api.updateAvatar(avatarInput.value);
        newAvatar
            .then((data) => {
                avatar.src = data.avatar;
                popupUpdateAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupUpdateAvatar.setSubitButtonText("Сохранить");
            });
    },
});

popupUpdateAvatar.setEventListeners();

const popupUpdateAvatarValidation = new FormValidator(
    data,
    popupUpdateAvatarForm
);
popupUpdateAvatarValidation.enableValidation();

const user = new UserInfo({
    nameSelector: profileNameSelector,
    jobSelector: profileJobSelector,
    avatar: avatarSelector,
});

const api = new Api({
    url: "https://mesto.nomoreparties.co./v1/cohort-18/",
    headers: {
        authorization: "009139ff-d881-4763-b796-0ba6b710c85a",
        "Content-Type": "application/json",
    },
});

const userInfo = api.getUserInfo();

let userId = null;

const cardInfo = api.getCardsInfo();

Promise.all([userInfo, cardInfo])
    .then(([userInfo, cardInfo]) => {
        profileName.textContent = userInfo.name;
        profileJob.textContent = userInfo.about;
        avatar.src = userInfo.avatar;
        userId = userInfo._id;

        const popupDeleteCard = new PopupWithSubmit(popupDeleteCardSelector);

        const fullImagePopup = new PopupWithImage(cardInfo, popupFullImageSelector);
        fullImagePopup.setEventListeners();

        popupDeleteCard.setEventListeners();
        const generateCard = (cardInfo) => {
            const card = new Card({
                    data: cardInfo,
                    handleCardClick: (data) => {
                        fullImagePopup.open(data);
                    },
                    handleDeleteIconClick: (cardId) => {
                        popupDeleteCard.setSubmitAction(() => {
                            api
                                .deleteCard(cardId)
                                .then(() => {
                                    popupDeleteCard.close();
                                    card.removeCard();
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                                .finally(() => {
                                    popupDeleteCard.setSubmitButtonText();
                                });
                        });
                        popupDeleteCard.open();
                    },
                    handleLikeClick: (cardId, isLiked) => {
                        if (!isLiked) {
                            const addLike = api.addLike(cardId);
                            addLike
                                .then((data) => {
                                    card.addLike(data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        } else {
                            const removeLike = api.removeLike(cardId);
                            removeLike
                                .then((data) => {
                                    card.removeLike(data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    },
                },
                userId,
                cardTemplateSelector,
                api
            );
            const cardElement = card.generateCard();

            cardList.addItem(cardElement);
        };

        const cardList = new Section({
                items: cardInfo,
                renderer: (item) => {
                    generateCard(item);
                },
            },
            gallerySectionSelector,
            api
        );

        cardList.renderItems();
        const popupAddCard = new PopupWithForm({
            popupSelector: popupAddCardSelector,
            handleFormSubmit: () => {
                const newCard = { name: place.value, link: link.value };

                const renderNewCard = api.addNewCard(newCard);

                renderNewCard
                    .then((data) => {
                        generateCard(data);
                        place.value = "";
                        link.value = "";

                        popupAddCardValidation.saveButtonDisabler();
                        popupAddCard.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        popupAddCard.setSubitButtonText();
                    });
            },
        });
        popupAddCard.setEventListeners();

        buttonOpenPopupAddCard.addEventListener("click", () => {
            popupAddCard.open();
        });
    })
    .catch((err) => {
        console.log(err);
    });