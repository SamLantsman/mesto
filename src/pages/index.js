import "./index.css";
import Card from "../script/components/Card.js";
import Section from "../script/components/Section.js";
import renderLoading from "../script/utils/utils.js";
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
    popupAvatar,
    buttonOpenPopupEditProfile,
    buttonOpenPopupAddCard,
    buttonOpenPopupUpdateAvatar,
    popupUpdateAvatarForm,
    popupUpdateAvatarSelector,
    popupEditProfileForm,
    popupEditProfileSelector,
    popupProfile,
    popupAddCardForm,
    popupAddCard,
    popupDeleteCardSelector,
    popupDelete,
    popupFullImageSelector,
    cardTemplateSelector,
    gallerySectionSelector,
    popupAddCardSelector,
    place,
    link,
    data,
} from "../script/utils/constants.js";
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
        renderLoading(true, popupProfile);
        const userInfo = api.updateUserInfo(formData);
        userInfo
            .then((data) => {
                user.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, popupProfile);
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

const popupAddCardValidation = new FormValidator(data, popupAddCardForm);
popupAddCardValidation.enableValidation();

const popupUpdateAvatar = new PopupWithForm({
    popupSelector: popupUpdateAvatarSelector,
    handleFormSubmit: () => {
        renderLoading(true, popupAvatar);
        const newAvatar = api.updateAvatar(avatarInput.value);
        newAvatar
            .then((data) => {
                avatar.src = data.avatar;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, popupAvatar);
                popupUpdateAvatar.close();
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
                            renderLoading(true, popupDelete);
                            api
                                .deleteCard(cardId)
                                .then(() => {
                                    card.removeCard();
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                                .finally(() => {
                                    popupDeleteCard.close();
                                    renderLoading(false, popupDelete);
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
        const popupAddCardForm = new PopupWithForm({
            popupSelector: popupAddCardSelector,
            handleFormSubmit: () => {
                const newCard = { name: place.value, link: link.value };
                renderLoading(true, popupAddCard);

                const renderNewCard = api.addNewCard(newCard);

                renderNewCard
                    .then((data) => {
                        generateCard(data);
                        place.value = "";
                        link.value = "";

                        popupAddCardValidation.saveButtonDisabler();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        popupAddCardForm.close();
                        renderLoading(false, popupAddCard);
                    });
            },
        });
        popupAddCardForm.setEventListeners();

        buttonOpenPopupAddCard.addEventListener("click", () => {
            popupAddCardForm.open();
        });
    })
    .catch((err) => {
        console.log(err);
    });