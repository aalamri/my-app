import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { FEATURED_TESTS_QUERY } from "./queries";
import { getString } from "../../../utils";

const tag = "img/yellow-tag.svg";
// const icon10 = "img/icon10.svg";

export default function (props) {
  const { data: testsData /*, loading, error*/ } = useQuery(
    FEATURED_TESTS_QUERY
  );
  const [tests, setTests] = useState([]);

  useEffect(() => {
    if (testsData?.tests.length > 0) {
      const featuredTests = testsData.tests.filter(
        (a) => a.status === "Approved" && a.is_pinned
      );
      return setTests(featuredTests);
    }
  }, [testsData]);

  const icons = [
    "la-fingerprint",
    "la-user-secret",
    "la-bug",
    "la-satellite-dish",
  ];

  const wIcons = tests.map((test, i) => {
    test.icon = icons[i];

    return test;
  });

  return (
    <section className="promo-section my-5 pb-4 mt-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items center tajawal">
          <h2 className="mb-5 section-title tajawal">
            {getString("test-your-knowledge")}
          </h2>
          <span className="d-none d-md-block pt-4">
            <Link to="/tests" className="see-more-link">
              {getString("see-more")}
            </Link>
          </span>
        </div>
        <div className="row">
          {wIcons?.map((test, i) => (
            <SingleTest key={test.id} index={i} {...test} />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <span className="d-md-none">
            <Link to="/tests" className="see-more-link-mobile tajawal">
              {getString("see-more")}
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}

const SingleTest = (props) => {
  const { id, title, description, index, icon } = props;
  const icons = [
    { id: 3, svg: tag },
    { id: 0, svg: tag },
    { id: 1, svg: tag },
    { id: 2, svg: tag },
  ];
  const getIcon = (i) => icons[i].svg;

  return (
    <Link className="col-lg-3 col-sm-6 col-6 mb-3" to={`/test/${id}`}>
      <div className="card test-card test-hover">
        <div className="icon-wrap">
          <img
            className="yellow-tag position-relative"
            src={tag}
            alt=""
            fill="red"
          />
          <span className="icon-8">
            {/* <i className="las la-fingerprint"></i> */}
            <i className={`las ${icon}`}></i>
          </span>
          {/* <img className="test-icon position-absolute" src={icon10} alt="" /> */}
        </div>
        <div className="pt-4 pb-3 px-2 text-center roboto tajawal">
          <h5 className="tajawal">{title}</h5>
          <p className="text-muted mb-0 pr-2 pl-2 feat-test-description">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
