import {action, computed, observable, decorate} from "mobx";

class AuthStore {
  authUserId = null;
  authUserName = null;
  authUserEmail = null;

  get loggedIn() {
    return !!this.authUserId;
  }

  get dataComplete() {
    return this.authUserName && this.authUserEmail;
  }

  setUser(authUser = {uid: null, displayName: null, email: null}) {
    this.authUserId = authUser.uid;
    this.authUserName = authUser.displayName;
    this.authUserEmail = authUser.email;
  }
}

decorate(AuthStore, {
  authUserId: observable,
  authUserName: observable,
  authUserEmail: observable,
  loggedIn: computed,
  dataComplete: computed,
  setUser: action
});

export default new AuthStore();
