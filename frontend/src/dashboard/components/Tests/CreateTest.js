import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "react-quill/dist/quill.snow.css";

import { CATEGORIES_QUERY } from "../Category/queries";
import { CREATE_TEST, TESTS_QUERY } from "./queries";
import Editor from "../Editor";
import Questions from "./Questions";

const CreateTest = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
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
          console.log("tf is createTestData", createTestData);

          cache.writeQuery({
            query: TESTS_QUERY,
            data: { tests: [createTest] },
          });
        } else {
          console.log("CreateTest error:", error);
        }
      }
    },
  });
  const [editorValue, setEditorValue] = useState(
    "Lorem ipsum Do ea deserunt ipsam eligendi, et corporis ducimus nihil hic qui, possimus ea aut excepturi quisquam, quae veritatis qui doloremque architecto aspernatur, iusto earum ut quis ipsam accusantium, et ea consequatur nihil quo perferendis neque, quo temporibus voluptates quam et."
  );

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
    const date = new Date();
    const title = formData.get("title");
    const content = editorValue;

    if (title && content) {
      const payload = {
        title,
        content,
        category: getCatID(intialCategories, formData.get("category")),
        published_at: getDate(date),
        meta: {
          visits: 0,
          likes: 0,
          publish_status: "DRAFT/UNDER_REVIEW/REVIEWED/PUBLISHED",
          reviewes: [
            {
              id: "s98uj",
              reviewer: "Ahmad",
              comment: "please fix that",
              timestamp: Date.now(),
            },
          ],
        },
      };
      createTest({ variables: { data: payload } });
    } else {
      console.log("Error: 'title' AND 'content' must not be empty!");
    }
  }

  function handleChangeEditorValue(value) {
    setEditorValue(value);
  }

  return (
    <form onSubmit={handleCreateTest}>
      <label>Test title</label>
      <input
        name="title"
        type="text"
        placeholder="Test title"
        value="Title Here"
      />
      <br />
      <label>Test description</label>
      <Editor
        handleChangeEditorValue={handleChangeEditorValue}
        value={editorValue}
      />
      <br />
      <label>Select category:</label>
      <select name="category" id="cars">
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
      <Questions />

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
