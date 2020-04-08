import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ cards }) => {
  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {cards.map((card, i) => {
            return (
              <Link
                key={`card__${card.id}`}
                to={`/card/${card.id}`}
                className="uk-link-reset"
              >
                <div className="uk-card uk-card-muted">
                  <div className="uk-card-media-top">
                    {card.image && (
                      <img
                        src={process.env.REACT_APP_BACKEND_URL + card.image.url}
                        alt={card.image.url}
                        height="100"
                      />
                    )}
                  </div>
                  <div className="uk-card-body">
                    <p id="title" className="uk-text-large">
                      {card.Title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cards;
