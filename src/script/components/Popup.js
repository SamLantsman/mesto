export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open(data) {
        this._popupSelector.classList.add("popup_is-opened");
        console.log('два хуя')
        this._popupSelector.querySelector(".popup__text-name").value = data.userName;
        this._popupSelector.querySelector(".popup__text-job").value = data.userJob;
        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt).bind(this);
        });
    }

    close() {
        this._popupSelector.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", (evt) => {
            this._handleEscClose(evt).bind(this);
        });
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        const overlay = document.querySelector(".popup_is-opened");
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