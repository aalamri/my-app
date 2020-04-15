import React from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../dashboard/Query";
import { CARD_QUERY } from "../../dashboard/Cards/queries";
import Dashboard from "../../dashboard";

const Card = () => {
  let { id } = useParams();
  return (
    <div>
      <Dashboard />
      <div class="uk-container uk-container-medium"></div>
      <Query query={CARD_QUERY} id={id}>
        {({ data: { card } }) => {
          return (
            <div>
                <form>
            <fieldset class="uk-fieldset"></fieldset>
            <legend class="uk-legend">{card.title}</legend>
              {/* <div
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
              </div> */}

              <div className="uk-margin">
                <div className="">
                  <ReactMarkdown source={card.content} escapeHtml={false} />
                  <p>
                    <Moment format="MMM Do YYYY">{card.published_at}</Moment>
                  </p>
                </div>
              </div>
              </form>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Card;
