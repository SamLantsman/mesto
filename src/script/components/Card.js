export default class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick },
        userId,
        cardSelector,
        api
    ) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._api = api;
        this._userId = userId;
        this._owner = data.owner._id;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardElement = this._element.querySelector(".card__image");
        this._element.querySelector(".card__heading").innerText = this._name;
        this._element.querySelector(
            ".card__like-counter"
        ).textContent = this._data.likes.length;

        if (this._userId == this._owner) {
            this._element.querySelector(".card__delete").style.display = "block";
        }

        if (this.isLiked()) {
            this._element
                .querySelector(".card__like")
                .classList.add("card__like_clicked");
        }
        cardElement.src = this._link;
        cardElement.alt = this._alt;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".card__like").addEventListener("click", () => {
            this._handleLikeClick(this._id, this.isLiked());
        });

        this._element
            .querySelector(".card__delete")
            .addEventListener("click", () => {
                this._handleDeleteIconClick(this._id);
            });

        const data = { name: this._name, link: this._link, alt: this._alt };

        this._element
            .querySelector(".card__image")
            .addEventListener("click", () => {
                this._handleCardClick(data);
            });
    }

    _handleOpenPopup() {
        document
            .querySelector(".popup__delete-card")
            .classList.add("popup_is-opened");
    }

    isLiked() {
        for (let i in this._data.likes) {
            if (this._data.likes[i]._id == this._userId) {
                return true;
            }
        }
        return false;
    }

    addLike(data) {
        this._element
            .querySelector(".card__like")
            .classList.add("card__like_clicked");
        this._element.querySelector(".card__like-counter").textContent =
            data.likes.length;
        this._data.likes = data.likes;
    }

    removeLike(data) {
        this._element
            .querySelector(".card__like")
            .classList.remove("card__like_clicked");
        this._element.querySelector(".card__like-counter").textContent =
            data.likes.length;
        this._data.likes = data.likes;
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }
}