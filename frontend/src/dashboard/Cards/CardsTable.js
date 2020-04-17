import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CardsTable = ({ cards }) => {
  return (
    <div>
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th> Title</th>
            <th> Status</th>
            <th> Published_at</th>
            <th> Language</th>
            <th> Action </th>
          </tr>
        </thead>
        {cards.map((card) => {
          return (
            <tbody>
              <tr>
                <td>{card.title}</td>
                <td>{card.status}</td>
                <td>
                  <Moment format="MMM Do YYYY">{card.published_at}</Moment>
                </td>
                <td>{card.Language}</td>
                <td>
                  <Link
                    key={`dbcard__${card.id}`}
                    to={`/dbcard/${card.id}`}
                    className="uk-link-reset"
                  >
                    <button class="uk-button uk-button-default">View</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <Link to="/create-card"><button class="uk-button uk-button-primary">Create Card</button></Link>

    </div>
  );
};

export default CardsTable;
