import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import Moment from "react-moment";

import { FEATURED_ARTICLE_QUERY } from "./queries";
import { getState, getString } from "../../../utils";

const AR = "Arabic";
const EN = "English";

export default function (props) {
  const state = getState();
  const { data: articlesData, loading, error } = useQuery(
    FEATURED_ARTICLE_QUERY
  );
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (articlesData?.articles.length > 0) {
      const featuredArticles = articlesData.articles.filter(
        (a) => a.status === "Approved" && a.is_pinned
      );
      return setArticles(featuredArticles);
    }
  }, [articlesData]);

  return (
    <section id="about" className="about-us">
      <div className="container">
        <div className="d-flex justify-content-between align-items center tajawal">
          <h1 className="titles mb-5 section-title tajawal">
            {getString("articles")}
          </h1>
          <span className="pt-4 d-none d-md-block">
            <Link to="/articles" className="see-more-link">
              {getString("see-more")}
            </Link>
          </span>
        </div>
        {loading && <p className="text-center">{getString("loading")}</p>}
        <div className="row align-items-center">
          {articles?.map((article, i) => (
            <SingleArticle
              key={article.id}
              {...article}
              index={i}
              siteLanguage={state.siteLanguage}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <span className="d-md-none tajawal">
            <Link to="/articles" className="see-more-link-mobile">
              {getString("see-more")}
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}

const SingleArticle = (props, i) => {
  const {
    index,
    id,
    title,
    content,
    image,
    createdAt,
    author,
    language,
    siteLanguage,
  } = props;

  const imageUrl =
    process.env.NODE_ENV !== "development"
      ? image.url
      : process.env.REACT_APP_BACKEND_URL + image?.url ?? "placeholder";
  const shareUrl = `${title}       https://modrek-app.herokuapp.com/article/${id}`;

  return (
    <div
      className={`col-lg-6 col-md-12 ${language === AR ? "text-right" : ""}`}
    >
      <div className="single-blog-card card border-0">
        <Link to={`/article/${id}`}>
          <img
            src={image?.url || ""}
            className="card-img-top position-relative"
            alt=""
            height="250"
          />
        </Link>
        <div className="card-body">
          <Link to={`/article/${id}`}>
            <h3 className="card-title tajawal">{title}</h3>
            <p className="text-justify article-content tajawal">{content}</p>
          </Link>
        </div>
        <hr className="yellow-hr hover-to-color" />
        <div className="media author-info myflex card-footer">
          <div className="d-inline-flex">
            <div
              className={`d-flex flex-column hover-to-color tajawal text-${
                siteLanguage === AR ? "right" : "left"
              }`}
            >
              <small className="text-muted ml-2 tale-author">
                {author.firstName} {author.lastName}
              </small>
              <small className="text-muted ml-2 tale-author">
                <Moment format="D/M/Y">{createdAt}</Moment>
              </small>
            </div>
          </div>
          <div className="p-2 d-inline-flex ">
            <TwitterShareButton
              url={shareUrl}
              quote="Check out this Morek Card"
              className="hover-to-color social-icon d-md-block"
              alt="twitter"
            >
              <TwitterIcon size={30} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}
              quote="Check out this Morek Card"
              className="hover-to-color social-icon d-md-block"
              alt="whatsapp"
            >
              <WhatsappIcon size={30} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://modrek-app.herokuapp.com/article/${id}`}
              quote="Check out this Morek Card"
              className="hover-to-color social-icon d-md-block"
              alt="facebook"
            >
              <FacebookIcon size={30} round />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};
