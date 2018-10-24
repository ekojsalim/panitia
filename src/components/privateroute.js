import React from "react";
import { Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

export default inject("authStore")(observer( class PrivateRoute extends React.Component {
  render() {
    const { authStore, ...restProps } = this.props;

    if (authStore.loggedIn) {
      return <Route {...restProps} />;
    } else {
      return <Redirect to="/" />;
    }
  }
}));
