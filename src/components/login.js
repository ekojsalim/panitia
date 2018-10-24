import React, {Component} from "react";
import AuthUI from "react-firebaseui/StyledFirebaseAuth";

import firebase from "../firebase";
import {inject, observer} from "mobx-react";
import backgroundPic from "../images/back.jpg";
import withStyles from "@material-ui/core/styles/withStyles";
import {Redirect} from "react-router-dom";

const styles = {
  background: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${backgroundPic})`,
    height: "100vh",
    backgroundSize: "cover",
  },
  loginContainer: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "7vw"
  },
  headline: {
    color: "white",
    display: "block"
  }
};

const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
  ],
  credentialHelper: "none"
};

class Login extends Component {
  render() {
    const {classes, authStore} = this.props;

    return (
      <main className={classes.background}>
        {authStore.loggedIn ? <Redirect to="/dashboard"/> : ""}
        <div className={classes.loginContainer}>
            <AuthUI uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(inject("authStore")(observer(Login)));
