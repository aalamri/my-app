import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./config/AppRouter";
import client from "./utils/apolloClient";
import configureStore from './config/store';
import "./index.css";

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
