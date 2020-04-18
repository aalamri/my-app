import React from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Query from "../../components/Query";
import { TEST_QUERY } from "./queries";

const Test = () => {
  let { id } = useParams();
  return (
    <Query query={TEST_QUERY} id={id}>
      {({ data: { test } }) => {
        console.log("sssssdata", test);

        return (
          <div>
            <div
              id=""
              className=""
              data-src={
                test.image
                  ? process.env.REACT_APP_BACKEND_URL + test.image.url
                  : ""
              }
              data-srcset={
                test.image
                  ? process.env.REACT_APP_BACKEND_URL + test.image.url
                  : ""
              }
              data-uk-img
            >
              <h1>{test.title}</h1>
            </div>

            <div className="">
              <div className="">
                <ReactMarkdown source={test.content} escapeHtml={false} />
                <p>
                  <Moment format="MMM Do YYYY">{test.published_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Test;
