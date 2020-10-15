let buttonOpenPopupEditProfile = document.querySelector(".profile__edit-button");
let popupEditProfile = document.querySelector(".popup__edit-profile");
let buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
let popupAddCard = document.querySelector(".popup__add-card");
let buttonClosePopupEditProfile = popupEditProfile.querySelector(".popup__close-image");
let buttonClosePopupAddCard = popupAddCard.querySelector(".popup__close-image");
let saveButtonEditProfile = popupEditProfile.querySelector(".popup__save-button");
let saveButtonAddCard = popupAddCard.querySelector(".popup__save-button");


const gallery = document.querySelector(".gallery")
const template = document.querySelector('.template');

const openPopup = function(data) {
    data.classList.add("popup_is-opened")
}

const closePopup = function(data) {
    data.classList.remove("popup_is-opened");
}

buttonOpenPopupEditProfile.addEventListener("click", () => {
    openPopup(popupEditProfile);
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
    let Input = document.querySelectorAll(".popup__text");

    let name = Input[0].value;
    let job = Input[1].value;

    let newName = document.querySelector(".profile__name");
    let newJob = document.querySelector(".profile__job");

    newName.textContent = name;
    newJob.textContent = job;
}

saveButtonEditProfile.addEventListener("click", formSubmitHandler);

saveButtonAddCard.addEventListener("click", (evt) => {
    evt.preventDefault();
    let input = popupAddCard.querySelectorAll(".popup__text");

    let Name = input[0].value;
    let Link = input[1].value;

    let data = { name: Name, link: Link }

    const card = getCards(data);

    gallery.prepend(card);

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

const Toggle = () => {
    let popupIsOpened = document.querySelector(".image-popup");

    popupIsOpened.classList.toggle("image-popup_is-opened");
}

const getCards = (data) => {
    const card = template.content.cloneNode(true);

    card.querySelector('.card__heading').innerText = data.name;
    card.querySelector('.card__image').src = data.link;

    let buttonLike = card.querySelector(".card__like");

    buttonLike.addEventListener('click', () => {
        buttonLike.classList.toggle('card__like_clicked');
    });

    let buttonRemove = card.querySelector(".card__delete");

    buttonRemove.addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    });

    let openPopup = card.querySelector(".card__image");
    let closePopup = document.querySelector(".image-popup__close-image");


    openPopup.addEventListener('click', Toggle);
    closePopup.addEventListener('click', Toggle);

    openPopup.addEventListener('click', () => {

        let fullImage = document.querySelector(".image-popup__image");
        let fullImageText = document.querySelector(".image-popup__caption");

        fullImage.src = openPopup.src;
        fullImageText.textContent = data.name;
    })

    return card;

};

renderCards();