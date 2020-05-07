import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { CATEGORIES_QUERY } from "../Category/queries";
import "react-quill/dist/quill.snow.css";

import { getToken } from "../../../utils/index";
import { CREATE_ARTICLE, ARTICLES_QUERY } from "./queries";
// import { GET_USER_ID } from "../../../utils/queries";
import Editor from "../Editor";

// const token = getToken();

const CreateArticle = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const [createArticle, { data: createArticleData }] = useMutation(
    CREATE_ARTICLE,
    {
      update(cache, { data: { createArticle } }) {
        try {
          const { articles } = cache.readQuery({ query: ARTICLES_QUERY });
          cache.writeQuery({
            query: ARTICLES_QUERY,
            data: { articles: articles.concat([createArticle]) },
          });
        } catch (error) {
          if (error.message.startsWith("Can't find field articles on object")) {
            cache.writeQuery({
              query: ARTICLES_QUERY,
              data: { articles: [createArticle] },
            });
          } else {
            console.log("CreateArticle error:", error);
          }
        }
      },
    }
  );
  const [editorValue, setEditorValue] = useState("");
  const [language, setLanguage] = useState("Arabic");

  const intialCategories = data ? data.categories : [];

  if (loading) {
    return <span>loading</span>;
  }
  if (error) {
    return <span>error</span>;
  }

  function handleCreateArticle(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const article_url_in_other_language = formData.get(
      "article_url_in_other_language"
    );
    const content = editorValue;

    if (title && content) {
      const payload = {
        language,
        article_url_in_other_language,
        title,
        content,
        category: getCatID(intialCategories, formData.get("category")),
        published_at: getDate(new Date()),
        status: "Pending",
        // author: "5e93e0d2c266b30fa0d7fad9", // sultan
        author: "5eb1f731147f722414b44c30", // sarah
        meta: {
          visits: 0,
          likes: 0,
          last_review: {
            // example of 'reviewes' data
            id: "s98uj",
            reviewer_id: "214356",
            reviewer_name: "Ahmad",
            comment: "please fix that",
            timestamp: Date.now(),
          },
        },
      };
      createArticle({
        variables: { data: payload } /*TODO add headers token here*/,
      });
    } else {
      console.log("Error: 'title' AND 'content' must not be empty!");
    }
  }

  function handleChangeEditorValue(value) {
    setEditorValue(value);
  }

  return (
    <form onSubmit={handleCreateArticle}>
      <label htmlFor="language">Language</label>
      <input
        type="radio"
        name="language"
        onClick={() => setLanguage("Arabic")}
        defaultChecked={language === "Arabic"}
      />
      Arabic
      <input
        type="radio"
        name="language"
        onClick={() => setLanguage("English")}
        defaultChecked={language === "English"}
      />
      English
      <br />
      <label>
        Article URL in {language === "Arabic" ? "English" : "Arabic"} language
      </label>
      <input
        name="article_url_in_other_language"
        type="text"
        placeholder="URL"
      />
      <br />
      <label htmlFor="img">Cover image:</label>
      <input type="file" id="img" name="img" accept="image/*" />
      <br />
      <label>Article title</label>
      <input name="title" type="text" placeholder="Article title" />
      <br />
      <label>Article content</label>
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
      <button type="submit">Create</button>
    </form>
  );
};

const getDate = (date) =>
  `${date.getUTCFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`; // the desired format by Strapi

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default CreateArticle;
