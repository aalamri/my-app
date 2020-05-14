import React, {useState} from "react";
import { Link } from "react-router-dom";
import Query from "../Query";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CATEGORIES_QUERY } from "../Category/queries";
import { CATEGORY_CARDS_QUERY, CATEGORY_CARDS_BY_ID_QUERY } from "./queries";

import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
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

const CardsRow = ({ cards }) => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const intialCategories = data ? data.categories : [];
  const [selectedCategory, setSelectCategory] = useState(null);
  const [likes, setLikes] = useState(0);

  function handleCategory(id) {
    setSelectCategory(id);
    
  }

  // const handleClick = value => () => 
  // alert(value)

  return (
    <div>
      <section className="hero-section pt-100">
        <div className="container">
          <div className="row">
            <span class="col-lg-1 pr-0 vertical-cenrer" href="#">
              <a href="/articles">

                <img class="img-responsive" src="img/article-gray-btn.svg" />
              </a>
            </span>
            <span class="col-lg-1 pl-0 vertical-cenrer" href="#">
              <a href="/cards">
                <img class="img-responsive" src="img/cards-color-btn.svg" />
              </a>
            </span>
            <span class="col-lg-1">
              <img src="img/sort-icon.svg" class="dropdown btn sort-btn" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

              <div class="dropdown-menu dropdown-primary" id="dropDiv">
                <a class="dropdown-item" href="#1">sort 1</a>
                <a class="dropdown-item" href="#2">sort 2</a>
                <a class="dropdown-item" href="#3">sort 3</a>
                <a class="dropdown-item" href="#4">sort 4</a>
              </div>
            </span>
          </div>
          <div className="row">

            <div class="pn-ProductNav_Wrapper">
              <nav id="pnProductNav" class="pn-ProductNav">
                <div id="pnProductNavContents" class="pn-ProductNav_Contents">
                <Query query={selectedCategory === null ?CATEGORY_CARDS_QUERY : CATEGORY_CARDS_BY_ID_QUERY} id={selectedCategory}>
                {({ data }) => {

                  console.log("data", data);
                return 3
                }}
              </Query>
                {intialCategories.length > 0 &&
                intialCategories.map((cat) => {
                  return (
                    <Link class="pn-ProductNav_Link" aria-selected="true">{cat?.name}</Link>

                  );
                })}
                  <span id="pnIndicator" class="pn-ProductNav_Indicator"></span>
                </div>
              </nav>
            </div>
          </div>
          <div className="row">
            {cards.map((card) => {
              const shareUrl = `www.google.com/card/${card.id}`
              const shareUrlDemo = `www.google.com`

              return (
                <div class="col-lg-6 pt-5">

                  <div class="single-article rounded card border-0 shadow-sm">
                    <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
                      <div className="client-say d-flex flex-column tale">
                      <Link key={card.id} to={`/card/${card.id}`}>

                        <h3 className="tale text-center card-name">
                          {card.title}
                        </h3>
                        <p className="tale text-center">
                          {card.content}
                        </p>
                        </Link>
                        <small className="align-self-end">
                          <u>Arabic Version</u>
                        </small>
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
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="twitter"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="whatsapp"
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <FacebookShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="facebook"

                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          {/* <img
                            class="social-icon d-none d-md-block "
                            src={tale ? facebookTale : facebook}
                            alt="facebook"
                          /> */}
                          
                          <img
                            class="social-icon ml-4"
                            src={tale ? thumbsupTale : thumbsup}
                            alt="thumbsup"
                          />
                          <Link>
                          <span class="pl-1 likes-number" >{card.meta?.likes ?? 0}
                          </span>
                          </Link>
                          // <button class="pl-1 likes-number" onClick={handleClick(card.id)}></button>

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

    </div>
  );
};

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default CardsRow;
