import React from "react";
import { Link } from "react-router-dom";
import Query from "../Query";
import { TESTS_QUERY } from "./queries";

const Tests = () => {
  return (
    <section>
      <div className="container">
        <div className="row mt-5">
          <h2>Tests</h2>
        </div>
        <div className="row my-5">
          <Query query={TESTS_QUERY}>
            {({ data: { tests } }) => {
              return tests.map(({ id, title, description }) =>
                <div className="col-lg-3 col-sm-6 my-2" >
                  <Link key={id} to={`/test/${id}`}>
                    <div className="card single-test single-test-hover">
                      <div className="card-body">
                        {/* <div className="pb-2">
                          <span className="ti-credit-card icon-md color-secondary"></span>
                        </div> */}
                        <div className="pt-2 pb-3">
                          <h5>{title}</h5>
                          <p className="text-muted mb-0 feat-test-description">{description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    </section>
  );
};

export default Tests;
