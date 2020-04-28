import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CardsTable = ({ cards }) => {
  return (
    <div>
      <table className="uk-table uk-table-striped">
        <thead>
          <tr>
            <th> Title</th>
            <th> Status</th>
            <th> Published_at</th>
            <th> Language</th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => {
            return (
              <tr key={card.id}>
                <td>{card.title}</td>
                <td>{card.status}</td>
                <td>
                  <Moment format="MMM Do YYYY">{card.published_at}</Moment>
                </td>
                <td>{card.language}</td>
                <td>
                  <Link to={`/card/${card.id}`} className="uk-link-reset">
                    <button className="uk-button uk-button-default">
                      View
                    </button>
                  </Link>
                  <Link
                    to={`/dashboard/cards/edit/${card.id}`}
                    className="uk-link-reset"
                  >
                    <button className="uk-button uk-button-default">
                      Edit
                    </button>
                  </Link>
                  <Link
                    to={`/dashboard/reviews/cards/review/${card.id}`}
                    className="uk-link-reset"
                  >
                    <button className="uk-button uk-button-default">
                      Review
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/dashboard/create-card">
        <button className="uk-button uk-button-primary">Create Card</button>
      </Link>
    </div>
  );
};

export default CardsTable;
