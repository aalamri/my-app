import React from "react";
import CardsComponent from "../../components/Cards";
import Query from "../../components/Query";
import CARDS_QUERY from "../../queries/card/cards";

const Cards = () => {
  return (
    <div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Cards</h1>
          <Query query={CARDS_QUERY}>
            {({ data: { cards } }) => {
              return <CardsComponent cards={cards} />;
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Cards;
