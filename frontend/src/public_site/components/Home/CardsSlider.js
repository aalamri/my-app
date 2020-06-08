import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel2";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import Moment from "react-moment";

import { FEATURED_CARDS_QUERY } from "./queries";

const avatarTale = "img/avatar-circle-tale.svg";
// const twitterTale = "img/twitter-circle-tale.svg";
// const whatsappTale = "img/whatsapp-circle-tale.svg";
// const facebookTale = "img/facebook-circle-tale.svg";

export default function (props) {
  const { data: cardsData /*, loading, error*/ } = useQuery(
    FEATURED_CARDS_QUERY
  );
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (cardsData?.cards.length > 0) {
      const featuredCards = cardsData.cards.filter(
        (a) => a.status === "Approved" && a.is_pinned // TODO move to the query & limit to 5
      );
      return setCards(featuredCards);
    }
  }, [cardsData]);

  const options = {
    loop: true,
    center: true,
    dots: true,
    nav: true,
    rtl:true,
    autoplay: true,
    autoWidth: true,
    autoHeight: true,
    mergeFit: true,
    slideTransition: "linear",
    autoplayHoverPause: true,
    navText: [
      "<i class='las la-angle-left d-none d-sm-block'></i>",
      "<i class='las la-angle-right d-none d-sm-block'></i>",
    ],
    responsive: {
      0: {
        items: 4,
      },
      // 991: {
      //     items: 4,
      // },
      // 1200: {
      //     items: 4,
      // },
      1920: {
        items: 4,
      },
    },
  };
  return (
    <section
      className="hero-section gradient-purple-bg pt-2"
      style={{
        backgroundImage: "linear-gradient(to right, #713e6d, #593a6c)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {cards.length > 0 && (
        <div className="screen-slider-content mt-4 min-hiegth-300">
          <OwlCarousel
            className="feat-cards-carousel owl-carousel owl-theme dot-indicator"
            options={options}
          >
            {cards.map((card) => {
              return <SingleCard key={card.id} {...card} />;
            })}
          </OwlCarousel>
        </div>
      )}
      {/* <div className="section-shape position-absolute">
            <img className="yellow-curve" src="img/yellow-curve.svg" alt="shape" />
            </div> */}
    </section>
  );
}

const SingleCard = (props) => {
  const {
    id,
    title,
    content,
    language,
    card_url_in_other_language,
    author,
    createdAt,
  } = props;
  const shareUrl = `${title}       https://modrek.sa/cards/${id}`;

  return (
    <div className="item ml-lg-5 mr-lg-5 ml-md-4 lr-md-4 card-item-slider">
      <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
        <Link to={`/cards/${id}`}>
          <div className=" d-flex flex-column tale text-center">
            <h3 className="tale feat-card-title">{title}</h3>
            <p className="tale feat-card-content m-0">{content}</p>
          </div>
        </Link>

        <div
          className={`d-flex justify-content-end pt-${
            card_url_in_other_language ? 1 : 4
          } position-relative`}
        >
          <small className="align-self-end otherlang-row">
            {card_url_in_other_language && (
              <Link
                className="tale"
                to={`/cards/${card_url_in_other_language}`}
              >
                <u>
                  {language === "Arabic" ? "النسخة العربية" : "English Version"}
                </u>
              </Link>
            )}
          </small>
        </div>

        <hr className="yellow-hr" />
        <div className="media author-info myflex">
          <div className="d-inline-flex">
            <img className="avatar-placeholder" src={avatarTale} alt="client" />
            <div className="d-flex flex-column">
              <small className="text-muted ml-1 tale">
                {author.firstName} {author.lastName}
              </small>
              <small className="text-muted ml-1 tale">
                <Moment format="D MMM YYYY">{createdAt}</Moment>
              </small>
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
              url={shareUrl}
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
  );
};
