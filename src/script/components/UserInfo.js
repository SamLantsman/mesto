export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            userName: this._name.textContent,
            userJob: this._job.textContent,
        };
    }
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.about;
    }
}