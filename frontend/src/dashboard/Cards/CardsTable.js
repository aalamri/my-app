import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CardsTable = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => {
        return (
            <table class="uk-table uk-table-striped">
              <Link
                  key={`dbcard__${card.id}`}
                  to={`/dbcard/${card.id}`}
                  className="uk-link-reset"
                >
              <thead>
                <tr>
                  <th> Title</th>
                  <th> Published_at</th>
                  <th> Language</th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                
                  <tr>
                    <td>{card.title}</td>
                    <td>
                      <Moment format="MMM Do YYYY">{card.published_at}</Moment>
                    </td>
                    <td>{card.Language}</td>
                    <td><button class="uk-button uk-button-default" onClick={`dbcard__${card.id}`}>View</button></td>
                  </tr>
              </tbody>
              </Link>
            </table>
        );
      })}
    </div>
  );
};

export default CardsTable;
