import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { getToken } from '../utils';


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    getToken()
      ? <Component {...props} />
      : <Redirect to='/signin' />
  )} />
)

