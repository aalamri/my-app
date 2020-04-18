import React from "react";
import Editor from "../Editor";

const Question = ({ index, qid, updateQuestion }) => {
  function handleChangeEditorValue(value) {
    updateQuestion(qid, { content: value });
  }

  function handleOnChange({ target }) {
    const { id, value } = target;
    updateQuestion(qid, { [id]: value });
    // if (props.error.isExist) {
    //   props.updateError(ELEMENT_ID, { isExist: false, message: "" });
    // }
  }

  return (
    <div>
      <h4>Question {index + 1}</h4>
      <label>Question title</label>
      <input id="title" type="text" onChange={handleOnChange} />
      <br />
      <label>Question content</label>
      <Editor handleChangeEditorValue={handleChangeEditorValue} qid={qid} />
      <br />
      <label htmlFor={`multiple-answers-${qid}`}>Multiple answers?</label>
      <input type="radio" name={`multiple-answers-${qid}`} value={true} />
      Yes
      <input type="radio" name={`multiple-answers-${qid}`} value={false} />
      No
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
      __typename: "ComponentQuestionsGroupNewQuestion", // the group name used for this dynamic zone in Strapi
      id: newID(),
      title: "",
      content: "",
      multiple_answers: false,
      correctAnswer: "",
      wrongAnswer1: "",
      wrongAnswer2: "",
      wrongAnswer3: "",
      wrongAnswer4: "",
    };
    setQuestion([...questions, newQuestion]);
  }

  function removeQuestion(e, qid) {
    e.preventDefault();
    setQuestion(questions.filter(({ id }) => id !== qid));
  }

  return (
    <div>
      <h2>Questions {questions.length}:</h2>
      {questions.map((question, i) => {
        return (
          <div key={question.id}>
            <Question
              index={i}
              qid={question.id}
              updateQuestion={updateQuestion}
            />
            <button onClick={(e) => removeQuestion(e, question.id)}>X</button>
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
