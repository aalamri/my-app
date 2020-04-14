import React from "react";
import Query from "../Query";
import { Link } from "react-router-dom";

import { CATEGORIES_QUERY } from "../Category/queries";

const Nav = () => {
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
                      <Link to="/create-article">Create Article</Link>
                    </li>
                    <li>
                      <Link to="/create-card">Create Card</Link>
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
                      <Link to="/registration">Join As us</Link>
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

export default Nav;
