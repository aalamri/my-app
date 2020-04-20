import React from "react";
import TestsRow from "./TestsRow";
import Query from "../Query";
import { TESTS_QUERY } from "./queries";

const Tests = () => {
  return (
    <div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Tests</h1>
          <Query query={TESTS_QUERY}>
            {({ data: { tests } }) => {
              return <TestsRow tests={tests} />;
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Tests;
