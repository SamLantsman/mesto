const popupEditProfile = document.querySelector(".popup__edit-profile");
const popupAddCard = document.querySelector(".popup__add-card");
const popupFullImage = document.querySelector(".popup__image");

const buttonOpenPopupEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");

const buttonClosePopupEditProfile = popupEditProfile.querySelector(".popup__close-image");
const buttonClosePopupAddCard = popupAddCard.querySelector(".popup__close-image");
const buttonClosePopupFullImage = popupFullImage.querySelector(".popup__close-image");


const saveButtonEditProfile = popupEditProfile.querySelector(".popup__save-button");
const saveButtonAddCard = popupAddCard.querySelector(".popup__save-button");

const nameElement = document.querySelector(".profile__name");
const jobElement = document.querySelector(".profile__job");

const nameInput = document.querySelector(".popup__text-name");
const jobInput = document.querySelector(".popup__text-job");

const place = document.querySelector(".popup__text-place")
const link = document.querySelector(".popup__text-image");

const fullImage = document.querySelector(".popup__image-picture");
const fullImageText = document.querySelector(".popup__caption");

const gallery = document.querySelector(".gallery")

const template = document.querySelector('.template');

const toggle = (popup) => {
    popup.classList.toggle("popup_is-opened");
}

buttonOpenPopupEditProfile.addEventListener("click", () => {
    toggle(popupEditProfile);
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
});

buttonOpenPopupAddCard.addEventListener("click", () => {
    toggle(popupAddCard)
});

buttonClosePopupEditProfile.addEventListener("click", () => {
    toggle(popupEditProfile);
});

buttonClosePopupAddCard.addEventListener("click", () => {
    toggle(popupAddCard);
});

buttonClosePopupFullImage.addEventListener('click', () => {
    toggle(popupFullImage)
});

saveButtonEditProfile.addEventListener('click', formSubmitHandler);

saveButtonAddCard.addEventListener("click", (evt) => {
    evt.preventDefault();

    const data = { name: place.value, link: link.value }

    const card = getCards(data);

    gallery.prepend(card);

    toggle(popupAddCard);

    place.value = '';
    link.value = '';
});


function formSubmitHandler(evt) {
    evt.preventDefault();

    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    toggle(popupEditProfile);
};

const backgroundPopupCloser = (evt) => {

    const overlay = document.querySelector('.popup_is-opened');
    if (evt.target !== evt.currentTarget) {
        return
    }
    toggle(overlay);
};

popupEditProfile.addEventListener('click', backgroundPopupCloser);

popupAddCard.addEventListener('click', backgroundPopupCloser);

popupFullImage.addEventListener('click', backgroundPopupCloser);

const escPopupCloser = (evt) => {
    const overlay = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        toggle(overlay)
    }
};

document.addEventListener('keydown', escPopupCloser);

const renderCards = () => {
    const cards = initialCards.map(element => getCards(element));

    gallery.prepend(...cards);
};


const getCards = (data) => {
    const card = template.content.cloneNode(true);

    card.querySelector('.card__heading').innerText = data.name;
    card.querySelector('.card__image').src = data.link;

    const buttonLike = card.querySelector(".card__like");

    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('card__like_clicked');
    });

    const buttonRemove = card.querySelector(".card__delete");

    buttonRemove.addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    });

    const openPopup = card.querySelector(".card__image");

    openPopup.addEventListener('click', () => {
        toggle(popupFullImage);

        fullImage.src = openPopup.src;
        fullImageText.textContent = data.name;

    })

    return card;

};

renderCards();