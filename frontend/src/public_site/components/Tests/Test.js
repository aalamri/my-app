import React from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

import Query from "../../components/Query";
import { TEST_QUERY } from "./queries";
import { getString } from "../../../utils";

// TODO get correct paths
const twitterTale = "http://localhost:3000/img/twitter-circle-tale.svg";
const whatsappTale = "http://localhost:3000/img/whatsapp-circle-tale.svg";
const facebookTale = "http://localhost:3000/img/facebook-circle-tale.svg";
const AR = "Arabic";
const EN = "English";

const Test = () => {
  let { id } = useParams();

  return (
    <Query query={TEST_QUERY} id={id}>
      {({ data, loading, error }) => {
        if (error) {
          return (
            <div className="container my-5 py-4 max-width-880">
              <div className="text-center my-5">
                <h3>Error!</h3>
                <p>
                  Please refresh the page, and make sure the URL is correct.
                </p>
              </div>
            </div>
          );
        }
        if (loading) {
          return (
            <div className="container my-5 py-4 max-width-880">
              <div className="text-center my-5">
                <h3>Loading...</h3>
              </div>
            </div>
          );
        }

        const {
          id,
          title,
          description,
          questions,
          author,
          language,
          createdAt,
          test_id_of_other_language,
        } = data?.test;
        const shareUrl = `${title}       https://modrek-app.herokuapp.com/test/${id}`;

        return (
          <div className="main-content-wrap">
            <div
              className={`container my-5 pt-4 max-width-880 ${
                language === AR ? "text-right" : ""
              }`}
              dir={language === AR ? "rtl" : "ltr"}
            >
            <div className="row justify-content-between align-items-center">
                  <div className="col-12 col-lg-9 col-md-9">
                  <h2 className="p-0 pb-3 m-0 test-page-title tajawal">{title}</h2>
                  </div>
                  <div className="col-lg-3 col-md-3 d-none d-lg-block d-md-block">
                  <div className="px-1 d-flex align-items-end social-share-icons">
                  <div className="p-2 d-inline-flex ">
                    <TwitterShareButton
                      url={shareUrl}
                      quote="Check out this Morek Card"
                      className="social-icon mx-1"
                      alt="twitter"
                    >
                      <TwitterIcon size={30} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={shareUrl}
                      quote="Check out this Morek Card"
                      className="social-icon mx-1"
                      alt="whatsapp"
                    >
                      <WhatsappIcon size={30} round />
                    </WhatsappShareButton>
                    <FacebookShareButton
                      url={`https://modrek-app.herokuapp.com/test/${id}`}
                      quote="Check out this Morek Card"
                      className="social-icon mx-1"
                      alt="facebook"
                    >
                      <FacebookIcon size={30} round />
                    </FacebookShareButton>
                  </div>
                </div>
                  </div>
              </div>
              <div className="d-flex justify-content-between">
                <div
                  className={`my-3 tajawal ${
                    language === AR ? "text-right" : ""
                  }`}
                >
                 
                  <small>
                    {getString("published-at")}{" "}
                    <Moment format="D/M/Y">{createdAt}</Moment>
                  </small>
                  {test_id_of_other_language && (
                    <>
                      <span className="px-3">/</span>
                      <Link to={`/test/${test_id_of_other_language}`}>
                        <u className="my-auto gray tajawal">
                          {language === AR
                            ? "English version"
                            : "النسخة العربية"}
                        </u>
                      </Link>
                    </>
                  )}
                </div>
                <div className="px-1"></div>
                <div className="px-1 d-flex align-items-end social-share-icons d-sm-block d-lg-none d-md-none">
                  <div className="p-2 d-inline-flex ">
                    <TwitterShareButton
                      url={shareUrl}
                      quote="Check out this Morek Card"
                      className="social-icon mx-1"
                      alt="twitter"
                    >
                      <TwitterIcon size={30} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={shareUrl}
                      quote="Check out this Morek Card"
                      className="social-icon mx-1"
                      alt="whatsapp"
                    >
                      <WhatsappIcon size={30} round />
                    </WhatsappShareButton>
                    <FacebookShareButton
                      url={`https://modrek-app.herokuapp.com/test/${id}`}
                      quote="Check out this Morek Card"
                      className="social-icon mx-1"
                      alt="facebook"
                    >
                      <FacebookIcon size={30} round />
                    </FacebookShareButton>
                  </div>
                </div>
              </div>

              <div className="tajawal">
                <ReactMarkdown source={description} escapeHtml={false} />
              </div>

              <div className="row d-flex justify-content-between my-5 pb-5 mx-1">
                <span className="px-1 pt-3 tajawal">
                  {questions.length} {getString("questions")}
                </span>
                <Link
                  to={{
                    pathname: `/test/${id}/question/1`,
                    state: { test: data.test, fromTestPage: true },
                  }}
                  className="my-auto"
                >
                  <span className="start-test vertical-center tajawal">
                    {getString("start-the-test")}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Test;
