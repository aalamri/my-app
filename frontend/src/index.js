import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import AppRouter from "./public_site/config/AppRouter";
import client from "./utils/apolloClient";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
