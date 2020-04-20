import React from "react";
import Query from "../Query";
import { Link, withRouter } from "react-router-dom";

import { CATEGORIES_QUERY } from "../Category/queries";
import { getToken, clearToken, clearUser } from "../../../utils/index";

class Navbar extends React.Component {
  handleSignout = () => {
    clearToken();
    clearUser();
    this.props.history.push("/");
  };
  render() {
    return getToken() !== null ? (
      <AuthNav handleSignout={this.handleSignout} />
    ) : (
      <UnAuthNav />
    );
  }
}

const AuthNav = ({ handleSignout }) => {
  return (
    <nav className="uk-navbar-container" data-uk-navbar>
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li>
            <Link to="/">Modrek</Link>
          </li>
        </ul>
        <ul className="uk-navbar-nav">
          <li>
            <Link to="/dashboard/cards">Cards</Link>
          </li>
          <li>
            <Link to="/dashboard/create-card">Create Card</Link>
          </li>
        </ul>
        <ul className="uk-navbar-nav">
          <li>
            <Link to="/dashboard/articles">Articles</Link>
          </li>
          <li>
            <Link to="/dashboard/create-article">Create Article</Link>
          </li>
        </ul>
        <ul className="uk-navbar-nav">
          <li>
            <Link to="/dashboard/cards">Tests</Link>
          </li>
          <li>
            <Link to="/dashboard/create-test">Create Test</Link>
          </li>
        </ul>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button
                className="uk-button uk-button-danger uk-button-large"
                onClick={handleSignout}
              >
                Sing out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const UnAuthNav = () => {
  return (
    <div>
      <Query query={CATEGORIES_QUERY} id={null}>
        {({ data: { categories } }) => {
          return (
            <div>
              <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-left">
                  <ul className="uk-navbar-nav">
                    <li>
                      <Link to="/">Modrek</Link>
                    </li>
                  </ul>
                  <ul className="uk-navbar-nav">
                    <li>
                      <Link to="/articles">Articles</Link>
                    </li>
                    <li>
                      <Link to="/cards">Cards</Link>
                    </li>
                    <li>
                      <Link to="/tests">All Tests</Link>
                    </li>
                    <li>
                      <Link to="/create-test">Create Test</Link>
                    </li>
                    <li>
                      <Link to="/tests">All Tests</Link>
                    </li>
                    {categories.map((category, i) => {
                      return (
                        <li key={category.id}>
                          <Link
                            to={`/category/${category.id}`}
                            className="uk-link-reset"
                          >
                            {category.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="uk-navbar-right">
                  <ul className="uk-navbar-nav">
                    <li>
                      <Link to="/signin">Login</Link>
                    </li>
                    <li>
                      <Link to="/signup">Signup</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default withRouter(Navbar);
