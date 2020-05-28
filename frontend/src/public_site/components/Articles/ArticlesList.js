import React from "react";
import ArticlesRow from "./ArticlesRow";
import Query from "../Query";
import { ARTICLES_QUERY } from "./queries";

const Articles = () => {
  return (
    <div>
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
  );
};

export default Articles;
