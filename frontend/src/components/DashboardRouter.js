import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import "react-router-modal/css/react-router-modal.css";

import { getState, getToken } from "../utils";

// publisc site
import Footer from "../public_site/components/Footer";
// Dashboard
import Dashboard from "../dashboard/components/MainDash";
import Reviewes from "../dashboard/components/Reviews";
import DBArticles from "../dashboard/components/Articles/ArticlesList";
import EditArticle from "../dashboard/components/Articles/EditArticle";
import DBCards from "../dashboard/components/Cards/CardsList";
import EditCard from "../dashboard/components/Cards/EditCard";
import DBTests from "../dashboard/components/Tests/TestsList";
import EditTest from "../dashboard/components/Tests/EditTest";
import CreateArticle from "../dashboard/components/Articles/CreateArticle";
import CreateCard from "../dashboard/components/Cards/CreateCard";
import CreateTest from "../dashboard/components/Tests/CreateTest";
import ReviewCard from "../dashboard/components/Cards/ReviewCard";
import ReviewArticle from "../dashboard/components/Articles/ReviewArticle";
import ReviewTest from "../dashboard/components/Tests/ReviewTest";
import { PrivateRoute } from "./PrivateRoute";
import Profile from "../public_site/components/Profile";
import SideBar from "./SideBar";

const AR = "Arabic";
const EN = "English";

const NotFoundRedirect = () => <Redirect to='/signin' />

// class AppRouter extends React.Component {
function DashboardRouter({ match }) {
  const state = getState(); // get from localStorage, or return initial default state
  const dir = state.siteLanguage && state.siteLanguage === AR ? "rtl" : "ltr";
  return (
    <div class="wrapper">
      <SideBar />
      <div id="content">
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute path="/dashboard/profile" component={Profile} exact />
          <PrivateRoute path="/dashboard/cards" component={DBCards} exact />
          <PrivateRoute path="/dashboard/cards/edit/:id" component={EditCard} exact />
          <PrivateRoute path="/dashboard/create-card" component={CreateCard} exact />
          <PrivateRoute path="/dashboard/articles" component={DBArticles} exact />
          <PrivateRoute
            path="/dashboard/articles/edit/:id"
            component={EditArticle}
            exact
          />
          <PrivateRoute
            path="/dashboard/create-article"
            component={CreateArticle}
            exact
          />
          <PrivateRoute path="/dashboard/tests" component={DBTests} exact />
          <PrivateRoute path="/dashboard/tests/edit/:id" component={EditTest} exact />
          <PrivateRoute path="/dashboard/create-test" component={CreateTest} exact />
          <PrivateRoute path="/dashboard/reviews" component={Reviewes} exact />
          <PrivateRoute
            path="/dashboard/reviews/articles/review/:id"
            component={ReviewArticle}
            exact
          />
          <PrivateRoute
            path="/dashboard/reviews/tests/review/:id"
            component={ReviewTest}
            exact
          />
          <PrivateRoute
            path="/dashboard/reviews/cards/review/:id"
            component={ReviewCard}
          />
          <PrivateRoute
            path="/dashboard/review/article/:id"
            // component={REVIEW ARTICLE COMPONENT}
            exact
          />
          <PrivateRoute
            path="/dashboard/review/card/:id"
            // component={REVIEW CARD COMPONENT}
            exact
          />
          <PrivateRoute
            path="/dashboard/review/test/:id"
            // component={REVIEW TEST COMPONENT}
            exact
          />

          <Route component={NotFoundRedirect} />

        </Switch>
      </div>
    </div>
  );
};

export default DashboardRouter;
