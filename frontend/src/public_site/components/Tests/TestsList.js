import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel2";
import { useQuery } from "@apollo/react-hooks";

import Query from "../Query";
import { GET_TESTS_LIST } from "./queries";
import { getState, getString } from "../../../utils";

const AR = "Arabic";

const options = {
  autoplay: false,
  loop: false,
  margin: 0,
  nav: true,
  slideTransition: "linear",
  autoplayHoverPause: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 7,
    },
    500: {
      items: 7,
    },
    600: {
      items: 3,
    },
    800: {
      items: 5,
    },
    1200: {
      items: 7,
    },
  },
};

const events = {
  onDragged: function (event) {
    // console.log("onDragged", event);
  },
  onChanged: function (event) {
    // console.log("onChanged", event.target);
  },
};

const Tests = () => {
  const state = getState(); // get from localStorage, or return initial default state
  const [activeCatId, setActiveCatId] = useState(null);
  const { data, loading, error } = useQuery(GET_TESTS_LIST);
  const [fetchedTests, setFetchedTests] = useState([]); // TODO useRef instead
  const [displayedTests, setDisplayedTests] = useState([]);

  useEffect(() => {
    if (data) {
      setFetchedTests(data.tests);
      setDisplayedTests(data.tests);
    }
  }, [data]);

  useEffect(() => {
    if (activeCatId) {
      return setDisplayedTests(
        fetchedTests.filter(({ category: { id } }) => id === activeCatId)
      );
    }
    return setDisplayedTests(fetchedTests);
  }, [activeCatId]);

  const categories =
    data?.tests
      .map(({ category: { id, name } }) => ({ id, name }))
      .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i) || [];

  const CategoriesList =
    state.siteLanguage === AR ? CategoriesListAR : CategoriesListEN;

  return (
    <section>
      <div className="container">
        <div className="row mt-5 p-3">
          <h2 className="section-title tajawal">{getString("tests")}</h2>
        </div>

        {categories.length > 0 && (
          <div className="row justify-content-center">
            <div className="col-md-12">
              <OwlCarousel
                className="mt-5 text-center owl-carousel category-carousel nav-indicator"
                options={options}
                events={events}
              >
                <CategoriesList
                  categories={categories}
                  activeCatId={activeCatId}
                  setActiveCatId={setActiveCatId}
                />
              </OwlCarousel>
            </div>
          </div>
        )}

        <div className="row mt-4">
          {displayedTests.map(({ id, title, description }) => (
            <div key={id} className="col-lg-3 col-sm-6 my-2">
              <Link to={`/test/${id}`}>
                <div className="card single-test single-test-hover">
                  <div className="card-body">
                    {/* <div className="pb-2">
                          <span className="ti-credit-card icon-md color-secondary"></span>
                        </div> */}
                    <div className="pt-2 pb-3 text-center tajawal">
                      <h5 className="test-title tale tajawal">{title}</h5>
                      <p className="text-muted mb-0 feat-test-description">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tests;

const CategoriesListAR = ({ categories, activeCatId, setActiveCatId }) => (
  <>
    <div className="item">
      <span
        href="#"
        className={`py-2 px-3 cat-title tajawal ${
          activeCatId == null ? "cat-title-active" : ""
        }`}
        onClick={() => setActiveCatId(null)}
      >
        الكل
      </span>
    </div>
    {categories.map((cat) => (
      <div key={cat.id} className="item">
        <span
          href="#"
          className={`py-2 px-3 cat-title ${
            activeCatId === cat.id ? "cat-title-active" : ""
          }`}
          onClick={() => setActiveCatId(cat.id)}
        >
          {cat.name}
        </span>
      </div>
    ))}
  </>
);

const CategoriesListEN = ({ categories, activeCatId, setActiveCatId }) => (
  <>
    {categories.map((cat) => (
      <div key={cat.id} className="item">
        <span
          href="#"
          className={`py-2 px-3 cat-title ${
            activeCatId === cat.id ? "cat-title-active" : ""
          }`}
          onClick={() => setActiveCatId(cat.id)}
        >
          {cat.name}
        </span>
      </div>
    ))}
    <div className="item">
      <span
        href="#"
        className={`py-2 px-3 cat-title ${
          activeCatId == null ? "cat-title-active" : ""
        }`}
        onClick={() => setActiveCatId(null)}
      >
        All
      </span>
    </div>
  </>
);
