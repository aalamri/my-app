import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { ModalContainer, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css'

// publisc site
import Nav from "../public_site/components/Nav";
import Home from "../public_site/components/Home";
import Articles from "../public_site/components/Articles/ArticlesList";
import Article from "../public_site/components/Articles/Article";
import Cards from "../public_site/components/Cards/CardsList";
import Card from "../public_site/components/Cards/Card";
import Tests from "../public_site/components/Tests/TestsList";
import Test from "../public_site/components/Tests/Test";
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
import CardsRow from "../public_site/components/Cards/CardsRow";
import ArticlesRow from "../public_site/components/Articles/ArticlesRow";


class AppRouter extends React.Component {
  state = {
    user: null,
  };
  render() {
    // const { user } = this.state;
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/articles" component={ArticlesRow} exact />
          <Route path="/article/:id" component={Article} exact />
          <Route path="/cards" component={CardsRow} />

          <Route path="/tests" component={Tests} exact />
          <Route path="/category/:id" component={Category} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signin" component={Signin} exact />
          <Route path="/search" component={Search} exact />

          {/* Dashboard all users */}
          <Route path="/dashboard/profile" component={Profile} exact />

          {/* Dashboaed routes: Initiator */}
          <Route path="/dashboard/cards" component={DBCards} exact />
          <Route path="/dashboard/cards/edit/:id" component={EditCard} exact />
          <Route path="/dashboard/create-card" component={CreateCard} exact />
          <Route path="/dashboard/articles" component={DBArticles} exact />
          <Route
            path="/dashboard/articles/edit/:id"
            component={EditArticle}
            exact
          />
          <Route
            path="/dashboard/create-article"
            component={CreateArticle}
            exact
          />
          <Route path="/dashboard/tests" component={DBTests} exact />
          <Route path="/dashboard/tests/edit/:id" component={EditTest} exact />
          <Route path="/dashboard/create-test" component={CreateTest} exact />

          {/* Dashboaed routes: Reivewer */}
          <Route path="/dashboard/reviews" component={Reviewes} exact />
          <Route path="/dashboard/reviews/articles/review/:id" component={ReviewArticle} exact />
          <Route path="/dashboard/reviews/tests/review/:id" component={ReviewTest} exact />
          <Route path="/dashboard/reviews/cards/review/:id" component={ReviewCard}></Route>
          <Route
            path="/dashboard/review/article/:id"
            // component={REVIEW ARTICLE COMPONENT}
            exact
          />
          <Route
            path="/dashboard/review/card/:id"
            // component={REVIEW CARD COMPONENT}
            exact
          />
          <Route
            path="/dashboard/review/test/:id"
            // component={REVIEW TEST COMPONENT}
            exact
          />

          {/* TODO: handle 404 */}
        </Switch>

        <Footer />
        <ModalContainer />
      </div>
    );
  }
}

export default AppRouter;
