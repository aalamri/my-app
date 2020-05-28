import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Slide from 'react-reveal/Slide';

import imageUrl from './q1.png'

const AR = "Arabic";
const EN = "English";

const TestResult = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [emailResultStatus, setEmailResultStatus] = useState(null);
  const [email, setEmail] = useState('');
  const language = EN;

  if (props.location.state == null) {
    // user MUST come from a test with a `state` prop via the router
    return (
      <section className="question-section ptb-100" dir={language === AR ? "rtl" : "ltr"}>
        <div className="container max-width-880">
          <p>Invalid page request!</p>
        </div>
      </section>
    )
  }

  const { title, questions } = props.location.state.test;
  function goPrevious() {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
  function goNext() {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
  function emailResult() {
    if (/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      const emailSentSuccessfully = (
        <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
          Result sent to your email!
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setEmailResultStatus(null)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
      setTimeout(() =>
        setEmailResultStatus(emailSentSuccessfully)
        , 1000)

    } else {
      const invalidAlert = (
        <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
          Please enter a valid email!
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setEmailResultStatus(null)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
      setEmailResultStatus(invalidAlert)
    }
  }
  function handleOnChangeEmail({ target }) {
    setEmailResultStatus(null);
    setEmail(target.value);
  }

  const question = questions[currentQuestionIndex - 1];
  const questionsWithScore = calculatScores(questions);
  const correctAnswers = questionsWithScore.filter(({ answeredCorrectly }) => answeredCorrectly).length;

  return (
    <section className="question-section py-5" dir={language === AR ? "rtl" : "ltr"}>
      <div className="container max-width-880 pb-5 ">
        <div className="text-center pb-5 mb-2">
          <h4>Thank you for taking the test!</h4>
          <h2>"{title}"</h2>
          <h4>You scored {`${correctAnswers}/${questions.length}`}</h4>
          <p>Send the result to your email</p>
          <div className="d-flex justify-content-center">
            <input
              type="email"
              className="form-control share-result-email mr-1" placeholder="youremail@example.com"
              value={email}
              onChange={handleOnChangeEmail}
              autoFocus
            />
            <span className="btn gradient-purple-btn ml-1" onClick={emailResult}>Send</span>
          </div>
          <div className="d-flex justify-content-center">
            {emailResultStatus}
          </div>
        </div>

        <h3 className="answers-header">
          <span>Answers</span>
        </h3>

        <div className="">
          <h4>{question.title}</h4>
          {/* {currentQuestionIndex % 2 === 0 &&
                <img
                  src={imageUrl}
                  className="card-img-top position-relative border-q-img"
                  height="80%"
                  alt=""
                />
              } */}
          <p className="py-4">{question.content}</p>
        </div>
        <div className="mb-5">
          <h5>Choices: <span className="answer-status ml-3">({question.userSelection == null ? "Skipped" : "Answered"})</span></h5>
          <div className="custom-control custom-checkbox">
            {displayChoices(question)}
          </div>
        </div>

        <div className="text-center">
          {currentQuestionIndex > 1 &&
            <button className="btn mx-2 btn-info" onClick={goPrevious}>Previous</button>
          }
          {currentQuestionIndex < questions.length &&
            <button className="btn mx-2 btn-info" onClick={goNext}>Next</button>
          }
        </div>
      </div>
    </section>
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
      ].filter(c => Object.values(c)[0] != null && Object.values(c)[0].trim() != '');
      const correctChoices = validChoices
        .filter((q, i) => q[`choice_${q.choice}_is_correct`])
        .map((q, i) => q[`choice_${q.choice}`]);
      const markChoices = correctChoices.map(c => userSelection.includes(c));
      question.answeredCorrectly = correctChoices.length === userSelection.length && !markChoices.some(c => c === false);
    }
    return question;
  });
}

function displayChoices(question) {
  const { choices_type } = question;
  if (choices_type === "multiple") {
    return <MultipleChoicesQuestion {...question} />
  } else if (choices_type === "single") {
    return <SingleChoiceQuestion {...question} />
  } else {
    throw Error(`ERROR displayChoices: Unknown choices type ${choices_type}`)
  }
};

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
    userSelection = []
  } = question;

  const validChoices = [
    { choice_1, choice_1_is_correct, choice: 1 },
    { choice_2, choice_2_is_correct, choice: 2 },
    { choice_3, choice_3_is_correct, choice: 3 },
    { choice_4, choice_4_is_correct, choice: 4 },
    { choice_5, choice_5_is_correct, choice: 5 },
    { choice_6, choice_6_is_correct, choice: 6 },
  ].filter(c => Object.values(c)[0] != null && Object.values(c)[0].trim() != '');

  const correctChoices = validChoices
    .filter((q, i) => q[`choice_${q.choice}_is_correct`])
    .map((q, i) => q[`choice_${q.choice}`]);
  const wrongChoices = validChoices
    .filter((q, i) => !q[`choice_${q.choice}_is_correct`])
    .map((q, i) => q[`choice_${q.choice}`]);

  const choiceComponent = (text) => {
    const isSelected = userSelection && userSelection.includes(text) || false;
    const isCorrectAnswer = correctChoices.includes(text);
    const isWrongAnswer = wrongChoices.includes(text);

    return (
      <div key={text}
        className={`d-flex p-2 form-check question-choice-result ${isSelected ? 'selected-choice' : ''}`}
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
        <label className="form-check-label" htmlFor={`choice_${text}`}>{text}</label>
        <div className="ml-auto">
          {isCorrectAnswer &&
            <span className="badge badge-pill ml-1 badge-success align-self-end">Correct</span>
          }
          {isWrongAnswer && isSelected &&
            <span className="badge badge-pill ml-1 badge-danger align-self-end">Wrong</span>
          }
        </div>
      </div >
    );
  }

  const allChoices = [
    choice_1,
    choice_2,
    choice_3,
    choice_4,
    choice_5,
    choice_6,
  ].filter((_, i) => _ != null && _.trim() != '');

  const choicesComponents = allChoices.map(choice => choiceComponent(choice));
  return choicesComponents;
}

const SingleChoiceQuestion = (question) => {
  const {
    choices,
    correct_answer,
    userSelection,
    answeredCorrectly
  } = question;

  const choiceComponent = (text, index) => {
    return (
      <div key={index}
        className={`d-flex p-2 form-check question-choice-result ${userSelection === text ? 'selected-choice' : ''}`}
      >
        <input
          className="position-relative form-check-input mx-2"
          type="radio"
          name="choices"
          id={`choice_${text}`}
          checked={userSelection === text}
          disabled
        />
        <label className="form-check-label" htmlFor={`choice_${text}`}>
          {text}
        </label>
        <div className="ml-auto">
          {userSelection === text && answeredCorrectly &&
            <span className="badge badge-pill ml-1 badge-success align-self-end">Correct</span>
          }
          {userSelection === text && !answeredCorrectly &&
            <span className="badge badge-pill ml-1 badge-danger">Wrong</span>
          }
          {correct_answer === text && userSelection !== text &&
            <span className="badge badge-pill ml-1 badge-success">Correct</span>
          }
        </div>
      </div>
    );
  }

  const validChoices = choices.filter(_ => _ != null && _.trim() != '');
  const choicesComponents = validChoices.map((choice, i) => choiceComponent(choice, i));
  return choicesComponents;
}

export default TestResult;
