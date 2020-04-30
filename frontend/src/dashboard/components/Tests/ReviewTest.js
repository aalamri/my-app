import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  GET_TEST,
  UPDATE_TEST,
  GET_CATEGORIES,
  TESTS_QUERY,
} from "./queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Editor from "../Editor";
import { getToken } from "../../../utils/index";

const author_id = "123"; // TODO get user's id
const token = getToken();

const ReviewTest = () => {
    let { id } = useParams();

  const [testStatus,setTestStatus] = useState("Pending")
  const { data, loading, error } = useQuery(GET_TEST, {
    variables: { id },
  });
  const { data: categories } = useQuery(GET_CATEGORIES);
  const [updateTest] = useMutation(UPDATE_TEST, {
    variables: { id },
    update(cache, { data: { updateTest } }) {
      try {
        const { tests } = cache.readQuery({ query: TESTS_QUERY });
        cache.writeQuery({
          query: TESTS_QUERY,
          data: {
            tests: tests.map((a) => (a.id === id ? updateTest : a)),
          },
        });
      } catch (error) {
        if (error.message.startsWith("Can't find field tests on object")) {
          cache.writeQuery({
            query: TESTS_QUERY,
            data: { tests: [updateTest] },
          });
        } else {
          console.log("updateTest error:", error);
        }
      }
    },
  });
  const [language, setLanguage] = useState("");
  const [urlOtherLanguage, setUrlOtherLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    if (data) {
      console.log("useEffect", data.test.language);
      setLanguage(data.test.language);
      setUrlOtherLanguage(data.test.test_url_in_other_language);
      setTitle(data.test.title);
      setContent(data.test.description);
      populateCurrentCategory();
    }
  }, [data]);

  useEffect(() => {
    if (categories) {
      populateCurrentCategory();
    }
  }, [categories]);

  function populateCurrentCategory() {
    if (categories?.categories.length > 0 && data?.test.category) {
      const cat = categories.categories.find(
        ({ id }) => id === data.test.category.id
      );
      setCurrentCategory(cat);
    }
  }

  if (id == null) {
    return <p>Error: Invalid Test id!</p>;
  }

  if (data?.test.is_deleted) {
    return <p>Error: This test is deleted!</p>;
  }

  function handleChangeEditorValue(value) {
    setContent(value);
  }


  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
        status: testStatus
    }
    updateTest (
        {
            context: {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
            },
            variables: {
                    data: payload,
                    id: id
                },

        } 
    )
    alert("submitted");
}

  function handleComment(status) {
    setTestStatus (status)
  }

  function handleChangeCategory(e) {
    const name = e.target.value;
    const id = getCatID(categories.categories, name);
    setCurrentCategory({ id, name });
  }

  if (author_id == null) {
    return <span>You're not authorizd to see this page!</span>;
  }
  if (loading) {
    return <span>loading</span>;
  }
  if (error) {
    console.log("error", error);
    return <span>error</span>;
  }

  return (
    <form>
      <label htmlFor="language">Language</label>
      <input
        type="radio"
        name="language"
        onClick={() => setLanguage("Arabic")}
        checked={language === "Arabic"}
      />
      Arabic
      <input
        type="radio"
        name="language"
        onClick={() => setLanguage("English")}
        checked={language === "English"}
      />
      English
      <br />
      <label>
        Test URL in {language === "Arabic" ? "English" : "Arabic"} language
      </label>
      <input
        name="test_url_in_other_language"
        type="text"
        placeholder="URL"
        value={urlOtherLanguage}
        onChange={({ target }) => setUrlOtherLanguage(target.value)}
      />
      <br />
      <label htmlFor="img">Cover image:</label>
      <input type="file" id="img" name="img" accept="image/*" />
      <br />
      <label>Test title</label>
      <input
        name="title"
        type="text"
        placeholder="Test title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label>Test content</label>
      <Editor
        handleChangeEditorValue={handleChangeEditorValue}
        value={content}
      />
      <br />
      {/* <label>Select Category:</label> */}
      {/* <select onChange={handleChangeCategory} value={currentCategory.name}>
        {categories?.categories.length > 0 &&
          categories.categories.map(({ id, name }) => {
            return (
              <option key={id} value={name}>
                {name}
              </option>
            );
          })}
      </select> */}
      <br />
      <div className="uk-margin">
            <label> Approved
                <input class="uk-radio" type="radio" name="radio2" onClick={() => handleComment("Approved")} checked={testStatus === "Approved"}> 
                </input>
            </label>
            <label> Reject
                <input class="uk-radio" type="radio" name="radio2"  onClick={() => handleComment("Rejected")} checked={testStatus === "Rejected"}> 
                </input>
            </label>
            {testStatus === "Rejected" && 
            <div className="uk-margin">
            <textarea class="uk-textarea" rows="4" placeholder="Comments"></textarea>    
            </div>
            }
            </div>
      <button class="uk-button uk-button-primary" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

const getDate = (date) =>
  `${date.getUTCFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`; // the desired format by Strapi

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default ReviewTest;
