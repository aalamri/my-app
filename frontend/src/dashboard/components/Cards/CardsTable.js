import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Pagination } from "react-bootstrap";

const CardsTable = ({ cards }) => {
  return (
    <div class="box">
      <div class="box-header">
      </div>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <Link to="/dashboard/create-card">
                <ol class="breadcrumb float-sm-right">
                  <button type="button" class="btn btn-outline-secondary">  <i className="fa fa-plus plus-size pr-2"></i>New Card</button>
                </ol>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section class="content">

        <div class="card">

          <div class="card-body p-0">
            <table class="table table-striped projects">
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
                {cards
                  .filter(({ is_deleted }) => !is_deleted)
                  .map((card) => {
                    return (
                      <tr key={card.id}>
                        <td>{card.title}</td>
                        <td>{card.status}</td>
                        <td>
                          <Moment format="MMM Do YYYY">{card.published_at}</Moment>
                        </td>
                        <td>{card.language}</td>
                        <td>
                          <Link to={`/cards/${card.id}`}>
                            <button className="view-btn-color btn-sm">
                              View
                    </button>
                          </Link>
                          <Link
                            to={`/dashboard/cards/edit/${card.id}`}
                            className="uk-link-reset"
                          >
                            <button className="view-btn-color btn-sm">
                              Edit
                    </button>
                          </Link>
                          <Link
                            to={`/dashboard/reviews/cards/review/${card.id}`}
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
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CardsTable;
