import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { ModalContainer, ModalRoute } from "react-router-modal";
import "react-router-modal/css/react-router-modal.css";

import { getState, getToken } from "../utils";

// publisc site
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
import DashboardRouter from "../components/DashboardRouter";
import PublicRouter from "../components/PublicRouter";

const AR = "Arabic";
const EN = "English";

const NotFoundRedirect = () => <Redirect to='/signin' />

// class AppRouter extends React.Component {
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
