export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this.name = document.querySelector(nameSelector);
        this.job = document.querySelector(jobSelector);
    }

    getUserInfo(data) {
        this.name.value = data.name;
        this.job.value = data.job;
    }
    setUserInfo(data) {
        document.querySelector(".profile__name").textContent = data.name;
        document.querySelector(".profile__job").textContent = data.job;
    }
}