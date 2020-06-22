import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const ArticlesTable = ({ articles }) => {
  return (
    <div class="box">
      <div class="box-header">
      </div>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <Link to="/dashboard/create-article">
                <ol class="breadcrumb float-sm-right">
                  <button type="button" class="btn btn-outline-secondary">  <i className="fa fa-plus plus-size pr-2"></i>New Article</button>
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
                {articles
                  .filter(({ is_deleted }) => !is_deleted)
                  .map((article) => {
                    return (
                      <tr key={article.id}>
                        <td>{article.title}</td>
                        <td>{article.status}</td>
                        <td>
                          <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                        </td>
                        <td>{article.language}</td>
                        <td>
                          <Link
                            to={`/article/${article.id}`}
                          >
                            <button className="view-btn-color btn-sm">
                              View
                      </button>
                          </Link>
                          <Link
                            to={`/dashboard/articles/edit/${article.id}`}
                            className="uk-link-reset"
                          >
                            <button className="view-btn-color btn-sm">
                              Edit
                      </button>
                          </Link>
                          <Link
                            to={`/dashboard/reviews/articles/review/${article.id}`}
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
        </div>
      </section>

    </div>
  );
};

export default ArticlesTable;
