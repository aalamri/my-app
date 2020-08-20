import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const TestsTable = ({ tests }) => {
  return (
    <div className="box">
    <div className="box-header">
    </div>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <Link to="/dashboard/create-test">
              <ol className="breadcrumb float-sm-right">
                <button type="button" className="btn btn-outline-secondary">  <i className="fa fa-plus plus-size pr-2"></i>New Test</button>
              </ol>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section className="content">

    <div className="card-body p-0">
    <table className="table table-striped projects">
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
                  <button className="view-btn-color btn-sm">
                  View
                  </button>
                  </Link>
                  <Link
                    to={`/dashboard/test/edit/${test.id}`}
                    className="uk-link-reset"
                  >
                  <button className="view-btn-color btn-sm">
                  Edit
                  </button>
                  </Link>
                  <Link
                    to={`/dashboard/reviews/tests/review/${test.id}`}
                    className="uk-link-reset"
                  >
                  <button className="view-btn-color btn-sm">
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
    </section>
    </div>
  );
};

export default TestsTable;
