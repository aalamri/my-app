import React from "react";
import CardTable from "./CardsTable";
import Query from "../Query";
import { CARDS_QUERY } from "./queries";
import Dashboard from "../MainDash";

const Cards = () => {
  return (
    <div>
    <Dashboard/>
    <div class="uk-container uk-container-medium">
          <Query query={CARDS_QUERY}>
            {({ data: { cards } }) => {
              return <CardTable cards={cards} />;
            }}
          </Query>
    </div>
    </div>
  );
};

export default Cards;
