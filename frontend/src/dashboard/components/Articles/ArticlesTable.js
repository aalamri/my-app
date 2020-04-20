import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const ArticlesTable = ({ articles }) => {
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
          {articles.map((article) => {
            return (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.status}</td>
                <td>
                  <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                </td>
                <td>{article.language}</td>
                <td>
                  <Link to={`/article/${article.id}`} className="uk-link-reset">
                    <button className="uk-button uk-button-default">
                      View
                    </button>
                  </Link>
                  <Link
                    to={`/dashboard/articles/edit/${article.id}`}
                    className="uk-link-reset"
                  >
                    <button className="uk-button uk-button-default">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/dashboard/create-article">
        <button className="uk-button uk-button-primary">Create Article</button>
      </Link>
    </div>
  );
};

export default ArticlesTable;
