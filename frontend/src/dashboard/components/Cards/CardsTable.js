import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CardsTable = ({ cards }) => {
  return (
    <div class="box">
    <div class="box-header">
              <h3 class="pl-3 admin-page-title">Card</h3>
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
                  <Link to={`/cards/${card.id}`}>
                    <button className="view-btn-color btn-sm">
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

    </div>
    </div>
    </section>
          
    </div>
  );
};

export default CardsTable;
