import React from "react";
import ArticlesTable from "./ArticlesTable";
import Query from "../Query";
import { ARTICLES_QUERY } from "./queries";
import Dashboard from "../../dashboard";

const Articles = () => {
  return (
    <div>
    <Dashboard/>
    <div class="uk-container uk-container-medium">
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
