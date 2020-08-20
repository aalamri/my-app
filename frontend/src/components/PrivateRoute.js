import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { getToken, getUserRole } from '../utils';


export const PrivateRoute = ({ component: Component, onOpen, title, ...rest }) => {
  if (getToken()) {
    if (onOpen) {
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

export const AdminRoute = ({ component: Component, onOpen, title, ...rest }) => {
  if (getToken()) {
    if (onOpen) {
      onOpen(title);
    }
  }
  return (
    <Route {...rest} render={(props) => (
      getUserRole() === "admin"
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )
}

export const ReviewerRoute = ({ component: Component, onOpen, title, ...rest }) => {
  if (getToken()) {
    if (onOpen) {
      onOpen(title);
    }
  }
  return (
    <Route {...rest} render={(props) => (
      getUserRole() === "reviewer"
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )
}

