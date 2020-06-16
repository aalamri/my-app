import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FEEDBACK_QUERY,
  CREATE_FEEDBACK,
  FEEDBACK_TYPE_QUERY,
} from "./queries";
import { Redirect } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import { getState, getString } from "../../../utils";

const CreateFeedback = () => {
  const state = getState();
  const emailUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";
  const strapi = new Strapi(emailUrl);
  const [toHome, setToHome] = useState(false);
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [bodyMessage, setBodyMessage] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [message, setMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
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

  function handleBodyMessage(e) {
    setBodyMessage(e.target.value);
    setFormError({ error: false, message: "" });
  }

  async function handleCreateFeedback(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const message = formData.get("message");

      if (message.length > 1000) {
        setFormError({
          error: true,
          message: getString("message-longer-than-1000-char"),
        });
        return;
      }

      setSubmitLoading(true);
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
      console.log("test feedback");
      /* After clearing Todos, wait two secconds and then let's go back home */
    } catch (error) {
      setSubmitLoading(false);
      setTimeout(() => setToHome(true), 5000);
      console.log("Error handleCreateArticle:", JSON.stringify(error, null, 2));
    }
  }
  if (toHome) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  return (
    <div className="main-content-wrap">
      {message}
      <form onSubmit={handleCreateFeedback}>
        <section className="hero-section pt-100">
          <div className="container max-width-880">
            <div
              className={state.siteLanguage === "Arabic" ? "text-right" : ""}
            >
              <div className="section-heading mb-4">
                <h3 class="purple tajawal">{getString("get-in-touch")}</h3>
              </div>
            </div>
            <br></br>
            <div className="row align-items-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className={`form-group tajawal ${
                        state.siteLanguage === "Arabic" ? "text-right" : ""
                      }`}
                    >
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
                  <div className="col-md-6">
                    <div
                      className={`form-group tajawal ${
                        state.siteLanguage === "Arabic" ? "text-right" : ""
                      }`}
                    >
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
                    <div
                      className={`form-group tajawal ${
                        state.siteLanguage === "Arabic" ? "text-right" : ""
                      }`}
                    >
                      <label>{getString("body-message")}</label>
                      <textarea
                        value={bodyMessage}
                        onChange={handleBodyMessage}
                        name="message"
                        id="message"
                        className="form-control"
                        rows="5"
                        cols="25"
                        placeholder={getString("body-message-placeholder")}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                {formError.error && (
                  <div
                    class={`alert alert-danger tajawal ${
                      state.siteLanguage === "Arabic" ? "text-right" : ""
                    }`}
                    role="alert"
                  >
                    {formError.message}
                  </div>
                )}
                <div className="row">
                  <div
                    className={`col-sm-12 my-3 ${
                      state.siteLanguage === "Arabic" ? "text-right" : ""
                    }`}
                  >
                    <button
                      type="submit"
                      className="btn solid-btn signupBtn tajawal mb-5"
                      disabled={submitLoading}
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
