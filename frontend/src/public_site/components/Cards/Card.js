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
        console.log("card", card.language);

        const shareUrl = `${card.title}       https://modrek.sa/cards/${card.id}`;
        return (
          <div key={card.id} class="col-lg-12" style={{ padding: 0 }}>
            <div className="rounded white-bg shadow-md p-4 min-width-400">
              <div className="full-card d-flex flex-column tale">
                <h3 className="tale text-center card-name tajawal">
                  {card.title}
                </h3>
                <div
                  className={`tajawal text-${
                    card.language === AR ? "right" : "left"
                  }`}
                >
                  <p className="full-card tale tajawal">{card.content}</p>
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
                    <small class="text-muted ml-2 tale">
                      {card.author?.firstName} {card.author?.lastName}
                    </small>
                    <small class="text-muted ml-2 tale">
                      <Moment format="D/M/Y">{card.createdAt}</Moment>
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
        );
      }}
    </Query>
  );
};

export default Card;
