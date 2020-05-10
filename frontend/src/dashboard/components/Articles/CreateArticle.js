import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { v4 as uuid } from 'uuid';

import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";
import { CATEGORIES_QUERY } from "../Category/queries";
import { CREATE_ARTICLE } from "./queries";
import { getToken } from "../../../utils/index";
// import { GET_USER_ID } from "../../../utils/queries";

// const token = getToken();
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
  const [createArticle] = useMutation(CREATE_ARTICLE);

  const intialCategories = data ? data.categories : [];

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

  function handleCreateArticle(e) {
    e.preventDefault();
    const currentArticle = language === AR ? contentAR : contentEN
    const otherArticle = language === EN ? contentAR : contentEN

    // validate erq fields in current lang
    const errors = validate(currentArticle, language)
    if (errors.length > 0) {
      setValidation({ hasError: true, errors })
      return;
    }

    // check if content in other lang is not empty to bind both articles with uuid
    const isOtherLangEmpty = isEmpty(otherArticle)

    const formData = new FormData(e.target);
    // payload of current article
    const payload1 = {
      language,
      title: currentArticle.title,
      content: currentArticle.content,
      category: getCatID(intialCategories, formData.get("category")),
      published_at: getDate(new Date()),
      status: "Pending",
      multi_lang_id: isOtherLangEmpty ? undefined : uuid(),
      // author: "5e93e0d2c266b30fa0d7fad9", // sultan
      author: "5eb1f731147f722414b44c30", // sarah
      meta: {
        visits: 0,
        likes: 0,
      },
    };

    createArticle({
      variables: { data: payload1 } /*TODO add headers token here*/,
    });

    // create another article if other article is not empty
    if (isOtherLangEmpty === false) {
      const payload2 = {
        ...payload1,
        language: language === AR ? EN : EN,
        title: otherArticle.title || "null",
        content: otherArticle.content || "null",
      };

      if (payload2.multi_lang_id == null) {
        throw Error("multi_lang_id is undefined for mulitple language article!")
      }
      createArticle({
        variables: { data: payload2 } /*TODO add headers token here*/,
      });
    }
  }

  function switchToAR(e) {
    e.stopPropagation();
    setValidation(initValidation);
    setLanguage(AR)
  }
  function switchToEN(e) {
    e.stopPropagation();
    setValidation(initValidation);
    setLanguage(EN)
  }

  return (
    <div className={`container my-5 ${language === AR ? 'text-right' : ''}`} dir={language === AR ? "rtl" : "ltr"}>
      <h3>{language === AR ? "إنشاء موضوع جديد" : "Create Article"}</h3>
      <form onSubmit={handleCreateArticle}>

        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class={`btn btn-info no-radius ${language === AR ? 'active' : ''}`} onClick={switchToAR}>
            <input type="radio" name="language" /> الموضوع بالعربية
          </label>
          <label class={`btn btn-info no-radius ${language === EN ? 'active' : ''}`} onClick={switchToEN}>
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

        {validation.hasError &&
          <div class="alert alert-danger mt-3" role="alert">
            <ul>
              {validation.errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        }
        <br />
        <button class="mt-3" type="submit">{language === AR ? "إنشاء" : "Create"}</button>
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
)

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
)

function validate(article, lang) {
  const { title, content } = article;
  const errors = []
  if (title.trim() == "") {
    errors.push(lang === EN ? "Title must not be empty" : "عنوان الموضوع فارغ")
  }
  if (title.trim() !== "" && title.length < 4) {
    errors.push(lang === EN ? "Title is too short" : "عنوان الموضوع قصير جداً")
  }
  if (StrippedString(content).trim() == "") {
    errors.push(lang === EN ? "Content must not be empty" : "محتوى الموضوع فارغ")
  }
  return errors
}

function isEmpty(article) {
  const { title, content } = article;
  if (title.trim() == "" && StrippedString(content).trim() == "") {
    return true
  }
  return false
}

const getDate = (date) =>
  `${date.getUTCFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`; // the desired format by Strapi

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

const StrippedString = string => string.replace(/(<([^>]+)>)/ig, "");

export default CreateArticle;
