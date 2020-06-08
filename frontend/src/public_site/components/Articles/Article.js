import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { ARTICLE_QUERY } from "./queries";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

import avatarTale from "../../img//avatar-circle-tale.svg";
import { getString } from "../../../utils";

const AR = "Arabic";

const Article = () => {
  let { id } = useParams();
  return (
    <Query query={ARTICLE_QUERY} id={id}>
      {({ data: { article } }) => {
        const imageUrl = "";
        // process.env.NODE_ENV !== "development"
        //   ? article.image.url
        //   : process.env.REACT_APP_BACKEND_URL + article.image?.url ?? 'placeholder';
        if (article == null) {
          return (
            <section className="testimonial-section ptb-100">
              <div className="container">
                <div className="row">
                  <p>Error loading the article!</p>
                </div>
              </div>
            </section>
          );
        }

        const {
          language,
          title,
          content,
          article_id_of_other_language,
          createdAt,
        } = article;

        const shareUrl = `${article.title}       https://modrek.sa/article/${article.id}`;

        return (
          <div className="module ptb-100" dir={language === AR ? "rtl" : "ltr"}>
            <div className={`container ${language === AR ? "text-right" : ""}`}>
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div className="sidebar-left pr-4 text-center align-items-center justify-content-center">
                    <aside className="widget widget-categories">
                      <img
                        className="avatar-article pt-5"
                        src={avatarTale}
                        alt="client"
                      />
                      <hr className="green-line"></hr>
                      <div className="widget-title text-center">
                        <p className="testlist-name mb-0 tajawal">
                          {article.author.firstName} {article.author.lastName}
                        </p>
                      </div>
                      <hr className="green-line"></hr>
                      <div className="p-2 d-inline-flex ">
                        <TwitterShareButton
                          url={shareUrl}
                          quote="Check out this Morek Card"
                          className="social-icon d-md-block"
                          alt="twitter"
                        >
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url={shareUrl}
                          quote="Check out this Morek Card"
                          className="social-icon d-md-block"
                          alt="whatsapp"
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <FacebookShareButton
                          url={shareUrl}
                          quote="Check out this Morek Card"
                          className="social-icon d-md-block"
                          alt="facebook"
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </div>
                    </aside>
                  </div>
                </div>
                <div className="col-md-9">
                  <article className="post">
                    <div className="post-preview">
                      <img
                        src={article.image?.url || ""}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="post-wrapper">
                      <div className="post-header">
                        <h2 className="article-title pb-0 tajawal">{title}</h2>
                        <div className="article-info d-flex">
                          <span className="gray tajawal">
                            {language === AR ? "نشر في " : "Published at "}
                            <Moment format="D/M/Y">{createdAt}</Moment>
                          </span>
                          {article_id_of_other_language && (
                            <>
                              <span className="px-4">/</span>{" "}
                              <Link
                                className="tajawal"
                                to={`/article/${article_id_of_other_language}`}
                              >
                                {language === "Arabic"
                                  ? "English Version"
                                  : "النسخة العربية"}
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="post-content tajawal">
                        <ReactMarkdown source={content} escapeHtml={false} />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Article;
