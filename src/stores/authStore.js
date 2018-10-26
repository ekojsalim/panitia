import {action, computed, observable, decorate} from "mobx";
import {auth} from "../firebase/firebase";

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
  logout() {
    this.authUserId = null;
    this.authUserName = null;
    this.authUserEmail = null;
    auth.signOut();
  }
}

decorate(AuthStore, {
  authUserId: observable,
  authUserName: observable,
  authUserEmail: observable,
  loggedIn: computed,
  dataComplete: computed,
  setUser: action,
  logout: action
});

export default new AuthStore();
