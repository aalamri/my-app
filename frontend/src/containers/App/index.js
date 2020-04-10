import React from "react";

import { Switch, Route } from "react-router-dom";

import Nav from "../../components/Nav";
import Login from "../../components/Login";
import Registration from "../../components/Registration";
import Home from "../../components/Home";
import Articles from "../Articles";
import Article from "../Article";
import Cards from "../Cards";
import Card from "../Card";
import Category from "../Category";

function App() {
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
        <Route path="/registration" component={Registration} exact />
        <Route path="/login" component={Login} exact />

      </Switch>
    </div>
  );
}

export default App;
