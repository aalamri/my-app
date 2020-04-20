import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { GET_ARTICLE } from "./queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Editor from "../Editor";

const EditArticle = () => {
  let { id } = useParams();
  const [editorValue, setEditorValue] = useState("");
  const [language, setLanguage] = useState("");
  const [urlOtherLanguage, setUrlOtherLanguage] = useState("");

  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      console.log("useEffect", data.article.language);
      setLanguage(data.article.language);
      setUrlOtherLanguage(data.article.article_url_in_other_language || "");
    }
  }, [data]);

  if (id == null) {
    return <p>Error: Invalid Article id!</p>;
  }

  if (data?.article.is_deleted) {
    return <p>Error: This article is deleted!</p>;
  }
  // const intialCategories = article ? article.categories : [];

  function handleChangeEditorValue(value) {
    setEditorValue(value);
  }

  function handleUpdateArticle() {}

  if (loading) {
    return <span>loading</span>;
  }
  if (error) {
    console.log("error", error);

    return <span>error</span>;
  }
  console.log("data", data);

  return (
    <form onSubmit={handleUpdateArticle}>
      <label htmlFor="language">Language</label>
      <input
        type="radio"
        name="language"
        onClick={() => setLanguage("Arabic")}
        defaultChecked={language == "Arabic"}
      />
      Arabic
      <input
        type="radio"
        name="language"
        onClick={() => setLanguage("English")}
        defaultChecked={language == "English"}
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
        value={urlOtherLanguage}
        onChange={({ target }) => setUrlOtherLanguage(target.value)}
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
      {/* <label>Select category:</label>
      <select
        name="category"
        id="cars"
        // value={article.category.name || "-Select category-"}
      >
        {intialCategories.length > 0 &&
          intialCategories.map((article) => {
            return (
              <option name="option" key={article.id} value={article.name}>
                {article.name}
              </option>
            );
          })}
      </select> */}
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditArticle;
