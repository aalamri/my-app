import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const ArticlesTable = ({ articles }) => {
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
        {articles.map((article) => {
          return (
            <tbody>
              <tr>
                <td>{article.title}</td>
                <td>{article.status}</td>
                <td>
                  <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                </td>
                <td>{article.Language}</td>
                <td>
                  <Link
                    key={`dbarticle__${article.id}`}
                    to={`/dbarticle/${article.id}`}
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
      <Link to="/create-article"><button class="uk-button uk-button-primary">Create Article</button></Link>

    </div>
  );
};

export default ArticlesTable;
