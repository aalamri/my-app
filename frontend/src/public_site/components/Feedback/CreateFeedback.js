import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FEEDBACK_QUERY,CREATE_FEEDBACK,FEEDBACK_TYPE_QUERY } from "./queries";
import { Redirect } from 'react-router-dom';


const CreateFeedback = () => {

  const [toHome, setToHome] = useState(false);
  const { data, loading, error } = useQuery(FEEDBACK_TYPE_QUERY);
  console.log("data",data);
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
        } catch (error) {
          if (error.message.startsWith("Can't find field Feedbacks on object")) {
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


  function handleCreateFeedback(e) {
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
      setTimeout(() => setToHome(true), 2000) /* After clearing Todos, wait two secconds and then let's go back home */
    } catch (error) {
      console.log("Error handleCreateArticle:", error);
    }
  }


    return (
<div>
{toHome ? <Redirect to="/" /> : null}
      <form className="contact-us-form" onSubmit={handleCreateFeedback}>
      <section className="contact-us-section ptb-100">
        <div className="container signup">
          <div className="row">
            <div className="col-md-9 col-lg-9">
              <div className="section-heading mb-4">
                <h2>Get In Touch</h2>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label>TYPE OF FEEDBACK</label>
                      <select className="form-control" name="feedback_type" id="cars">
                      {intialTypes.length > 0 &&
                        intialTypes.map((cat) => {
                          return (
                            <option name="option" key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          );
                        })}
                    </select>
                    </div>
                  </div>
                <div className="col-sm-6 col-12">
                <div className="form-group">
                <label>YOUR EMAIL</label>
                      <input
                        id="email"
                        name="email"
                        placeholder="Email"
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
                    <label>MESSAGE</label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows="7"
                        cols="25"
                        placeholder="Your message"
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
                       Send message
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
