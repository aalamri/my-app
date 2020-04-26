import React from "react";
import { useParams } from "react-router";
import CardsList from "../../components/Cards/CardsList";
import Query from "../../components/Query";
import { TAG_CARDS_QUERY } from "./queries";

const Tag = () => {
  let { id } = useParams();

  return (
    <Query query={TAG_CARDS_QUERY} id={id}>
      {({ data: { tag } }) => {
        return (
          <div>
            <div className="uk-section">
              <div className="uk-container uk-container-large">
                <h1>{tag.Subject}</h1>
                <CardsList cards={tag.cards} />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Tag;
