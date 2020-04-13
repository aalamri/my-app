import React from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "../../components/Nav";
import RegistrationOrLogIn from "../../components/RegistrationOrLogIn";
import Home from "../../components/Home";
import Articles from "../Articles";
import Article from "../Article";
import Cards from "../Cards";
import Card from "../Card";
import Category from "../Category";
import Dashboard from "../../components/Dashboard";
import Profile from "../../components/Profile";

class App extends React.Component {

  state = {
    user: null
  }
  render() {
    const {user} = this.state

    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/Dashboard" component={Dashboard} exact/>
          <Route path="/articles" component={Articles} exact />
          <Route path="/article/:id" component={Article} exact />
          <Route path="/cards" component={Cards} exact />
          <Route path="/card/:id" component={Card} exact />
          <Route path="/category/:id" component={Category} exact />
          {!user &&
          <RegistrationOrLogIn updateUser={(user) =>this.setState({user})}/>
          }
          {user &&
          <Profile user={user}/>
          }
        </Switch>
      </div>
    );
  }
}


export default App;
