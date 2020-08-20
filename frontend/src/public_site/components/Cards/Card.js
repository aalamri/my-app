import React from "react";
import { useHistory, useLocation } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { CARD_QUERY } from "./queries";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from "react-share";

const AR = "Arabic";
const EN = "English";

const Card = ({ match }) => {
  let history = useHistory();
  let id = match.params.id;
  let back = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  return (
    <Query query={CARD_QUERY} id={id}>
      {({ data: { card } }) => {
        const shareUrl = `${card.title}       https://modrek-app.herokuapp.com/cards/${card.id}`;
        return (
          <div
            key={card.id}
            id="fullCard"
            tabindex="-1"
            role="modal"
            aria-labelledby="fullCard"
            aria-hidden="true"
          >
            <div className="col-12 col-lg-12 p-0">
              <div className="shadow-md modal-card min-width-400">
                <div className="full-card d-flex flex-column">
                  <div className="modal-eader">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      data-target="#fullCard"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="tale text-center card-name tajawal">
                      {card.title}
                    </h3>
                  </div>

                  <div
                    className={`tajawal  ${
                      card.language === AR ? "text-rtl" : "text-justify"
                    }`}
                  >
                    <p className="full-card tajawal">{card.content}</p>
                  </div>
                  {card.card_url_in_other_language && (
                    <Link
                      className="d-flex justify-content-end pt-3"
                      to={`/cards/${card.card_url_in_other_language}`}
                    >
                      <u className="align-self-end gray tajawal">
                        {card.language === AR
                          ? "English Version"
                          : "النسخة العربية"}
                      </u>
                    </Link>
                  )}
                </div>
                <hr className="yellow-hr" />
                <div className="media author-info myflex">
                  <div className="d-inline-flex">
                    <div
                      className={`d-flex flex-column tajawal text-${
                        card.language === AR ? "right" : "left"
                      }`}
                    >
                      <small className="text-muted ml-2 tale">
                        {card.author?.firstName} {card.author?.lastName}
                      </small>
                      <small className="text-muted ml-2 tale">
                        <Moment format="D/M/Y">{card.createdAt}</Moment>
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
                      <TwitterIcon size={30} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={shareUrl}
                      quote="Check out this Morek Card"
                      className="social-icon d-md-block"
                      alt="whatsapp"
                    >
                      <WhatsappIcon size={30} round />
                    </WhatsappShareButton>
                    <FacebookShareButton
                      url={`https://modrek-app.herokuapp.com/cards/${card.id}`}
                      quote="Check out this Morek Card"
                      className="social-icon d-md-block"
                      alt="facebook"
                    >
                      <FacebookIcon size={30} round />
                    </FacebookShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Card;
