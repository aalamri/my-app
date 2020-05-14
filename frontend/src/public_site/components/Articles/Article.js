import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { ARTICLE_QUERY } from "./queries";
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";

const avatar = "img/avatar-circle.svg";
const twitter = "img/twitter-circle.svg";
const whatsapp = "img/whatsapp-circle.svg";
const facebook = "img/facebook-circle.svg";
const thumbsup = "img/thumbsup.svg";

const avatarTale = "img/avatar-circle-tale.svg";
const twitterTale = "img/twitter-circle-tale.svg";
const whatsappTale = "img/whatsapp-circle-tale.svg";
const facebookTale = "img/facebook-circle-tale.svg";
const thumbsupTale = "img/thumbsup-tale.svg";
const tale = true;

const AR = "Arabic";
const EN = "English";

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
          <section className="testimonial-section ptb-100 " dir={language === AR ? "rtl" : "ltr"}>
            <div className={`container ${language === AR ? 'text-right' : ''}`}>
              <div className="row">
                <div className="col-md-3">
                  <div className="single-promo single-promo-1 rounded text-center white-bg h-100">
                    <h5>{"User Name"}</h5>
                    <small>Mohammed Ahmed</small><br />
                    <div className="p-2 d-inline-flex ">
                          <TwitterShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="twitter"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="whatsapp"
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <FacebookShareButton
                            url={shareUrlDemo}
                            quote="Check out this Morek Card"
                            className="social-icon d-none d-md-block"
                            alt="facebook"

                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          {/* <img
                            class="social-icon d-none d-md-block "
                            src={tale ? facebookTale : facebook}
                            alt="facebook"
                          /> */}
                          <img class="social-icon ml-4" src={tale ? thumbsupTale : thumbsup} alt="thumbsup" />
                          <span class="pl-1 likes-number">{article.meta?.likes ?? 0}</span>
                        </div>
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
          </section>
        )
      }}
    </Query>
  )
};

export default Article;
