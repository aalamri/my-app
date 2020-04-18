import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import "react-quill/dist/quill.snow.css";

import { CATEGORIES_QUERY } from "../Category/queries";
import Editor from "../Editor";
import Questions from "./Questions";

const CreateTest = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  const [testTitle, setTestTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [questions, setQuestion] = useState([]);

  const intialCategories = data ? data.categories : [];

  if (loading) {
    return <span>loading</span>;
  }
  if (error) {
    return <span>error</span>;
  }

  function handleCreateTest(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTest = {
      testTitle,
      description: editorValue,
      category: getCatID(intialCategories, formData.get("category")),
      questions,
      meta: {
        likes: 0,
        taken: 0,
        completed: 0,
      },
    };
    console.log("newTest ready to mutation", newTest);

    // createTest({ variables: { data: payload } });
  }

  function handleChangeEditorValue(value) {
    setEditorValue(value);
  }

  function updateQuestion(qid, update) {
    const updated = questions.map((q) =>
      q.id !== qid ? q : { ...q, ...update }
    );
    setQuestion(updated);
  }

  return (
    <form onSubmit={handleCreateTest}>
      <label>Test title</label>
      <input
        name="title"
        type="text"
        placeholder="Test title"
        value={testTitle}
        onChange={({ target }) => setTestTitle(target.value)}
      />
      <br />
      <label>Test description</label>
      <Editor
        handleChangeEditorValue={handleChangeEditorValue}
        value={editorValue}
      />
      <br />
      <label>Select category:</label>
      <select name="category" id="cars" defaultValue="black">
        {intialCategories.length > 0 &&
          intialCategories.map((cat) => {
            return (
              <option name="option" key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            );
          })}
      </select>
      <br />
      <Questions
        updateQuestion={updateQuestion}
        questions={questions}
        setQuestion={setQuestion}
      />
      <br />
      <button type="submit">Create Test</button>
    </form>
  );
};

const getDate = (date) =>
  `${date.getUTCFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`; // the desired format by Strapi

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default CreateTest;
