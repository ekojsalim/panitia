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

const LoadableScanner = Loadable({
  loader: () => import("./components/scanner2"),
  loading: Loading
});

const LoadableMenu = Loadable({
  loader: () => import("./components/menu"),
  loading: Loading
});

const LoadableDeposit = Loadable({
  loader: () => import("./components/deposit"),
  loading: Loading
});

const LoadableWithdraw = Loadable({
  loader: () => import("./components/withdraw"),
  loading: Loading
});

const LoadableList = Loadable({
  loader: () => import("./components/list"),
  loading: Loading
});

const LoadableDepositInfo = Loadable({
  loader: () => import("./components/depositinfo"),
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
      <PrivateRoute path="/scanner" component={LoadableScanner}/>
      <PrivateRoute path="/menu" component={LoadableMenu}/>
      <PrivateRoute path="/deposit" component={LoadableDeposit}/>
      <PrivateRoute path="/depositinfo" component={LoadableDepositInfo}/>
      <PrivateRoute path="/withdraw" component={LoadableWithdraw}/>
      <PrivateRoute path="/list" component={LoadableList}/>
    </Switch>
  );
});

export default WithAuthenticationRoutes;