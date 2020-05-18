import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { ARTICLE_QUERY } from "./queries";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import avatarTale from "./img/avatar-circle-tale.svg";

import avatar from "./img/avatar-circle.svg";
const twitter = "img/twitter-circle.svg";
const whatsapp = "img/whatsapp-circle.svg";
const facebook = "img/facebook-circle.svg";
const linkedin = "img/linkedin-circle.svg";
const thumbsup = "img/thumbsup.svg";

const twitterTale = "img/twitter-circle-tale.svg";
const linkedinTale = "img/linkedin-circle-tale.svg";
const whatsappTale = "img/whatsapp-circle-tale.svg";
const facebookTale = "img/facebook-circle-tale.svg";
const thumbsupTale = "img/thumbsup-tale.svg";
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
                        <span class="pl-1 likes-number">121</span>
                      </div>
                    </aside>
                  </div>
                </div>
                <div className="col-md-6">
                  <h2>{title}</h2>
                  <small>Published at {createdAt.split(".")[0]} by Mohammed Ahmed</small><br />
                  {createdAt?.split(".")[0] !== updatedAt?.split(".")[0] &&
                    <small>updated at {updatedAt.split(".")[0]}</small>
                  }
                  <ReactMarkdown source={content} escapeHtml={false} />
                  <div>
                    <span>Category: {category}</span><br />
                    <span>likes: {likes}</span><br />
                    <span>views: {visits}</span><br />
                    {article_id_of_other_language &&
                      <span>Article in {language === AR ? EN : AR}: <Link to={`/article/${article_id_of_other_language}`}>Click here</Link></span>
                    }
                  </div>
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
