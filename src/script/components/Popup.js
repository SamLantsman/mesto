export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target !== evt.currentTarget) {
            return;
        }
        this.close();
    }

    setEventListeners() {
        this._popupSelector
            .querySelector(".popup__close-image")
            .addEventListener("click", () => {
                this.close();
            });

        this._popupSelector.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        })

    }
}