import React from "react";
import { useHistory, useLocation } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { CARD_QUERY } from "./queries";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FacebookIcon, WhatsappIcon, TwitterIcon, TwitterShareButton, WhatsappShareButton, FacebookShareButton } from "react-share";

const avatar = "img/avatar-circle.svg";

const avatarTale = "img/avatar-circle-tale.svg";
const tale = true;

const AR = 'Arabic';
const EN = 'English';
const Card = ({ match }) => {
  let history = useHistory();
  let id = match.params.id
  console.log('here')
  let back = e => {
    e.stopPropagation();
    history.goBack();
  };
  return (
    <Query query={CARD_QUERY} id={id}>
      {({ data: { card } }) => {
        const shareUrl = `http://localhost:3000/cards/${card.id}`
        return (
          // <div>
          //   <div
          //     id=""
          //     className=""
          //     data-src={
          //       card.image
          //         ? process.env.REACT_APP_BACKEND_URL + card.image.url
          //         : ""
          //     }
          //     data-srcset={
          //       card.image
          //         ? process.env.REACT_APP_BACKEND_URL + card.image.url
          //         : ""
          //     }
          //     data-uk-img
          //   >
          //     <h3 className="w-100 tale card-name text-center">{card.title}</h3>
          //   </div>

          //   <div class="modal-body px-5">
          //     <div className="client-say d-flex flex-column tale">
          //       <ReactMarkdown className="tale text-center" source={card.content} escapeHtml={false} />
          //       {card.card_url_in_other_language &&
          //         <Link className="d-flex justify-content-end pt-3" to={`/cards/${card.card_url_in_other_language}`}>
          //           <small className="align-self-end gray">
          //             {card.language === 'Arabic'
          //               ? 'النسخة العربية'
          //               : 'English Version'
          //             }
          //           </small>
          //         </Link>
          //       }
          //     </div>
          //   </div>
          // </div>
          <div class="col-lg-12" style={{padding:0}}>
            <div class="single-article rounded card border-0 shadow-sm">
              <div className="  white-bg shadow-md p-4 min-width-400">
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
      }}
    </Query>
  );
};

export default Card;
