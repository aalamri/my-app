import React from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { ARTICLE_QUERY } from "./queries";

const Article = () => {
  let { id } = useParams();
  return (
    <Query query={ARTICLE_QUERY} id={id}>
      {({ data: { article } }) => {
        if (article.is_deleted) {
          return <p>DELETED article</p>;
        }
        const imageUrl = ""
        //   process.env.NODE_ENV !== "development"
        //     ? article.image.url
        //     : process.env.REACT_APP_BACKEND_URL + article.image.url;
        // console.log("imageUrl", imageUrl);

        return (
          <div>
            <img src={imageUrl} alt="" />
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
