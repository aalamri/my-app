import React from "react";
import ArticlesComponent from "../../components/Articles";
import Query from "../../components/Query";
import ARTICLES_QUERY from "../../queries/article/articles";

const Articles = () => {
  return (
    <div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Articles</h1>
          <Query query={ARTICLES_QUERY}>
            {({ data: { articles } }) => {
              return <ArticlesComponent articles={articles} />;
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Articles;
