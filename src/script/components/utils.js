export default function renderLoading(isLoading, popup) {
    if (popup === document.querySelector(".popup__delete-card")) {
        if (isLoading) {
            popup.querySelector(".popup__save-button").textContent = "Удяляю...";
        } else {
            popup.querySelector(".popup__save-button").textContent = "Да";
        }
    } else {
        if (isLoading) {
            popup.querySelector(".popup__save-button").textContent = "Cохранениe...";
        } else {
            if (popup === document.querySelector(".popup__add-card")) {
                popup.querySelector(".popup__save-button").textContent = "Создать";
            } else {
                popup.querySelector(".popup__save-button").textContent = "Сохранить";
            }
        }
    }
}