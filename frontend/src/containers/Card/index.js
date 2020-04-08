import React from "react";
import { useParams } from "react-router";
import Query from "../../components/Query";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

import CARD_QUERY from "../../queries/card/card";

const Card = () => {
  let { id } = useParams();
  return (
    <Query query={CARD_QUERY} id={id}>
      {({ data: { card } }) => {
        return (
          <div>
            <div
              id="banner"
              className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
              data-src={process.env.REACT_APP_BACKEND_URL + card.image.url}
              data-srcset={process.env.REACT_APP_BACKEND_URL + card.image.url}
              data-uk-img
            >
              <h1>{card.title}</h1>
            </div>
            <div className="uk-section">
              <div className="uk-container uk-container-small">
                <ReactMarkdown source={card.Content} />
                <p>
                  <Moment format="MMM Do YYYY">{card.published_at}</Moment>
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
