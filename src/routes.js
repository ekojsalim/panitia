import {Provider} from "mobx-react";
import React from "react";
import Loadable from "react-loadable";
import {Switch} from "react-router-dom";
import authStore from "./stores/authStore";
import Loading from "./components/loading";
import ticketStore from "./stores/ticketStore";

const stores = {
  authStore,
  ticketStore
};

const LoadableWithAuthenticationRoutes = Loadable({
  loader: () => import("./withAuthenticationRoutes"),
  loading: Loading
});

const Routes = () => {
  return (
    <Switch>
      <Provider {...stores}>
        <LoadableWithAuthenticationRoutes />
      </Provider>
    </Switch>
  );
};

export default Routes;
