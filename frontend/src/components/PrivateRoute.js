import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { getToken } from '../utils';


export const PrivateRoute = ({ component: Component, onOpen, title, ...rest }) => {
  if (getToken()) {
    if(onOpen) {
      onOpen(title);
    }
  }
  return (
    <Route {...rest} render={(props) => (
      getToken()
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )
}

