import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { ARTICLE_QUERY } from "./queries";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import avatarTale from "../../img/avatar-circle-tale.svg";
import avatar from "../../img/avatar-circle.svg";
import twitter from "../../img/twitter-circle.svg";
import whatsapp from "../../img/whatsapp-circle.svg";
import facebook from "../../img/facebook-circle.svg";
import linkedin from "../../img/linkedin-circle.svg";
import thumbsup from "../../img/thumbsup.svg";

import twitterTale from "../../img/twitter-circle-tale.svg";
import linkedinTale from "../../img/linkedin-circle-tale.svg";
import whatsappTale from "../../img/whatsapp-circle-tale.svg";
import facebookTale from "../../img/facebook-circle-tale.svg";
import thumbsupTale from "../../img/thumbsup-tale.svg";
const tale = true;

const AR = "Arabic";
const EN = "English";

console.log(avatarTale, "avatar");

const Article = () => {
  let { id } = useParams();
  return (
    <Query query={ARTICLE_QUERY} id={id}>
      {({ data: { article } }) => {

        if (article == null) {
          return (
            <section className="testimonial-section ptb-100">
              <div className="container">
                <div className="row">
                  <p>Error loading the article!</p>
                </div>
              </div>
            </section>
          )
        }

        const {
          language,
          title,
          content,
          article_id_of_other_language,
          createdAt,
          updatedAt,
          is_deleted,
          image: { url },
          meta: { likes, visits },
          category: { name: category = "" },
          // author: {
          //   id,
          //   first_name,
          //   last_name,
          // }
        } = article;
        const shareUrl = `www.google.com/card/${article.id}`
        const shareUrlDemo = `www.google.com`
        return (
          <div className="module ptb-100" dir={language === AR ? "rtl" : "ltr"}>
            <div className={`container ${language === AR ? 'text-right' : ''}`}>
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div class="sidebar-left pr-4 text-center align-items-center justify-content-center">
                    <aside class="widget widget-categories">
                      <img
                        className="avatar-article pt-5"
                        src={tale ? avatarTale : avatar}
                        alt="client"
                      />
                      <hr class="green-line">
                      </hr>
                      <div class="widget-title text-center">

                        <p class="testlist-name mb-0">Shane Jimenez</p>
                        <h class="text-muted">Surgeon</h>
                      </div>
                      <hr class="green-line">
                      </hr>
                      <div className="p-2 d-inline-flex ">
                        <img class="social-icon d-none d-md-block " src={tale ? twitterTale : linkedin} alt="linkedin" />
                        <img class="social-icon d-none d-md-block " src={tale ? linkedinTale : twitter} alt="twitter" />
                        <img class="social-icon d-none d-md-block " src={tale ? facebookTale : facebook} alt="facebook" />
                        <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                        <span class="pl-1 likes-number">{likes}</span>
                      </div>
                    </aside>
                  </div>
                </div>
                <div className="col-md-6">
                  <article class="post">
                    <div class="post-preview"><a href="#"><img src={url} alt="blog" /></a></div>
                    <div class="post-wrapper">
                      <div class="post-header">
                        <p class="article-title pb-0">{title}</p>
                        <ul class="article-info">
                          <li>Published at {createdAt.split(".")[0]}</li>
                          <li><a href="#">Available only in english</a></li>
                        </ul>
                      </div>
                      <div class="post-content">
                        <ReactMarkdown source={content} escapeHtml={false} />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </Query>
  )
};

export default Article;
