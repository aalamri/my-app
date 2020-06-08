import React, { useState } from "react";
import { Link } from "react-router-dom";

import { getState, getString } from "../../../utils";

const AR = "Arabic";

const TestResult = (props) => {
  const state = getState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [emailResultStatus, setEmailResultStatus] = useState(null);
  const [email, setEmail] = useState("");

  if (props.location.state == null) {
    // user MUST come from a test with a `state` prop via the router
    return (
      <section
        className="question-section ptb-100"
        dir={state.siteLanguage === AR ? "rtl" : "ltr"}
      >
        <div className="container max-width-880">
          <p>{getString("invalid-page")}</p>
        </div>
      </section>
    );
  }

  const { title, questions, language } = props.location.state.test;
  function goPrevious() {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
  function goNext() {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
  function emailResult() {
    if (/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      const emailSentSuccessfully = (
        <div
          className="alert alert-success alert-dismissible fade show mt-3"
          role="alert"
        >
          Result sent to your email!
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setEmailResultStatus(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
      setTimeout(() => setEmailResultStatus(emailSentSuccessfully), 1000);
    } else {
      const invalidAlert = (
        <div
          className="alert alert-warning alert-dismissible fade show mt-3"
          role="alert"
        >
          Please enter a valid email!
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setEmailResultStatus(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
      setEmailResultStatus(invalidAlert);
    }
  }
  function handleOnChangeEmail({ target }) {
    setEmailResultStatus(null);
    setEmail(target.value);
  }

  const question = questions[currentQuestionIndex - 1];
  question.language = language;
  const questionsWithScore = calculatScores(questions);
  const correctAnswers = questionsWithScore.filter(
    ({ answeredCorrectly }) => answeredCorrectly
  ).length;

  return (
    <>
      <section className="question-section py-5 gradient-purple-bg">
        <div className="container max-width-880 py-3">
          <div className="text-center">
            <h3 className="roboto-black color-white tajawal">
              {getString("thanks-for-taking-test")}
            </h3>
            <h1 className="roboto-black color-white rem4 tajawal">"{title}"</h1>
            <h2 className="roboto-black color-white tajawal">
              {getString("you-scored")}{" "}
              {`${correctAnswers}/${questions.length}`}
            </h2>
          </div>
        </div>
      </section>

      <div className="text-center pt-3 mt-5">
        <h4 className="sent-email-text my-2 tajawal">
          {getString("send-result-to-email")}
        </h4>
        <div className="text-center mt-5">
          <form
            action="#"
            method="post"
            className="send-form text-center m-auto"
          >
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control search-input px-4"
                id="email"
                name="email"
                placeholder="info@yourdomain.com"
              />
              <input
                type="send"
                className="button btn send-btn tajawal"
                id="send"
                defaultValue={getString("send")}
              />
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">{emailResultStatus}</div>
      </div>

      <div className="text-center mt-5">
        <h1 className="tale roboto-black rem4 tajawal">
          {getString("answers")}
        </h1>
      </div>

      <div
        className={`container max-width-880 py-3 ${
          language === AR ? "text-right" : ""
        }`}
      >
        {/* {currentQuestionIndex % 2 === 0 &&
                <img
                  src={imageUrl}
                  className="card-img-top position-relative border-q-img"
                  height="80%"
                  alt=""
                />
              } */}
        <p className="test-no my-3">{`${currentQuestionIndex}/${questions.length}`}</p>
        <h4 className="question tajawal">{question.title}</h4>
        <p className="py-2 tajawal">{question.content}</p>
      </div>

      <div
        className={`container max-width-880 py-3 text-${
          language === AR ? "right" : "left"
        }`}
      >
        <h5>
          <span className="answer-status ml-3 tajawal">
            (
            {question.userSelection == null
              ? getString("skipped")
              : getString("answered")}
            )
          </span>
        </h5>
        <div className="custom-control custom-checkbox">
          {displayChoices(question)}
        </div>
      </div>
      <section className="container max-width-880">
        <hr className="yellow-hr-thin" />

        <div className={`text-${language === AR ? "left" : "right"}`}>
          {currentQuestionIndex > 1 && (
            <span className="next-previous mx-2 tajawal" onClick={goPrevious}>
              {getString("previous")}
            </span>
          )}
          {currentQuestionIndex < questions.length && (
            <span className="next-previous mx-2 tajawal" onClick={goNext}>
              {getString("next")}
            </span>
          )}
        </div>
      </section>
    </>
  );
};

function calculatScores(questions) {
  return questions.map((question, i) => {
    const {
      choices_type,
      userSelection,
      correct_answer,
      choice_1,
      choice_2,
      choice_3,
      choice_4,
      choice_5,
      choice_6,
      choice_1_is_correct,
      choice_2_is_correct,
      choice_3_is_correct,
      choice_4_is_correct,
      choice_5_is_correct,
      choice_6_is_correct,
    } = question;

    if (userSelection == null) return question; // a skipped question

    if (choices_type === "single") {
      question.answeredCorrectly = userSelection === correct_answer;
    }

    if (question.choices_type === "multiple") {
      const validChoices = [
        { choice_1, choice_1_is_correct, choice: 1 },
        { choice_2, choice_2_is_correct, choice: 2 },
        { choice_3, choice_3_is_correct, choice: 3 },
        { choice_4, choice_4_is_correct, choice: 4 },
        { choice_5, choice_5_is_correct, choice: 5 },
        { choice_6, choice_6_is_correct, choice: 6 },
      ].filter(
        (c) => Object.values(c)[0] != null && Object.values(c)[0].trim() != ""
      );
      const correctChoices = validChoices
        .filter((q, i) => q[`choice_${q.choice}_is_correct`])
        .map((q, i) => q[`choice_${q.choice}`]);
      const markChoices = correctChoices.map((c) => userSelection.includes(c));
      question.answeredCorrectly =
        correctChoices.length === userSelection.length &&
        !markChoices.some((c) => c === false);
    }
    return question;
  });
}

function displayChoices(question) {
  const { choices_type } = question;
  if (choices_type === "multiple") {
    return <MultipleChoicesQuestion {...question} />;
  } else if (choices_type === "single") {
    return <SingleChoiceQuestion {...question} />;
  } else {
    throw Error(`ERROR displayChoices: Unknown choices type ${choices_type}`);
  }
}

const MultipleChoicesQuestion = (question) => {
  const {
    id,
    choice_1,
    choice_2,
    choice_3,
    choice_4,
    choice_5,
    choice_6,
    choice_1_is_correct,
    choice_2_is_correct,
    choice_3_is_correct,
    choice_4_is_correct,
    choice_5_is_correct,
    choice_6_is_correct,
    userSelection = [],
    language,
  } = question;

  const validChoices = [
    { choice_1, choice_1_is_correct, choice: 1 },
    { choice_2, choice_2_is_correct, choice: 2 },
    { choice_3, choice_3_is_correct, choice: 3 },
    { choice_4, choice_4_is_correct, choice: 4 },
    { choice_5, choice_5_is_correct, choice: 5 },
    { choice_6, choice_6_is_correct, choice: 6 },
  ].filter(
    (c) => Object.values(c)[0] != null && Object.values(c)[0].trim() != ""
  );

  const correctChoices = validChoices
    .filter((q, i) => q[`choice_${q.choice}_is_correct`])
    .map((q, i) => q[`choice_${q.choice}`]);
  const wrongChoices = validChoices
    .filter((q, i) => !q[`choice_${q.choice}_is_correct`])
    .map((q, i) => q[`choice_${q.choice}`]);

  const choiceComponent = (text) => {
    const isSelected = (userSelection && userSelection.includes(text)) || false;
    const isCorrectAnswer = correctChoices.includes(text);
    const isWrongAnswer = wrongChoices.includes(text);

    return (
      <div
        key={text}
        className={`d-flex p-2 form-check question-choice-result ${
          isSelected ? "selected-choice" : ""
        }`}
      >
        <input
          id={`choice_${text}`}
          className="form-check-input"
          type="checkbox"
          name="choices"
          className="position-relative form-check-input mx-2"
          defaultChecked={isSelected}
          disabled
        />
        <label className="form-check-label tajawal" htmlFor={`choice_${text}`}>
          {text}
        </label>
        <div className={language === AR ? "mr-auto" : "ml-auto"}>
          {isCorrectAnswer && (
            <span className="badge badge-pill ml-1 badge-success align-self-end tajawal">
              {getString("correct-answer")}
            </span>
          )}
          {isWrongAnswer && isSelected && (
            <span className="badge badge-pill ml-1 badge-danger align-self-end tajawal">
              {getString("wrong-answer")}
            </span>
          )}
        </div>
      </div>
    );
  };

  const allChoices = [
    choice_1,
    choice_2,
    choice_3,
    choice_4,
    choice_5,
    choice_6,
  ].filter((_, i) => _ != null && _.trim() != "");

  const choicesComponents = allChoices.map((choice) => choiceComponent(choice));
  return choicesComponents;
};

const SingleChoiceQuestion = (question) => {
  const {
    choices,
    correct_answer,
    userSelection,
    answeredCorrectly,
    language,
  } = question;

  const choiceComponent = (text, index) => {
    return (
      <div
        key={index}
        className={`d-flex p-2 form-check question-choice-result ${
          userSelection === text ? "selected-choice" : ""
        }`}
      >
        <input
          className="position-relative form-check-input mx-2"
          type="radio"
          name="choices"
          id={`choice_${text}`}
          checked={userSelection === text}
          disabled
        />
        <label className="form-check-label tajawal" htmlFor={`choice_${text}`}>
          {text}
        </label>
        <div className={language === AR ? "mr-auto" : "ml-auto"}>
          {userSelection === text && answeredCorrectly && (
            <span className="badge badge-pill ml-1 badge-success align-self-end tajawal">
              {getString("correct-answer")}
            </span>
          )}
          {userSelection === text && !answeredCorrectly && (
            <span className="badge badge-pill ml-1 badge-danger tajawal">
              {getString("wrong-answer")}
            </span>
          )}
          {correct_answer === text && userSelection !== text && (
            <span className="badge badge-pill ml-1 badge-success tajawal">
              {getString("correct-answer")}
            </span>
          )}
        </div>
      </div>
    );
  };

  const validChoices = choices.filter((_) => _ != null && _.trim() != "");
  const choicesComponents = validChoices.map((choice, i) =>
    choiceComponent(choice, i)
  );
  return choicesComponents;
};

export default TestResult;
