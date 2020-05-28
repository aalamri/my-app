import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel2';
import { ModalRoute, } from 'react-router-modal';
import Query from "../Query";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "../Category/queries";
import { CATEGORY_CARDS_QUERY, CATEGORY_CARDS_BY_ID_QUERY, CARDS_QUERY, CARDS_SORT_ALPHA_ASC, CARDS_SORT_CREATED_ASC, CARDS_SORT_ALPHA_DESC, CARDS_SORT_CREATED_DESC } from "./queries";

import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import Card from "./Card"
const avatar = "img/avatar-circle.svg";
const twitter = "img/twitter-circle.svg";
const whatsapp = "img/whatsapp-circle.svg";
const facebook = "img/facebook-circle.svg";
const thumbsup = "img/thumbsup.svg";

const avatarTale = "img/avatar-circle-tale.svg";
const twitterTale = "img/twitter-circle-tale.svg";
const whatsappTale = "img/whatsapp-circle-tale.svg";
const facebookTale = "img/facebook-circle-tale.svg";
const thumbsupTale = "img/thumbsup-tale.svg";
const tale = true;

const AR = 'Arabic';
const EN = 'English';

const options = {
  autoplay: false,
  loop: false,
  margin: 0,
  nav: true,
  slideTransition: 'linear',
  autoplayHoverPause: true,
  navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
  responsive: {
    0: {
      items: 3
    },
    500: {
      items: 3
    },
    600: {
      items: 3
    },
    800: {
      items: 7
    },
    1200: {
      items: 7
    }

  }
};

const events = {
  onDragged: function (event) {
    console.log("onDragged", event);
  },
  onChanged: function (event) {
    console.log("onChanged", event);
  }
};


const CardsRow = ({ match }) => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const intialCategories = data ? data.categories : [];
  const [selectedCategory, setSelectCategory] = useState(null);
  const [cards, getCards] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    fetch(url + '/cards').then(res => res.json().then(response => { getCards(response) }))
  }

  const selectCategory = (id) => {
    fetch(url + '/cards?category=' + id).then(res => res.json().then(response => { getCards(response) }))
  }

  const selectAll = () => {
    fetch(url + '/cards').then(res => res.json().then(response => { getCards(response) }));
  }
  return (
    <div>
      <section className="hero-section pt-100">
        <div className="container">
          <div className="row align-tem-center justify-content-between">
            <div className="col-lg-7 col-md-4">
              <h1 className="section-title page-title">Knowledge</h1>
            </div>
            <div className="col-lg-5 col-md-7 text-md-right">
              <div className="pt-2 action-btn-wrap">
                <span class="col-lg-1 col-md-1 pr-0 knowldege-btn" href="#">
                  <a href="/articles">
                    <img class="img-responsive" src="img/article-gray-btn.svg" />
                  </a>
                </span>
                <span class="col-lg-1 col-md-1 pl-0 knowldege-btn" href="#">
                  <a href="/cards">
                    <img class="img-responsive" src="img/cards-color-btn.svg" />
                  </a>
                </span>
                <span class="col-lg-1 sm-align-right">
                  <img src="img/sort-icon.svg" class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                  <div class="dropdown-menu dropdown-primary" id="dropDiv">
                  <Query query={CARDS_SORT_ALPHA_ASC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getCards(data.cards); }}>Alphabetic(A-Z)</div>
                  }}
                </Query>
                <Query query={CARDS_SORT_ALPHA_DESC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getCards(data.cards); }}>Alphabetic(Z-A)</div>
                  }}
                </Query>
                <Query query={CARDS_SORT_CREATED_DESC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getCards(data.cards); }}>Newest Published</div>
                  }}
                </Query>
                <Query query={CARDS_SORT_CREATED_ASC}>
                  {({ data, loading, error }) => {
                    return <div class="dropdown-item" onClick={() => { getCards(data.cards); }}>Oldest Published</div>
                  }}
                </Query>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
          <div className="col-md-12">
            {/* <div className="mt-5 text-center owl-carousel category-carousel nav-indicator"> */}
            {/*{categories.map(cat =>
                    <div key={cat.id} className="item single-client">
                      <a href="#" className="px-1">{cat.name}</a>
                    </div>
                     )}*/}

            <OwlCarousel className="mt-5 text-center owl-carousel category-carousel nav-indicator" options={options} events={events} >
              <div className="px-1 cat-title" style={{ color: selectedCategory === null ? "#e7bd5b" : '#707070'}} onClick={() => { setSelectCategory(null); selectAll(); }}>All Categories</div>
              {intialCategories.length > 0 &&
                intialCategories.map((cat, index) => {
                  return (
              <div className="px-1 cat-title" style={{ color: selectedCategory === cat.id ? "#e7bd5b" : '#707070' }} onClick={() => { setSelectCategory(cat.id); selectCategory(cat.id) }}>{cat?.name}</div>
              );
            })}      
            </OwlCarousel>
          </div>
        </div>
          <div className="row">
            {cards.map((card) => {
              const shareUrl = `http://localhost:3000/cards/${card.id}`
              const shareUrlDemo = `www.google.com`

              return (
                <div class="col-lg-6 pt-5">
                  <div class="single-article rounded card border-0 shadow-sm">
                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                      <div className="client-say d-flex flex-column tale">
                        <Link key={card.id} to={`${match.url}/${card.id}`}>
                          <h3 className="tale text-center card-name">
                            {card.title}
                          </h3>
                          <p className="tale text-center">
                            {card.content}
                          </p>
                        </Link>
                        {card.card_url_in_other_language &&
                          <Link className="d-flex justify-content-end pt-3" to={`/cards/${card.card_url_in_other_language}`}>
                            <small className="align-self-end gray">
                              {card.language === AR
                                ? 'النسخة العربية'
                                : 'English Version'
                              }
                            </small>
                          </Link>
                        }
                      </div>
                      <hr className="yellow-hr" />
                      <div className="media author-info myflex">
                        <div className="d-inline-flex">
                          <img
                            className="avatar-placeholder"
                            src={tale ? avatarTale : avatar}
                            alt="client"
                          />
                          <div className="d-flex flex-column">
                            <small class="text-muted ml-2 tale">Name</small>
                            <small class="text-muted ml-2 tale">
                              {card.published_at}
                            </small>
                          </div>
                        </div>
                        <div className="p-2 d-inline-flex ">
                          <TwitterShareButton
                            url={shareUrl}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="twitter"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={shareUrl}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="whatsapp"
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <FacebookShareButton
                            url={shareUrl}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
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
      <ModalRoute path={`${match.url}/:id`} component={Card} parentPath="/cards" />
    </div>
  );
};

export default CardsRow;
