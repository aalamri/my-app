import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Axios from 'axios';

import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";
import { CATEGORIES_QUERY } from "../Category/queries";


import swal from 'sweetalert';

const AR = "Arabic";
const EN = "English";

const CreateArticle = () => {
  const initContent = {
    title: "",
    content: ""
  }
  const initValidation = {
    hasError: null,
    errors: []
  }
  const [contentAR, setContentAR] = useState(initContent);
  const [contentEN, setContentEN] = useState(initContent);
  const [language, setLanguage] = useState(AR);
  const [validation, setValidation] = useState(initValidation);
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  const intialCategories = data ? data.categories : [];

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('jwt'));

  if (loading) {
    return <span>loading...</span>;
  }
  if (error) {
    return <span>error</span>;
  }

  function handleChangeTitle({ target }) {
    setValidation(initValidation);
    if (language === AR) {
      setContentAR({ ...contentAR, title: target.value });
    } else {
      setContentEN({ ...contentEN, title: target.value });
    }
  }

  function handleChangeEditor(value) {
    setValidation(initValidation);
    if (language === AR) {
      setContentAR({ ...contentAR, content: value });
    } else {
      setContentEN({ ...contentEN, content: value });
    }
  }

  async function handleCreateArticle(e) {
    e.preventDefault();
    const currentArticle = language === AR ? contentAR : contentEN;
    const otherArticle = language === EN ? contentAR : contentEN;

    // validate required fields in current lang
    const errors = validate(currentArticle, language);
    if (errors.length > 0) {
      setValidation({ hasError: true, errors });
      return;
    }

    // try to create article(s)
    try {
      // check if content in other lang is not empty to bind both articles if so
      const formData = new FormData(e.target);
      const payload1 = {
        language,
        title: currentArticle.title,
        content: currentArticle.content,
        category: getCatID(intialCategories, formData.get("category")),
        status: "Pending",
        author: currentUser._id,
        meta: {
          visits: 0,
          likes: 0,
        },
      };

      const article1 = await Axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: payload1
      });

      const review = await Axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/reviews',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { Type: 'Article', article: article1.data._id, author: currentUser._id }
      });
      const currentArticleID = article1.data.id;

      // create another article if other article is not empty
      const isOtherLangEmpty = isEmpty(otherArticle);
      if (isOtherLangEmpty === false) {
        const payload2 = {
          ...payload1,
          language: language === AR ? EN : EN,
          title: otherArticle.title || "null",
          content: otherArticle.content || "null",
          article_id_of_other_language: currentArticleID
        };
        const article2 = await Axios({
          method: 'post',
          url: process.env.REACT_APP_BACKEND_URL + '/articles',
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: payload2
        });

        swal("Success", "Send to Review!", "success");
        const otherArticleID = article2.data.id

        // update article1 with article2's id

        await Axios({
          method: 'put',
          url: process.env.REACT_APP_BACKEND_URL + `/articles/${currentArticleID}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            article_id_of_other_language: otherArticleID
          }
        });
        // await updateArticle({
        //   variables: {
        //     id: currentArticleID,
        //     data: {
        //       article_id_of_other_language: otherArticleID
        //     }
        //   }
        // });
      }
      swal("Success", "Send to Review!", "success");

    } catch (error) {
      console.log("Error handleCreateArticle:", error);
    }
  }

  function switchToAR(e) {
    e.stopPropagation();
    setValidation(initValidation);
    setLanguage(AR);
  }
  function switchToEN(e) {
    e.stopPropagation();
    setValidation(initValidation);
    setLanguage(EN);
  }

  return (
    <div className={`container max-width-880 my-5 ${language === AR ? 'text-right' : ''}`} dir={language === AR ? "rtl" : "ltr"}>
      <h3>{language === AR ? "إنشاء موضوع جديد" : "Create Article"}</h3>
      <form onSubmit={handleCreateArticle}>

        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className={`btn btn-info no-radius ${language === AR ? 'active' : ''}`} onClick={switchToAR}>
            <input type="radio" name="language" /> الموضوع بالعربية
          </label>
          <label className={`btn btn-info no-radius ${language === EN ? 'active' : ''}`} onClick={switchToEN}>
            <input type="radio" name="language" /> Article in English
          </label>
        </div>

        <br />
        {language === AR && <ARArticle
          handleChangeEditor={handleChangeEditor}
          handleChangeTitle={handleChangeTitle}
          content={contentAR.content}
          title={contentAR.title}
        />}
        {language === EN && <ENArticle
          handleChangeEditor={handleChangeEditor}
          handleChangeTitle={handleChangeTitle}
          content={contentEN.content}
          title={contentEN.title}
        />}

        <br />
        <label>{language === AR ? "القسم" : "Category"}</label>
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
        {validation.hasError &&
          <div className="alert alert-danger mt-3" role="alert">
            <ul>
              {validation.errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        }
        <br />
        <button className="btn solid-btn signupBtn tajawal mb-5" type="submit">{language === AR ? "إنشاء" : "Create"}</button>
      </form>
    </div>
  );
};

const ARArticle = ({ handleChangeEditor, handleChangeTitle, content, title }) => (
  <>
    <label htmlFor="img">صورة العرض</label>
    <input className="form-control" type="file" id="img" name="img" accept="image/*" />
    <label>عنوان الموضوع</label>
    <input className="form-control" name="title" type="text" placeholder="عنوان الموضوع" value={title} onChange={handleChangeTitle} />
    <label>محتوى الموضوع</label>
    <Editor
      handleChangeEditorValue={handleChangeEditor}
      value={content}
      land={AR}
    />
  </>
);

const ENArticle = ({ handleChangeEditor, handleChangeTitle, content, title }) => (
  <>
    <label htmlFor="img">Cover image:</label>
    <input className="form-control" type="file" id="img" name="img" accept="image/*" />
    <label>Article title</label>
    <input className="form-control" name="title" type="text" placeholder="Article title" value={title} onChange={handleChangeTitle} />
    <label>Article content</label>
    <Editor
      handleChangeEditorValue={handleChangeEditor}
      value={content}
      land={EN}
    />
  </>
);

function validate(article, lang) {
  const { title, content } = article;
  const errors = [];
  if (title.trim() === "") {
    errors.push(lang === EN ? "Title must not be empty" : "عنوان الموضوع فارغ");
  }
  if (title.trim() !== "" && title.length < 4) {
    errors.push(lang === EN ? "Title is too short" : "عنوان الموضوع قصير جداً");
  }
  if (StrippedString(content).trim() === "") {
    errors.push(lang === EN ? "Content must not be empty" : "محتوى الموضوع فارغ");
  }
  return errors;
}

function isEmpty(article) {
  const { title, content } = article;
  if (title.trim() === "" && StrippedString(content).trim() === "") {
    return true;
  }
  return false;
}

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

const StrippedString = string => string.replace(/(<([^>]+)>)/ig, "");

export default CreateArticle;
