import React, { useState } from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import "react-router-modal/css/react-router-modal.css";

import { getState, getToken } from "../utils";

// publisc site
import Footer from "../public_site/components/Footer";
// Dashboard
import Dashboard from "../dashboard/components/MainDash";
import Reviewes from "../dashboard/components/Reviews";
import DBArticles from "../dashboard/components/Articles/ArticlesTable";
import EditArticle from "../dashboard/components/Articles/EditArticle";
import DBCards from "../dashboard/components/Cards/CardsTable";
import EditCard from "../dashboard/components/Cards/EditCard";
import DBTests from "../dashboard/components/Tests/TestsList";
import DBUsers from "../dashboard/components/Users/UsersList";

import EditTest from "../dashboard/components/Tests/EditTest";
import CreateArticle from "../dashboard/components/Articles/CreateArticle";
import CreateCard from "../dashboard/components/Cards/CreateCard";
import CreateTest from "../dashboard/components/Tests/CreateTest";
import ReviewCard from "../dashboard/components/Cards/ReviewCard";
import ReviewArticle from "../dashboard/components/Articles/ReviewArticle";
import ReviewTest from "../dashboard/components/Tests/ReviewTest";
import { PrivateRoute, AdminRoute } from "./PrivateRoute";
import Profile from "../dashboard/components/Profile";
import SideBar from "./SideBar";

import TopBar from "./TopNavBar";

const AR = "Arabic";
const EN = "English";

const NotFoundRedirect = () => <Redirect to='/signin' />

// class AppRouter extends React.Component {
function DashboardRouter({ match }) {
  const state = getState(); // get from localStorage, or return initial default state
  const [title, setTitle] = useState('Dashboard');
  const dir = state.siteLanguage && state.siteLanguage === AR ? "rtl" : "ltr";
  const changeTitle = (title) => {
    setTitle(title);
  };

  return (
    <div class="wrapper">
      <SideBar />
      <div id="content">
        <TopBar title={title} />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} exact title="Dashboard" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/profile" component={Profile} exact title="Profile" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/cards" component={DBCards} exact title="Cards" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/cards/edit/:id" component={EditCard} exact title="Edit Card" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/create-card" component={CreateCard} exact title="Create Card" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/articles" component={DBArticles} exact title="Articles" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/articles/edit/:id" component={EditArticle} exact title="Edit Article" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/create-article" component={CreateArticle} exact title="Create Article" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/tests" component={DBTests} exact title="Tests" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/tests/edit/:id" component={EditTest} exact title="Edit Test" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/create-test" component={CreateTest} exact title="Create Test" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/reviews" component={Reviewes} exact title="Reviews" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/reviews/articles/review/:id" component={ReviewArticle} exact title="Review Article" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/reviews/tests/review/:id" component={ReviewTest} exact title="Review Test" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/reviews/cards/review/:id" component={ReviewCard} title="Review Card" onOpen={changeTitle} />
          <PrivateRoute path="/dashboard/review/article/:id"
            // component={REVIEW ARTICLE COMPONENT}
            exact
            title="Review Article" onOpen={changeTitle}
          />
          <PrivateRoute
            path="/dashboard/review/card/:id"
            // component={REVIEW CARD COMPONENT}
            exact
            title="Articles" onOpen={changeTitle}
          />
          <PrivateRoute
            path="/dashboard/review/test/:id"
            // component={REVIEW TEST COMPONENT}
            exact
            title="Articles" onOpen={changeTitle}
          />
          <AdminRoute path="/dashboard/users" component={DBUsers} exact title="User Management" onOpen={changeTitle} />

          <Route component={NotFoundRedirect} />

        </Switch>
      </div>
    </div>
  );
};

export default DashboardRouter;
