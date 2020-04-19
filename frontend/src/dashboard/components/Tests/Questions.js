import React from "react";
import Editor from "../Editor";

const Question = ({ index, qid, updateQuestion }) => {
  function handleChangeEditorValue(value) {
    updateQuestion(qid, { description: value });
  }

  function handleOnChange({ target }) {
    const { id, value } = target;
    updateQuestion(qid, { [id]: value });
    // if (props.error.isExist) {
    //   props.updateError(ELEMENT_ID, { isExist: false, message: "" });
    // }
  }

  function updateType() {}

  return (
    <div>
      <h4>Question {index + 1}</h4>
      <label>title</label>
      <input id="title" name="title" type="text" onChange={handleOnChange} />
      <br />
      <label>content</label>
      <Editor handleChangeEditorValue={handleChangeEditorValue} qid={qid} />
      <br />
      <label htmlFor={`multiple-answers-${qid}`}>Answers type</label>
      <input
        type="radio"
        name={`multiple-answers-${qid}`}
        onClick={() => updateQuestion(qid, { multiple_choices: true })}
      />
      Multiple answers
      <input
        type="radio"
        name={`multiple-answers-${qid}`}
        onClick={() => updateQuestion(qid, { multiple_choices: false })}
      />
      Single Answer
      <br />
      <label>Correct answer</label>
      <input
        id="correctAnswer"
        type="text"
        name="question-title"
        onChange={handleOnChange}
      />
      <br />
      <label>Wrong answer 1</label>
      <input
        id="wrongAnswer1"
        type="text"
        name="wrong-answer-1"
        onChange={handleOnChange}
      />
      <br />
      <label>Wrong answer 2</label>
      <input
        id="wrongAnswer2"
        type="text"
        name="wrong-answer-2"
        onChange={handleOnChange}
      />
      <br />
      <label>Wrong answer 3</label>
      <input
        id="wrongAnswer3"
        type="text"
        name="wrong-answer-3"
        onChange={handleOnChange}
      />
      <br />
      <label>Wrong answer 4</label>
      <input
        id="wrongAnswer4"
        type="text"
        name="wrong-answer-4"
        onChange={handleOnChange}
      />
      <br />
    </div>
  );
};

const Questions = ({ questions, setQuestion, updateQuestion }) => {
  function addQuestion(e) {
    e.preventDefault();
    const newQuestion = {
      qid: newID(),
      title: "",
      description: "",
      questions: [
        {
          __typename: "ComponentQuestionsGroupNewQuestion",
          //   __component: "questions-group.new-question",
          title: "",
          content: "",
          multiple_choices: false,
          correct_answer: "",
          wrong_answer_1: "",
          wrong_answer_2: "",
          wrong_answer_3: "",
          wrong_answer_4: "",
          meta: { likes: 0, taken: 0, completed: 0 },
        },
      ],
    };
    console.log("newid", newQuestion.qid);

    setQuestion([...questions, newQuestion]);
  }

  function removeQuestion(e, qid) {
    e.preventDefault();
    setQuestion(questions.filter((q) => q.qid !== qid));
  }

  return (
    <div>
      <h2>Questions {questions.length}:</h2>
      {questions.map((question, i) => {
        return (
          <div key={question.qid}>
            <Question
              index={i}
              qid={question.qid}
              updateQuestion={updateQuestion}
            />
            <button onClick={(e) => removeQuestion(e, question.qid)}>X</button>
            <hr />
          </div>
        );
      })}
      <button onClick={addQuestion}>Add question</button>
    </div>
  );
};

// Generates random string
export const newID = (length = 10) =>
  Math.random()
    .toString(36)
    .substr(-1 * length);

export default Questions;
