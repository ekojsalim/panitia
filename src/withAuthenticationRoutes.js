import React from "react";
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import withAuthentication from "./components/withAuthentication";
import Loadable from "react-loadable";
import Loading from "./components/loading";

const LoadableLogin = Loadable({
  loader: () => import("./components/login"),
  loading: Loading
});

const LoadableDashboard = Loadable({
  loader: () => import("./components/dashboard"),
  loading: Loading
});

const LoadableInfo = Loadable({
  loader: () => import("./components/info"),
  loading: Loading
});

const LoadableRegister = Loadable({
  loader: () => import("./components/register"),
  loading: Loading
});

const LoadableEnter = Loadable({
  loader: () => import("./components/enter"),
  loading: Loading
});

const LoadableExit = Loadable({
  loader: () => import("./components/exit"),
  loading: Loading
});

const WithAuthenticationRoutes = withAuthentication(() => {
  return (
    <Switch>
      <Route exact path="/" component={LoadableLogin}/>
      <PrivateRoute path="/dashboard" component={LoadableDashboard} />
      <PrivateRoute path="/info" component={LoadableInfo}/>
      <PrivateRoute path="/register" component={LoadableRegister}/>
      <PrivateRoute path="/enter" component={LoadableEnter}/>
      <PrivateRoute path="/exit" component={LoadableExit}/>
    </Switch>
  );
});

export default WithAuthenticationRoutes;