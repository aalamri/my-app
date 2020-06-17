import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel2";
import { ModalRoute } from "react-router-modal";
import Query from "../Query";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "../Category/queries";
import {
  CARDS_SORT_ALPHA_ASC,
  CARDS_SORT_CREATED_ASC,
  CARDS_SORT_ALPHA_DESC,
  CARDS_SORT_CREATED_DESC,
} from "./queries";
import Moment from "react-moment";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import Card from "./Card";
import { getState, getString } from "../../../utils";

const avatarTale = "img/avatar-circle-tale.svg";

const AR = "Arabic";
const EN = "English";

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
      items: 3,
    },
    500: {
      items: 3,
    },
    600: {
      items: 3,
    },
    800: {
      items: 7,
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
    // console.log("onChanged", event);
  },
};

const CardsRow = ({ match }) => {
  const state = getState();
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const intialCategories = data ? data.categories : [];
  const [selectedCategory, setSelectCategory] = useState(null);
  const [cards, setCards] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    fetch(url + "/cards").then((res) =>
      res.json().then((response) => {
        setCards(response);
      })
    );
  };

  const selectCategory = (id) => {
    fetch(url + "/cards?category=" + id).then((res) =>
      res.json().then((response) => {
        setCards(response);
      })
    );
  };

  const selectAll = () => {
    fetch(url + "/cards").then((res) =>
      res.json().then((response) => {
        setCards(response);
      })
    );
  };

  return (
    <div className="main-content-wrap">
      <section className="hero-section pt-100">
        <div className="container">
          {state.siteLanguage === AR ? (
            <TopRowAR setCards={setCards} />
          ) : (
            <TopRowEN setCards={setCards} />
          )}

          <div className="row justify-content-center">
            <div className="col-md-12">
              <OwlCarousel
                className="mt-5 text-center owl-carousel category-carousel nav-indicator"
                options={options}
                events={events}
              >
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
                          selectedCategory === cat.id ? "cat-title-active" : ""
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
              </OwlCarousel>
            </div>
          </div>
          <div className="row">
            {cards.map((card) => {
              const shareUrl = `${card.title} https://modrek-app.herokuapp.com/cards/${card.id}`;
              return (
                <div key={card.id} class="col-lg-6 pt-5">
                  <div class="rounded card border-0">
                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                      <div className="d-flex flex-column text-center">
                        <Link key={card.id} to={`${match.url}/${card.id}`}>
                          <h3 className="card-name tale tajawal">
                            {card.title}
                          </h3>
                          <p className="card-content gray text-justify tajawal">
                            {card.content}
                          </p>
                        </Link>
                        <div
                          className={`d-flex justify-content-end pt-${
                            card.card_url_in_other_language ? 0 : 4
                          } pb-0`}
                        >
                          <small className="otherlang-row">
                            {card.card_url_in_other_language && (
                              <Link
                                className="gray tajawal"
                                to={`/cards/${card.card_url_in_other_language}`}
                              >
                                <u>
                                  {card.language === "Arabic"
                                    ? "English Version"
                                    : "النسخة العربية"}
                                </u>
                              </Link>
                            )}
                          </small>
                        </div>
                      </div>
                      <hr className="yellow-hr" />
                      <div className="media author-info myflex">
                        <div className="d-inline-flex">
                          <img
                            className="avatar-placeholder mx-2"
                            src={`${window.location.origin}/${avatarTale}`}
                            alt="client"
                          />
                          <div
                            className={`d-flex flex-column text-${
                              state.siteLanguage === AR ? "right" : "left"
                            }`}
                          >
                            <h6 class="text-muted ml-2 tale tajawal">
                              {card.author?.firstName} {card.author?.lastName}
                            </h6>
                            <Moment
                              class="text-muted ml-2 tale tajawal"
                              format="D/M/Y"
                            >
                              {card.createdAt}
                            </Moment>
                          </div>
                        </div>
                        <div className="p-2 d-inline-flex ">
                          <TwitterShareButton
                            url={shareUrl}
                            quote="Check out this Morek Card"
                            className="social-icon d-md-block"
                            alt="twitter"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={shareUrl}
                            quote="Check out this Morek Card"
                            className="social-icon d-md-block"
                            alt="whatsapp"
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <FacebookShareButton
                            url={`https://modrek-app.herokuapp.com/cards/${card.id}`}
                            quote="Check out this Morek Card"
                            className="social-icon d-md-block"
                            alt="facebook"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <ModalRoute
        path={`${match.url}/:id`}
        component={Card}
        parentPath="/cards"
      />
    </div>
  );
};

export default CardsRow;

const TopRowAR = ({ setCards }) => (
  <div className="row align-tem-center justify-content-between">
    <div className="col-lg-7 col-md-4 text-right">
      <h1 className="section-title page-title tajawal">
        {getString("knowledge")}
      </h1>
    </div>
    <div className="col-lg-5 col-md-7 d-flex justify-content-end">
      <div className="d-flex align-items-center pt-2 action-btn-wrap">
        <span class="col-lg-1 col-md-1 pl-0 knowldege-btn">
          <span>
            <img
              class="img-responsive"
              src={`${window.location.origin}/img/cards-color-btn-ar.svg`}
            />
          </span>
        </span>
        <span class="col-lg-1 col-md-1 pr-0 knowldege-btn" href="#">
          <a href="/articles">
            <img
              class="img-responsive"
              src={`${window.location.origin}/img/article-gray-btn-ar.svg`}
            />
          </a>
        </span>
        <span class="col-lg-1 sm-align-right-rtl">
          <img
            src={`${window.location.origin}/img/sort-icon.svg`}
            class="dropdown btn sort-btn-rtl"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <div class="dropdown-menu dropdown-primary" id="dropDiv">
            <Query query={CARDS_SORT_ALPHA_ASC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item tajawal"
                    onClick={() => {
                      setCards(data.cards);
                    }}
                  >
                    أبجدي (أ - ي)
                  </div>
                );
              }}
            </Query>
            <Query query={CARDS_SORT_ALPHA_DESC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item tajawal"
                    onClick={() => {
                      setCards(data.cards);
                    }}
                  >
                    أبجدي (ي - أ)
                  </div>
                );
              }}
            </Query>
            <Query query={CARDS_SORT_CREATED_DESC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item tajawal"
                    onClick={() => {
                      setCards(data.cards);
                    }}
                  >
                    الأحدث
                  </div>
                );
              }}
            </Query>
            <Query query={CARDS_SORT_CREATED_ASC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item tajawal"
                    onClick={() => {
                      setCards(data.cards);
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

const TopRowEN = ({ setCards }) => (
  <div className="row align-tem-center justify-content-between">
    <div className="col-lg-7 col-md-4">
      <h1 className="section-title page-title roboto">
        {getString("knowledge")}
      </h1>
    </div>
    <div className="col-lg-5 col-md-7 text-md-right">
      <div className="pt-2 action-btn-wrap">
        <span class="col-lg-1 col-md-1 pr-0 knowldege-btn" href="#">
          <a href="/articles">
            <img class="img-responsive" src="img/article-gray-btn.svg" />
          </a>
        </span>
        <span class="col-lg-1 col-md-1 pl-0 knowldege-btn">
          <span>
            <img class="img-responsive" src="img/cards-color-btn.svg" />
          </span>
        </span>
        <span class="col-lg-1 sm-align-right">
          <img
            src="img/sort-icon.svg"
            class="dropdown btn sort-btn"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <div class="dropdown-menu dropdown-primary" id="dropDiv">
            <Query query={CARDS_SORT_ALPHA_ASC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item"
                    onClick={() => {
                      setCards(data.cards);
                    }}
                  >
                    Alphabetic(A-Z)
                  </div>
                );
              }}
            </Query>
            <Query query={CARDS_SORT_ALPHA_DESC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item"
                    onClick={() => {
                      setCards(data.cards);
                    }}
                  >
                    Alphabetic(Z-A)
                  </div>
                );
              }}
            </Query>
            <Query query={CARDS_SORT_CREATED_DESC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item"
                    onClick={() => {
                      setCards(data.cards);
                    }}
                  >
                    Newest Published
                  </div>
                );
              }}
            </Query>
            <Query query={CARDS_SORT_CREATED_ASC}>
              {({ data, loading, error }) => {
                return (
                  <div
                    class="dropdown-item"
                    onClick={() => {
                      setCards(data.cards);
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
  </div>
);
