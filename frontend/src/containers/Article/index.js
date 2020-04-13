import React from "react";
import { useParams } from "react-router";
import Query from "../../components/Query";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

import ARTICLE_QUERY from "../../queries/article/article";

const Article = () => {
  let { id } = useParams();
  return (
    <Query query={ARTICLE_QUERY} id={id}>
      {({ data: { article } }) => {
        return (
          <div>
            <div
              id=""
              className=""
              data-src={
                article.image
                  ? process.env.REACT_APP_BACKEND_URL + article.image.url
                  : ""
              }
              data-srcset={
                article.image
                  ? process.env.REACT_APP_BACKEND_URL + article.image.url
                  : ""
              }
              data-uk-img
            >
              <h1>{article.title}</h1>
            </div>

            <div className="">
              <div className="">
                <ReactMarkdown source={article.content} escapeHtml={false} />
                <p>
                  <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Article;
