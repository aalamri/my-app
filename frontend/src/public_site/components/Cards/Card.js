import React from "react";
import { useHistory, useLocation } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { CARD_QUERY } from "./queries";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Card = ({match}) => {
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
              <h1>{card.title}</h1>
            </div>

            <div className="">
              <div className="">
                <ReactMarkdown source={card.content} escapeHtml={false} />
                <p>
                  <Moment format="MMM Do YYYY">{card.createdAt}</Moment>
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Card;
