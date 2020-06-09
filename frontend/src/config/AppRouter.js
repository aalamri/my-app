import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { ModalContainer, ModalRoute } from "react-router-modal";
import "react-router-modal/css/react-router-modal.css";

import { getState } from "../utils";

// publisc site
import Nav from "../public_site/components/Nav";
import Home from "../public_site/components/Home";
import CardsRow from "../public_site/components/Cards/CardsRow";
import ArticlesRow from "../public_site/components/Articles/ArticlesRow";
import Article from "../public_site/components/Articles/Article";
import Tests from "../public_site/components/Tests/TestsList";
import Test from "../public_site/components/Tests/Test";
import TestResult from "../public_site/components/Tests/TestResult";
import Questions from "../public_site/components/Tests/Questions";
import Category from "../public_site/components/Category";
import Profile from "../public_site/components/Profile";
import Signup from "../public_site/components/Signup";
import Signin from "../public_site/components/Signin";
import Search from "../public_site/components/Search";
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
import Feedback from "../public_site/components/Feedback/CreateFeedback";
import About from "../public_site/components/About/About";
import { PrivateRoute } from "../components/PrivateRoute";

const AR = "Arabic";
const EN = "English";

const NotFoundRedirect = () => <Redirect to='/signin' />

// class AppRouter extends React.Component {
const AppRouter = () => {
  const state = getState(); // get from localStorage, or return initial default state
  const dir = state.siteLanguage && state.siteLanguage === AR ? "rtl" : "ltr";
  return (
    <div className="App" dir={dir}>
      <Nav />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/articles" component={ArticlesRow} exact />
        <Route path="/article/:id" component={Article} exact />
        <Route path="/cards" component={CardsRow} />
        <Route path="/tests" component={Tests} exact />
        <Route path="/test/:id" component={Test} exact />
        <Route path="/test/:id/question/:qid" component={Questions} exact />
        <Route path="/test/:id/result" component={TestResult} exact />
        <Route path="/category/:id" component={Category} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/signin" component={Signin} exact />
        <Route path="/search" component={Search} exact />
        <Route path="/feedback" component={Feedback} exact />
        <Route path="/about" component={About} exact />

        {/* Dashboard all users */}
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/dashboard/profile" component={Profile} exact />

        {/* Dashboaed routes: Initiator */}
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

        {/* Dashboaed routes: Reivewer */}
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

        {/* TODO: handle 404 */}
      </Switch>

      <Footer />
      <ModalContainer />
    </div>
  );
};

export default AppRouter;
