import React from "react";
import { useHistory, useLocation } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { CARD_QUERY } from "./queries";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        return (
          <div>
            <div
              id=""
              className=""
              data-src={
                card.image
                  ? process.env.REACT_APP_BACKEND_URL + card.image.url
                  : ""
              }
              data-srcset={
                card.image
                  ? process.env.REACT_APP_BACKEND_URL + card.image.url
                  : ""
              }
              data-uk-img
            >
              <h3 className="w-100 tale card-name text-center">{card.title}</h3>
            </div>

            <div class="modal-body px-5">
              <div className="client-say d-flex flex-column tale">
                <ReactMarkdown className="tale text-center" source={card.content} escapeHtml={false} />
                {card.card_url_in_other_language &&
                  <Link className="d-flex justify-content-end pt-3" to={`/cards/${card.card_url_in_other_language}`}>
                    <small className="align-self-end gray">
                      {card.language === 'Arabic'
                        ? 'النسخة العربية'
                        : 'English Version'
                      }
                    </small>
                  </Link>
                }
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Card;
