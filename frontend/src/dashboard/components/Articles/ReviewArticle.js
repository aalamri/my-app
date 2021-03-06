import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  GET_ARTICLE,
  UPDATE_ARTICLE,
  GET_CATEGORIES,
  ARTICLES_QUERY,
} from "./queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Editor from "../Editor";

import { getToken } from "../../../utils/index";

const author_id = "123"; // TODO get user's id
const token = getToken();

const ReviewArticle = () => {
  let { id } = useParams();

  const [articleStatus, setArticleStatus] = useState("Pending")
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
  const [language, setLanguage] = useState("");
  const [urlOtherLanguage, setUrlOtherLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    if (data) {
      console.log("useEffect", data.article.language);
      setLanguage(data.article.language);
      setUrlOtherLanguage(data.article.article_id_of_other_language);
      setTitle(data.article.title);
      setContent(data.article.content);
      setComment(data.article.comment);
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

  if (id === null) {
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
    const article_id_of_other_language = formData.get(
      "article_id_of_other_language"
    );

    if (title && content && author_id) {
      const payload = {
        language,
        article_id_of_other_language,
        title,
        content,
        comment,
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

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      status: articleStatus
    }
    updateArticle(
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
    setArticleStatus(status)
  }

  function handleChangeCategory(e) {
    const name = e.target.value;
    const id = getCatID(categories.categories, name);
    setCurrentCategory({ id, name });
  }

  if (author_id === null) {
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
        name="article_id_of_other_language"
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
      <div className="uk-margin">
        <label> Approved
                <input className="uk-radio" type="radio" name="radio2" onClick={() => handleComment("Approved")} checked={articleStatus === "Approved"}>
          </input>
        </label>
        <label> Reject
                <input className="uk-radio" type="radio" name="radio2" onClick={() => handleComment("Rejected")} checked={articleStatus === "Rejected"}>
          </input>
        </label>
        {articleStatus === "Rejected" &&
          <div className="uk-margin">
            <textarea className="uk-textarea" rows="4" value={comment}></textarea>
          </div>
        }
      </div>
      <button className="uk-button uk-button-primary" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

const getDate = (date) =>
  `${date.getUTCFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`; // the desired format by Strapi

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

export default ReviewArticle;
