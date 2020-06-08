import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FEEDBACK_QUERY,
  CREATE_FEEDBACK,
  FEEDBACK_TYPE_QUERY,
} from "./queries";
import { Redirect } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import { getString } from "../../../utils";

const CreateFeedback = () => {
  const emailUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";
  const strapi = new Strapi(emailUrl);
  const [toHome, setToHome] = useState(false);
  const [message, setMessage] = useState("");
  const { data, loading, error } = useQuery(FEEDBACK_TYPE_QUERY);
  const intialTypes = data ? data.feedbackTypes : [];
  const [createFeedback, { data: createFeedbackData }] = useMutation(
    CREATE_FEEDBACK,
    {
      update(cache, { data: { createFeedback } }) {
        try {
          const { feedbacks } = cache.readQuery({ query: FEEDBACK_QUERY });
          cache.writeQuery({
            query: FEEDBACK_QUERY,
            data: { feedbacks: feedbacks.concat([createFeedback]) },
          });
          setMessage(`thank you for your message`);
        } catch (error) {
          if (
            error.message.startsWith("Can't find field Feedbacks on object")
          ) {
            cache.writeQuery({
              query: FEEDBACK_QUERY,
              data: { feedbacks: [createFeedback] },
            });
          } else {
            console.log("CreateFeedback error:", error);
          }
        }
      },
    }
  );

  const [currentType, setCurrentType] = useState({
    id: null,
    name: null,
  });
  console.log("types", currentType);

  if (loading) {
    return <span>loading</span>;
  }
  if (error) {
    return <span>error</span>;
  }

  async function handleCreateFeedback(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const message = formData.get("message");

      const payload = {
        email,
        message,
        feedback_type: getCatID(intialTypes, formData.get("feedback_type")),
      };
      createFeedback({
        variables: { data: payload } /*TODO add headers token here*/,
      });
      await strapi.request("POST", "/email", {
        data: {
          to: email,
          subject: `Feedback`,
          text: "You have new feedback",
          html: "<bold>Feedback message:</bold>" + message,
        },
      });
      setTimeout(
        () => setToHome(true),
        2000
      ); /* After clearing Todos, wait two secconds and then let's go back home */
    } catch (error) {
      console.log("Error handleCreateArticle:", error);
    }
  }

  return (
    <div>
      {message}
      <form onSubmit={handleCreateFeedback}>
        <section className="hero-section pt-100">
          <div className="container">
            <div className="row align-tem-center justify-content-between">
              <div className="col-md-9 col-lg-9">
                <div className="section-heading mb-4">
                  <h2 class="purple">{getString("get-in-touch")}</h2>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row align-items-center">
              <div className="col-12 max-width-880">
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label>{getString("type-of-feedback")}</label>
                      <select
                        className="form-control"
                        name="feedback_type"
                        id="cars"
                      >
                        {intialTypes.length > 0 &&
                          intialTypes.map((cat) => {
                            return (
                              <option
                                name="option"
                                key={cat.id}
                                value={cat.name}
                              >
                                {cat.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label>{getString("your-email")}</label>
                      <input
                        id="email"
                        name="email"
                        placeholder={getString("your-email-placeholder")}
                        type="email"
                        cols="25"
                        className="form-control"
                        required="required"
                      />
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>{getString("body-message")}</label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows="7"
                        cols="25"
                        placeholder={getString("body-message-placeholder")}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 mt-3">
                    <button
                      type="submit"
                      className="btn solid-btn signupBtn"
                      disabled={loading}
                    >
                      {getString("send-message")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default CreateFeedback;
