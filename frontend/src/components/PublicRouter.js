import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "react-router-modal/css/react-router-modal.css";

import { getState, } from "../utils";

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
import Signup from "../public_site/components/Signup";
import Signin from "../public_site/components/Signin";
import Search from "../public_site/components/Search";
import Footer from "../public_site/components/Footer";
import Feedback from "../public_site/components/Feedback/CreateFeedback";
import About from "../public_site/components/About/About";
import Nav from './Nav';

const AR = "Arabic";
const EN = "English";

const NotFoundRedirect = () => <Redirect to='/signin' />

// class AppRouter extends React.Component {
function PublicRouter({ match }) {
    const state = getState(); // get from localStorage, or return initial default state
    const dir = state.siteLanguage && state.siteLanguage === AR ? "rtl" : "ltr";
    return (
        <div>
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
                <Redirect to="/" />
            </Switch>
            <Footer />
        </div>
    );
};

export default PublicRouter;
