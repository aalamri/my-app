import React from "react";
import CardTable from "../Cards/CardsTable";
import ArticleTable from "../Articles/ArticlesTable";
import Query from "../Query";
import { CARDS_QUERY } from "../Cards/queries";
import { ARTICLES_QUERY } from "../Articles/queries";
import Dashboard from "../MainDash";
import { TESTS_QUERY } from "../Tests/queries";
import TestsTable from "../Tests/TestsTable";

const Reviewes = () => {
  return (
    <div>
      <div className="uk-container uk-container-medium">
        <CardTable />
        <ArticleTable />
        <Query query={TESTS_QUERY}>
          {({ data: { tests } }) => {
            return <TestsTable tests={tests} />;
          }}
        </Query>
      </div>
    </div>
  );
};


export default Reviewes;
