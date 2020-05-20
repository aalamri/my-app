import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import AppRouter from "./config/AppRouter";
import client from "./utils/apolloClient";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Card from "./public_site/components/Cards/Card";
import { ModalContainer, ModalRoute } from 'react-router-modal';

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
