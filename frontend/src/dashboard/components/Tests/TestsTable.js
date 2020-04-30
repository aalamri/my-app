import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const TestsTable = ({ tests }) => {
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
          {tests.map((test) => {
            return (
              <tr key={test.id}>
                <td>{test.title}</td>
                <td>{test.status}</td>
                <td>
                  <Moment format="MMM Do YYYY">{test.published_at}</Moment>
                </td>
                <td>{test.language}</td>
                <td>
                  <Link to={`/test/${test.id}`} className="uk-link-reset">
                    <button className="uk-button uk-button-default">
                      View
                    </button>
                  </Link>
                  <Link
                    to={`/dashboard/test/edit/${test.id}`}
                    className="uk-link-reset"
                  >
                    <button className="uk-button uk-button-default">
                      Edit
                    </button>
                  </Link>
                  <Link
                    to={`/dashboard/reviews/tests/review/${test.id}`}
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
    </div>
  );
};

export default TestsTable;
