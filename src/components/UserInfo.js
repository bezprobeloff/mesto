export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = '';
  }

  initialize({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._job.textContent = about,
    this._avatar.src = avatar;
    this._id = _id;
  }

  updateAvatar(link) {
    this._avatar.src = link;
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo({ name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
};
