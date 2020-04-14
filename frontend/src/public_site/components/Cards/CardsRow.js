import React from "react";
import { Link } from "react-router-dom";

const CardsRow = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => {
        return (
          <Link
            key={`card__${card.id}`}
            to={`/card/${card.id}`}
            className="uk-link-reset"
          >
            <div className="row">
              {/* <div className="uk-card-media-top">
                      <img
                        src={
                          process.env.REACT_APP_BACKEND_URL + card.image.url
                        }
                        alt={card.image.url}
                        height="100"
                      />
                    </div> */}
              <div className="">
                <p id="category" className="">
                  {card.category?.name}
                </p>
                <p id="title" className="">
                  {card.title}
                </p>
                <p id="title" className="">
                  Likes {card.meta?.likes ?? 0}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CardsRow;
