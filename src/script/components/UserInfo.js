export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatar }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            userName: this._name.textContent,
            userJob: this._job.textContent,
            userAvatar: this._avatar.src,
        };
    }
    setUserInfo(data) {
        if (data.name) {
            this._name.textContent = data.name;
        }
        if (data.about) {
            this._job.textContent = data.about;
        }
        if (data.avatar) {
            this._avatar.src = data.avatar;
        }
    }
}