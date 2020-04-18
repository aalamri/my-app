import React from "react";
import { Switch, Route } from "react-router-dom";

// publisc site
import Nav from "../public_site/components/Nav";
import Home from "../public_site/components/Home";
import Articles from "../public_site/components/Articles/ArticlesList";
import Article from "../public_site/components/Articles/Article";
import CreateArticle from "../public_site/components/Articles/CreateArticle";
import Cards from "../public_site/components/Cards/CardsList";
import Card from "../public_site/components/Cards/Card";
import CreateCard from "../public_site/components/Cards/CreateCard";
import Category from "../public_site/components/Category";
import Profile from "../public_site/components/Profile";
import Signup from "../public_site/components/Signup";
// Dashboard
import Dashboard from "../dashboard/components/MainDash";
import DBCards from "../dashboard/components/Cards/CardsList";
import DBArticles from "../dashboard/components/Article/ArticlesList";
import DBCard from "../dashboard/components/Cards/Card";
import DBArticle from "../dashboard/components/Article/Article";
import Signin from "../public_site/components/Signin";

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
          <Route path="/articles" component={Articles} exact />
          <Route path="/article/:id" component={Article} exact />
          <Route path="/cards" component={Cards} exact />
          <Route path="/card/:id" component={Card} exact />
          <Route path="/category/:id" component={Category} exact />
          <Route path="/create-article" component={CreateArticle} exact />
          <Route path="/create-card" component={CreateCard} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signin" component={Signin} exact />

          {/* Dashboaed routes: Initiator */}
          <Route path="/dashboard/cards" component={DBCards} exact />
          <Route path="/dashboard/card/edit/:id" component={DBCard} exact />
          <Route
            path="/dashboard/article/edit/:id"
            component={DBArticle}
            exact
          />
          <Route path="/dashboard/articles" component={DBArticles} exact />

          {/* Dashboaed routes: Reivewer */}
          <Route path="/dashboard/reviews" component={DBCard} exact />
          <Route
            path="/dashboard/review/article/:id"
            component={DBArticle}
            exact
          />
          <Route
            path="/dashboard/review/card/:id"
            component={DBArticles}
            exact
          />
          <Route
            path="/dashboard/review/test/:id"
            component={DBArticles}
            exact
          />

          {/* Dashboard users */}
          <Route path="/dashboard/profile" component={Profile} exact />
          {/* TODO: handle 404 */}
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
