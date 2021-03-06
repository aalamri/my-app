import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel2";
import {
  ARTICLES_SORT_ALPHA_ASC,
  ARTICLES_SORT_ALPHA_DESC,
  ARTICLES_SORT_CREATED_ASC,
  ARTICLES_SORT_CREATED_DESC,
  ARTICLES_QUERY,
} from "./queries";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import Moment from "react-moment";

import Query from "../Query";
import { useQuery } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "../Category/queries";
import { getState, getString } from "../../../utils";

const AR = "Arabic";
const EN = "English";

const options = {
  autoplay: false,
  loop: false,
  margin: 0,
  rtl: true,
  nav: true,
  slideTransition: "linear",
  autoplayHoverPause: true,
  navText: [
    "<i className='fa fa-chevron-left'></i>",
    "<i className='fa fa-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 3,
    },
    500: {
      items: 3,
    },
    600: {
      items: 3,
    },
    800: {
      items: 6,
    },
    1200: {
      items: 7,
    },
  },
};

// const events = {
//   onDragged: function (event) {
//     // console.log("onDragged", event);
//   },
//   onChanged: function (event) {
//     // console.log("onChanged", event);
//   },
// };

const ArticlesRow = () => {
  const state = getState(); // get from localStorage, or return initial default state

  const { data /*, loading, error*/ } = useQuery(CATEGORIES_QUERY);
  const intialCategories = data ? data.categories : [];
  const articles_data = useQuery(ARTICLES_QUERY).data;
  const initialArticles = articles_data ? articles_data.articles : [];
  const [selectedCategory, setSelectCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;
  const lan = JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    fetch(url + "/articles?language=" + lan).then((res) =>
      res.json().then((response) => {
        setArticles(response);
      })
    );
  };
  const selectCategory = (id) => {
    fetch(url + "/articles?category=" + id+"&language=" + lan).then((res) =>
      res.json().then((response) => {
        setArticles(response);
      })
    );
  };

  const selectAll = () => {
    fetch(url + "/articles?language=" + lan).then((res) =>
      res.json().then((response) => {
        setArticles(response);
      })
    );
  };

  return (
    <div className="main-content-wrap">
      <section className="hero-section pt-100">
        <div className="container">
          {state.siteLanguage === AR ? (
            <TopRowAR setArticles={setArticles} />
          ) : (
              <TopRowEN setArticles={setArticles} />
            )}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <OwlCarousel
                className="mt-5 mb-5 text-center owl-carousel category-carousel nav-indicator"
                options={options}
              // events={events}
              >
                <>
                  {state.siteLanguage === AR && (
                    <div
                      className={`px-1 cat-title tajawal ${
                        selectedCategory === null ? "cat-title-active" : ""
                        }`}
                      onClick={() => {
                        setSelectCategory(null);
                        selectAll();
                      }}
                    >
                      الكل
                    </div>
                  )}
                  {intialCategories.length > 0 &&
                    intialCategories.map((cat, index) => {
                      return (
                        <div
                          key={index}
                          className={`px-1 cat-title ${
                            selectedCategory === cat.id
                              ? "cat-title-active"
                              : ""
                            }`}
                          onClick={() => {
                            setSelectCategory(cat.id);
                            selectCategory(cat.id);
                          }}
                        >
                          {cat?.name}
                        </div>
                      );
                    })}
                  {state.siteLanguage === EN && (
                    <div
                      className={`px-1 cat-title tajawal ${
                        selectedCategory === null ? "cat-title-active" : ""
                        }`}
                      onClick={() => {
                        setSelectCategory(null);
                        selectAll();
                      }}
                    >
                      All
                    </div>
                  )}
                </>
              </OwlCarousel>
            </div>
          </div>
          <div className="row">
            {articles.map((article) => {
              const {
                id,
                title,
                content,
                language,
                author,
                createdAt,
                image,
              } = article;
              {
                /* const imageUrl = ""; */
              }
              // process.env.NODE_ENV !== "development"
              //   ? article.image.url
              //   : process.env.REACT_APP_BACKEND_URL + article.image?.url ?? 'placeholder';
              const shareUrl = `${title}   https://modrek-app.herokuapp.com/article/${id}`;
              return (
                <div key={id} className="col-lg-6 col-md-12">
                  <div className="single-blog-card card border-0">
                    <Link to={`/article/${id}`}>
                      <img
                        src={image?.url || ""}
                        className="card-img-top position-relative"
                        alt=""
                        height="250"
                      />
                    </Link>
                    <div
                      className={`card-body ${
                        state.siteLanguage === AR ? "text-right" : ""
                        }`}
                    >
                      <Link to={`/article/${id}`}>
                        <h3 className="card-title tajawal">{title}</h3>
                        <p className="text-justify tale article-content tajawal">
                          {content}
                        </p>
                      </Link>
                    </div>
                    <hr className="yellow-hr hover-to-color" />
                    <div className="media author-info myflex card-footer">
                      <div className="d-inline-flex">
                        <div
                          className={`d-flex flex-column hover-to-color tajawal text-${
                            state.siteLanguage === AR ? "right" : "left"
                            }`}
                        >
                          <small className="text-muted ml-2 tale">
                            {author.firstName} {author.lastName}
                          </small>
                          <small className="text-muted ml-2 tale">
                            <Moment format="D/M/Y">{createdAt}</Moment>
                          </small>
                        </div>
                      </div>
                      <div className="p-2 d-inline-flex ">
                        <TwitterShareButton
                          url={shareUrl}
                          quote="Check out this Morek Card"
                          className="hover-to-color social-icon"
                          alt="twitter"
                        >
                          <TwitterIcon size={30} round />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url={shareUrl}
                          quote="Check out this Morek Card"
                          className="hover-to-color social-icon"
                          alt="whatsapp"
                        >
                          <WhatsappIcon size={30} round />
                        </WhatsappShareButton>
                        <FacebookShareButton
                          url={`https://modrek-app.herokuapp.com/article/${id}`}
                          quote="Check out this Morek Card"
                          className="hover-to-color social-icon"
                          alt="facebook"
                        >
                          <FacebookIcon size={30} round />
                        </FacebookShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesRow;

const TopRowAR = ({ setArticles }) => (
  <div className="row align-tem-center justify-content-between">
    <div className="col-5 col-lg-7 col-md-4 text-right">
      <h1 className="section-title page-title tajawal mb-0">
        {getString("knowledge")}
      </h1>
    </div>
    <div className="col-7 col-lg-5 col-md-7 d-flex justify-content-end">
      <div className="d-flex align-items-center action-btn-wrap">
        <span className="col-lg-1 col-md-1 pl-0 knowldege-btn">
          <a href="/cards">
            <span>
              <img
                className="img-responsive"
                src={`${window.location.origin}/img/card-gray-ar-mobile.svg`}
                alt=""
              />
            </span>
          </a>
        </span>
        <span className="col-lg-1 col-md-1 pr-0 knowldege-btn">
          <a href="/articles">
            <span>
              <img
                className="img-responsive"
                src={`${window.location.origin}/img/article-yellow-ar-mobile.svg`}
                alt=""
              />
            </span>
          </a>
        </span>

        <span className="col-lg-1 sm-align-right-rtl">
          <img
            src={`${window.location.origin}/img/sort-icon.svg`}
            className="dropdown btn sort-btn-rtl"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            alt=""
          />
          <div className="dropdown-menu dropdown-primary" id="dropDiv">
            <Query query={ARTICLES_SORT_ALPHA_ASC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item tajawal"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    أبجدي (أ - ي)
                  </div>
                );
              }}
            </Query>
            <Query query={ARTICLES_SORT_ALPHA_DESC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item tajawal"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    أبجدي (ي - أ)
                  </div>
                );
              }}
            </Query>
            <Query query={ARTICLES_SORT_CREATED_DESC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item tajawal"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    الأحدث
                  </div>
                );
              }}
            </Query>
            <Query query={ARTICLES_SORT_CREATED_ASC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item tajawal"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    الأقدم
                  </div>
                );
              }}
            </Query>
          </div>
        </span>
      </div>
    </div>
  </div>
);

const TopRowEN = ({ setArticles }) => (
  <div className="row align-items-center justify-content-between">
    <div className="col-5 col-lg-7 col-md-4">
      <h1 className="section-title page-title roboto mb-0">
        {getString("knowledge")}
      </h1>
    </div>
    <div className="col-7 col-lg-5 col-md-8 text-right">
      <div className="d-flex flex-row justify-content-end">
        <span className="col-lg-1 col-md-1 pr-0 knowldege-btn">
          <a href="/articles">
              <img
                className="img-responsive"
                src={`${window.location.origin}/img/article-yellow-mobile.svg`}
                alt=""
              />
          </a>
        </span>
        <span className="col-lg-1 col-md-1 pl-0 knowldege-btn last-type">
          <a href="/cards">
            <img
              className="img-responsive"
              src={`${window.location.origin}/img/card-gray-mobile.svg`}
              alt=""
            />
          </a>
        </span>
        <span className="short-icon">
          <img
            src="img/sort-icon.svg"
            className="dropdown btn sort-btn"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            alt=""
          />
          <div className="dropdown-menu dropdown-primary position-relative" id="dropDiv">
            <Query query={ARTICLES_SORT_ALPHA_ASC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    Alphabetic(A-Z)
                  </div>
                );
              }}
            </Query>
            <Query query={ARTICLES_SORT_ALPHA_DESC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    Alphabetic(Z-A)
                  </div>
                );
              }}
            </Query>
            <Query query={ARTICLES_SORT_CREATED_DESC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    Newest Published
                  </div>
                );
              }}
            </Query>
            <Query query={ARTICLES_SORT_CREATED_ASC} variables={{ lan: JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage }}>
              {({ data }) => {
                return (
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setArticles(data.articles);
                    }}
                  >
                    Oldest Published
                  </div>
                );
              }}
            </Query>
          </div>
        </span>
      </div>
    </div>
    {/* small screens */}

    {/* large screens */}
  </div>
);
