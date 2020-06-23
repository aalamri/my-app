import React from "react";
import TestsTable from "./TestsTable";
import Query from "../Query";
import { TESTS_QUERY } from "./queries";

const Tests = () => {
  return (
    <div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Query query={TESTS_QUERY}>
            {({ data: { tests } }) => {
              return <TestsTable tests={tests} />;
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Tests;
