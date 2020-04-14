import React from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "../components/Nav";
// import RegistrationOrLogIn from "../components/RegistrationOrLogIn";
import Home from "../components/Home";
import Articles from "../components/Articles/ArticlesList";
import Article from "../components/Articles/Article";
import CreateArticle from "../components/Articles/CreateArticle";
import Cards from "../components/Cards/CardsList";
import Card from "../components/Cards/Card";
import CreateCard from "../components/Cards/CreateCard";
import Category from "../components/Category";
// import Profile from "../components/Profile";
import Signup from "../components/Signup";
import Dashboard from "../../dashboard";
import Signin from "../components/Signin";

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

        </Switch>
      </div>
    );
  }
}

export default AppRouter;
