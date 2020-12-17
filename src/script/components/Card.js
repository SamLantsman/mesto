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
        this._element = this._getTemplate();
        this._cardDelete = this._element.querySelector(".card__delete");
        this._cardElement = this._element.querySelector(".card__image");
        this._cardCounter = this._element.querySelector(".card__like-counter");
        this._cardLike = this._element.querySelector(".card__like");
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element.querySelector(".card__heading").innerText = this._name;
        this._cardCounter.textContent = this._data.likes.length;

        if (this._userId === this._owner) {
            this._cardDelete.style.display = "block";
        }

        this._updateLikesView();
        this._cardElement.src = this._link;
        this._cardElement.alt = this._alt;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", () => {
            this._handleLikeClick(this._id, this.isLiked());
        });

        this._cardDelete.addEventListener("click", () => {
            this._handleDeleteIconClick(this._id);
        });

        const data = { name: this._name, link: this._link, alt: this._alt };

        this._cardElement.addEventListener("click", () => {
            this._handleCardClick(data);
        });
    }

    _updateLikesView() {
        if (this.isLiked()) {
            this._cardLike
                .classList.add("card__like_clicked");
        }
    }

    isLiked() {
        for (let i in this._data.likes) {
            if (this._data.likes[i]._id === this._userId) {
                return true;
            }
        }
        return false;
    }

    addLike(data) {
        this._cardLike
            .classList.add("card__like_clicked");
        this._cardCounter.textContent = data.likes.length;
        this._data.likes = data.likes;
    }

    removeLike(data) {
        this._cardLike
            .classList.remove("card__like_clicked");
        this._cardCounter.textContent = data.likes.length;
        this._data.likes = data.likes;
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }
}