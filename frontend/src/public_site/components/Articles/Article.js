import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { ARTICLE_QUERY } from "./queries";

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

        const imageUrl = ""
        //   process.env.NODE_ENV !== "development"
        //     ? article.image.url
        //     : process.env.REACT_APP_BACKEND_URL + article.image.url;
        // console.log("imageUrl", imageUrl);

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
          author: {
            id,
            first_name,
            last_name,
          }
        } = article;

        return (
          <section className="testimonial-section ptb-100 " dir={language === AR ? "rtl" : "ltr"}>
            <div className={`container ${language === AR ? 'text-right' : ''}`}>
              <div className="row">
                <div className="col-md-3">
                  <div className="single-promo single-promo-1 rounded text-center white-bg h-100">
                    <h5>{"User Name"}</h5>
                    <p>{"social icons"}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5>{title}</h5>
                  <small>Published at {createdAt.split(".")[0]} by {first_name} {last_name}</small><br />
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
