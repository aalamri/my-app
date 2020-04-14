import React from "react";
import CardsRow from "./CardsRow";
import Query from "../Query";
import { CARDS_QUERY } from "./queries";

const Cards = () => {
  return (
    <div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Cards</h1>
          <Query query={CARDS_QUERY}>
            {({ data: { cards } }) => {
              return <CardsRow cards={cards} />;
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Cards;
