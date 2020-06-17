import React from "react";
import ArticlesTable from "./ArticlesTable";
import Query from "../Query";
import { ARTICLES_QUERY } from "./queries";
import Dashboard from "../MainDash";

const Articles = () => {
  return (
    <div>
      <div className="uk-container uk-container-medium">
        <Query query={ARTICLES_QUERY}>
          {({ data: { articles } }) => {
            return <ArticlesTable articles={articles} />;
          }}
        </Query>
      </div>
    </div>
  );
};

export default Articles;
