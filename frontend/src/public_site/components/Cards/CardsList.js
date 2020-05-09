import React from "react";
import CardsRow from "./CardsRow";
import Query from "../Query";
import { CARDS_QUERY } from "./queries";

const Cards = () => {
  return (
    <div>
          <Query query={CARDS_QUERY}>
            {({ data: { cards } }) => {
              return <CardsRow cards={cards} />;
            }}
          </Query>
    </div>
  );
};

export default Cards;
