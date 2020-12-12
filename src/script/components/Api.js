export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
                headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateUserInfo(data) {
        return fetch(`${this._url}users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.job,
                }),
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getCardsInfo() {
        return fetch(`${this._url}cards`, {
                headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addNewCard(newCard) {
        return fetch(`${this._url}cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: newCard.name,
                    link: newCard.link,
                }),
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data,
                }),
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
                method: "PUT",
                headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    removeLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}