import React from "react";
import ArticlesRow from "./ArticlesRow";
import Query from "../Query";
import { ARTICLES_QUERY } from "./queries";

const Articles = () => {
  return (
    <div className="container">
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Articles</h1>
          <Query query={ARTICLES_QUERY}>
            {({ data: { articles } }) => {
              return (
                <ArticlesRow
                  articles={articles.filter(({ is_deleted }) => !is_deleted)}
                />
              );
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Articles;
