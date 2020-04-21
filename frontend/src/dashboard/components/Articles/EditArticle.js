import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  GET_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  GET_CATEGORIES,
  ARTICLES_QUERY,
} from "./queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Editor from "../Editor";

const author_id = "123"; // TODO get user's id

const EditArticle = () => {
  let { id } = useParams();

  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: { id },
  });
  const { data: categories } = useQuery(GET_CATEGORIES);
  const [updateArticle] = useMutation(UPDATE_ARTICLE, {
    variables: { id },
    update(cache, { data: { updateArticle } }) {
      try {
        const { articles } = cache.readQuery({ query: ARTICLES_QUERY });
        cache.writeQuery({
          query: ARTICLES_QUERY,
          data: {
            articles: articles.map((a) => (a.id === id ? updateArticle : a)),
          },
        });
      } catch (error) {
        if (error.message.startsWith("Can't find field articles on object")) {
          cache.writeQuery({
            query: ARTICLES_QUERY,
            data: { articles: [updateArticle] },
          });
        } else {
          console.log("updateArticle error:", error);
        }
      }
    },
  });
  const [deleteArticle] = useMutation(DELETE_ARTICLE);
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
      console.log("useEffect", data.article.language);
      setLanguage(data.article.language);
      setUrlOtherLanguage(data.article.article_url_in_other_language);
      setTitle(data.article.title);
      setContent(data.article.content);
      populateCurrentCategory();
    }
  }, [data]);

  useEffect(() => {
    if (categories) {
      populateCurrentCategory();
    }
  }, [categories]);

  function populateCurrentCategory() {
    if (categories?.categories.length > 0 && data?.article.category) {
      const cat = categories.categories.find(
        ({ id }) => id === data.article.category.id
      );
      setCurrentCategory(cat);
    }
  }

  if (id == null) {
    return <p>Error: Invalid Article id!</p>;
  }

  if (data?.article.is_deleted) {
    return <p>Error: This article is deleted!</p>;
  }
  // const intialCategories = article ? article.categories : [];

  function handleChangeEditorValue(value) {
    setContent(value);
  }

  function handleUpdateArticle(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const article_url_in_other_language = formData.get(
      "article_url_in_other_language"
    );

    if (title && content && author_id) {
      const payload = {
        language,
        article_url_in_other_language,
        title,
        content,
        category: currentCategory.id,
        status: "Pending",
        author_id,
        last_update: new Date(),
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
      updateArticle({
        variables: { id, data: payload } /*TODO add headers token here*/,
      });
    } else {
      console.log("Error: 'title' AND 'content' must not be empty!");
    }
  }

  function handleDeleteArticle(e) {
    e.preventDefault();
    deleteArticle({ variables: { id } });
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
    <form onSubmit={handleUpdateArticle}>
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
      <input
        name="title"
        type="text"
        placeholder="Article title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label>Article content</label>
      <Editor
        handleChangeEditorValue={handleChangeEditorValue}
        value={content}
      />
      <br />
      <label>Select category:</label>
      <select onChange={handleChangeCategory} value={currentCategory.name}>
        {categories?.categories.length > 0 &&
          categories.categories.map(({ id, name }) => {
            return (
              <option key={id} value={name}>
                {name}
              </option>
            );
          })}
      </select>
      <br />
      <button type="submit">Update</button>
      <button type="button" onClick={handleDeleteArticle}>
        Delete Article
      </button>
    </form>
  );
};

const getDate = (date) =>
  `${date.getUTCFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`; // the desired format by Strapi

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default EditArticle;
