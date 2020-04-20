import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "react-quill/dist/quill.snow.css";

import { CATEGORIES_QUERY } from "../Category/queries";
import { CREATE_TEST, TESTS_QUERY } from "./queries";
import Editor from "../Editor";
import Questions from "./Questions";

const CreateTest = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  const [testTitle, setTestTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [questions, setQuestion] = useState([]);
  const [createTest, { data: createTestData }] = useMutation(CREATE_TEST, {
    update(cache, { data: { createTest } }) {
      try {
        const { tests } = cache.readQuery({ query: TESTS_QUERY });
        cache.writeQuery({
          query: TESTS_QUERY,
          data: { tests: tests.concat([createTest]) },
        });
      } catch (error) {
        if (error.message.startsWith("Can't find field tests on object")) {
          cache.writeQuery({
            query: TESTS_QUERY,
            data: { tests: [createTest] },
          });
        } else {
          console.log("createTest error:", error);
        }
      }
    },
  });
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
    const questionsX = questions.map((q) => {
      delete q.id;
      return q;
    });

    const newTest = {
      title: testTitle,
      description: editorValue,
      categories: getCatID(intialCategories, formData.get("category")),
      questions: questionsX,
      meta: {
        likes: 0,
        taken: 0,
        completed: 0,
      },
    };

    createTest({
      variables: {
        data: newTest,
      },
    });
  }

  function handleChangeEditorValue(value) {
    setEditorValue(value);
  }

  function updateQuestion(qid, update) {
    const updated = questions.map((q) =>
      q.qid !== qid ? q : { ...q, ...update }
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
