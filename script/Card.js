import { fullImage, fullImageText, popupFullImage } from "./constants.js";
import { openPopup } from "./utils.js";

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._cardSelector = cardSelector;
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
        cardElement.src = this._link;
        cardElement.alt = this._alt;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".card__like").addEventListener("click", () => {
            this._handleLikeClick();
        });

        this._element
            .querySelector(".card__delete")
            .addEventListener("click", () => {
                this._handleRemoveCard();
            });

        this._element
            .querySelector(".card__image")
            .addEventListener("click", () => {
                openPopup(popupFullImage);
                fullImage.src = this._link;
                fullImageText.textContent = this._name;
                fullImage.alt = this._name;
            });
    }

    _handleLikeClick() {
        this._element
            .querySelector(".card__like")
            .classList.toggle("card__like_clicked");
    }

    _handleRemoveCard() {
        this._element.closest(".card").remove();
    }
}