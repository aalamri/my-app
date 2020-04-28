import React from "react";
import CardTable from "../Cards/CardsTable";
import Query from "../Query";
import { CARDS_QUERY } from "../Cards/queries";
import Dashboard from "../MainDash";

const Reviewes = () => {
  return (
    <div>
      <Dashboard />
      <div className="uk-container uk-container-medium">
        <Query query={CARDS_QUERY}>
          {({ data: { cards } }) => {
            return <CardTable cards={cards} />;
          }}
        </Query>
      </div>
    </div>
  );
};


export default Reviewes;
