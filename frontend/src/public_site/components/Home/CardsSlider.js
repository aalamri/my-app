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
  const [cards, setCards] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;
  const lan = JSON.parse(localStorage.getItem('__modrek_initial_state__')).siteLanguage

  useEffect(() => {
    initialize()
  }, []);
  // (a) => a.status === "Approved" && a.is_pinned 
  const initialize = () => {
    fetch(url + "/cards?language=" + lan + "&status=Approved&is_pinned=true").then((res) =>
      res.json().then((response) => {
        setCards(response);
      })
    );
  };

  const options = {
    loop: true,
    center: true,
    dots: true,
    nav: true,
    rtl: true,
    autoplay: true,
    autoWidth: true,
    autoHeight: true,
    mergeFit: true,
    slideTransition: "linear",
    autoplayHoverPause: true,
    navText: [
      "<i className='las la-angle-left d-none d-sm-block'></i>",
      "<i className='las la-angle-right d-none d-sm-block'></i>",
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
    card_id_of_other_language,
    author,
    createdAt,
  } = props;
  const shareUrl = `${title}       https://modrek-app.herokuapp.com/cards/${id}`;

  return (
    <div className="item ml-lg-5 mr-lg-5 ml-md-4 lr-md-4 card-item-slider">
      <div className="rounded-card white-bg shadow-md p-4 mb-4 min-width-400">
        <Link to={`/cards/${id}`}>
          <div className=" d-flex flex-column tale text-center">
            <h3 className="tale feat-card-title tajawal">{title}</h3>
            <p className="tale feat-card-content m-0 tajawal">{content}</p>
          </div>
        </Link>

        <div
          className={`d-flex justify-content-end pt-${
            card_id_of_other_language ? 1 : 4
          } position-relative`}
        >
          <small className="align-self-end otherlang-row">
            {card_id_of_other_language && (
              <Link className="tale" to={`/cards/${card_id_of_other_language}`}>
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
            <div className="d-flex flex-column mr-2">
              <small className="text-muted mx-auto author-name tale tajawal">
                {author.firstName} {author.lastName}
              </small>
              <small className="text-muted tale ml-auto tajawal">
                <Moment format="D/M/Y">{createdAt}</Moment>
              </small>
            </div>
          </div>
          <div className="py-2 d-inline-flex social-share-icon">
            <TwitterShareButton
              url={shareUrl}
              quote="Check out this Morek Card"
              className="social-icon mx-1 d-md-block"
              alt="twitter"
            >
              <TwitterIcon size={30} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}
              quote="Check out this Morek Card"
              className="social-icon mx-1 d-md-block"
              alt="whatsapp"
            >
              <WhatsappIcon size={30} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://modrek-app.herokuapp.com/cards/${id}`}
              quote="Check out this Morek Card"
              className="social-icon mx-1 d-md-block"
              alt="facebook"
            >
              <FacebookIcon size={30} round />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};
