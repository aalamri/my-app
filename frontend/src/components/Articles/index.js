import React from "react";
import { Link } from "react-router-dom";

const Articles = ({ articles }) => {
  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {articles.map((article, i) => {
            return (
              <Link
                key={`article__${article.id}`}
                to={`/article/${article.id}`}
                className="uk-link-reset"
              >
                <div className="uk-card uk-card-muted">
                  <div className="uk-card-media-top">
                  {article.image && (
                    <img
                      src={
                        process.env.REACT_APP_BACKEND_URL + article.image.url
                      }
                      alt={article.image.url}
                      height="100"
                    />
                  )}
                  </div>
                  <div className="uk-card-body">
                    <p id="category" className="uk-text-uppercase">
                      {article.category.name}
                    </p>
                    <p id="title" className="uk-text-large">
                      {article.title}
                    </p>
                    <p id="title" className="uk-text-large">
                      Likes {article.stats?.likes ?? 0}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Articles;
