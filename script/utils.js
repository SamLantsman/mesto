export function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escPopupCloser);
}

export const openPopup = (popup) => {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", escPopupCloser);
};

export const escPopupCloser = (evt) => {
    const overlay = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape") {
        closePopup(overlay);
    }
};

export const backgroundPopupCloser = (evt) => {
    const overlay = document.querySelector(".popup_is-opened");
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closePopup(overlay);
};