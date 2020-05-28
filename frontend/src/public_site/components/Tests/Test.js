import React from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import Query from "../../components/Query";
import { TEST_QUERY } from "./queries";

// TODO get correct paths
const twitterTale = "http://localhost:3000/img/twitter-circle-tale.svg";
const whatsappTale = "http://localhost:3000/img/whatsapp-circle-tale.svg";
const facebookTale = "http://localhost:3000/img/facebook-circle-tale.svg";
const thumbsupTale = "http://localhost:3000/img/thumbsup-tale.svg";

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
                <p>Please refresh the page, and make sure the URL is correct.</p>
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

        const { test } = data;
        return (
          <div className="container my-5 pt-4 max-width-880">
            <div className="d-flex align-items-center">
              <div className="mr-auto my-3">
                <h2 className="p-0 m-0">{test.title}</h2>
                <span className="px-1">{test.questions.length} Questions</span>
              </div>
              <div className="px-1">
                <small className="">
                  Published on <Moment format="MMM Do YYYY">{test.createdAt}</Moment>
                </small>
              </div>
              <div className="px-1">
                <div className="p-2 d-inline-flex ">
                  <img className="social-icon d-none d-md-block " src={twitterTale} alt="whatsapp" />
                  <img className="social-icon d-none d-md-block " src={whatsappTale} alt="twitter" />
                  <img className="social-icon d-none d-md-block " src={facebookTale} alt="facebook" />
                  <img className="social-icon" src={thumbsupTale} alt="thumbsup" />
                  <span className="pl-1 likes-number">{test.meta?.likes || 0}</span>
                </div>
              </div>
            </div>

            <div className="">
              <ReactMarkdown source={test.description} escapeHtml={false} />
            </div>

            <div className="row d-flex justify-content-between my-5 pb-5 mx-1">
              <Link to="ar-version" className="my-5"><u>Arabic version</u></Link>
              <Link to={{
                pathname: `/test/${id}/question/1`,
                state: { test, fromTestPage: true }
              }}
                className="my-5">
                <span className="btn btn-lg gradient-purple-btn">START THE TEST</span>
              </Link>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Test;
