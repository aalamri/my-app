import React from "react";
import { Link } from "react-router-dom";

const ArticlesRow = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => {
        return (
          <Link
            key={`article__${article.id}`}
            to={`/article/${article.id}`}
            className="uk-link-reset"
          >
            <div className="row">
              {/* <div className="uk-card-media-top">
                      <img
                        src={
                          process.env.REACT_APP_BACKEND_URL + article.image.url
                        }
                        alt={article.image.url}
                        height="100"
                      />
                    </div> */}
              <div className="">
                <p id="category" className="">
                  {article.category?.name}
                </p>
                <p id="title" className="">
                  {article.title}
                </p>
                <p id="title" className="">
                  Likes {article.meta?.likes ?? 0}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticlesRow;
