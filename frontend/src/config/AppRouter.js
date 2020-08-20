import React from "react";
import { Switch, Route,  Redirect } from "react-router-dom";
import { ModalContainer,  } from "react-router-modal";
import "react-router-modal/css/react-router-modal.css";

import { getState, } from "../utils";

import DashboardRouter from "../components/DashboardRouter";
import PublicRouter from "../components/PublicRouter";

const AR = "Arabic";
const EN = "English";

const AppRouter = () => {
  const state = getState(); // get from localStorage, or return initial default state
  const dir = state.siteLanguage && state.siteLanguage === AR ? "rtl" : "ltr";
  return (
    <div className="App" dir={dir}>
      <Switch>
        <Route path="/dashboard" >
          <DashboardRouter />
        </Route>
        <Route path="/">
          <PublicRouter />
        </Route>
      </Switch>
      <ModalContainer />
    </div>
  );
};

export default AppRouter;
