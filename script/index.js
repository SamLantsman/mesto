const buttonOpenPopupEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup__add-card");
const buttonClosePopupEditProfile = popupEditProfile.querySelector(".popup__close-image");
const buttonClosePopupAddCard = popupAddCard.querySelector(".popup__close-image");
const saveButtonEditProfile = popupEditProfile.querySelector(".popup__save-button");
const saveButtonAddCard = popupAddCard.querySelector(".popup__save-button");
const oldName = document.querySelector(".profile__name");
const oldJob = document.querySelector(".profile__job");
const newName = document.querySelector(".popup__text-name");
const newJob = document.querySelector(".popup__text-job");
const place = document.querySelector(".popup__text-place")
const link = document.querySelector(".popup__text-image");
const closeImagePopup = document.querySelector(".image-popup__close-image");
const fullImage = document.querySelector(".image-popup__image");
const fullImageText = document.querySelector(".image-popup__caption");



const gallery = document.querySelector(".gallery")
const template = document.querySelector('.template');

const openPopup = function(popup) {
    popup.classList.add("popup_is-opened")
}

const closePopup = function(popup) {
    popup.classList.remove("popup_is-opened");
}

buttonOpenPopupEditProfile.addEventListener("click", () => {
    openPopup(popupEditProfile);
    newName.value = oldName.textContent;
    newJob.value = oldJob.textContent;
});

buttonOpenPopupAddCard.addEventListener("click", () => {
    openPopup(popupAddCard)
});

buttonClosePopupEditProfile.addEventListener("click", () => {
    closePopup(popupEditProfile);
});

buttonClosePopupAddCard.addEventListener("click", () => {
    closePopup(popupAddCard);
});


function formSubmitHandler(evt) {
    evt.preventDefault();

    oldName.textContent = newName.value;
    oldJob.textContent = newJob.value;
    closePopup(popupEditProfile);
}

saveButtonEditProfile.addEventListener('click', formSubmitHandler);

saveButtonAddCard.addEventListener("click", (evt) => {
    evt.preventDefault();

    const data = { name: place.value, link: link.value }

    const card = getCards(data);

    gallery.prepend(card);

    closePopup(popupAddCard);

});



const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const renderCards = () => {
    const cards = initialCards.map(element => getCards(element));

    gallery.prepend(...cards);
};

const toggle = () => {
    const popupIsOpened = document.querySelector(".image-popup");

    popupIsOpened.classList.toggle("image-popup_is-opened");
}

closeImagePopup.addEventListener('click', toggle);

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


    // openPopup.addEventListener('click', );


    openPopup.addEventListener('click', () => {
        toggle();

        fullImage.src = openPopup.src;
        fullImageText.textContent = data.name;

    })

    return card;

};

renderCards();