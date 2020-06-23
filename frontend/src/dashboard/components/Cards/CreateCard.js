import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { TAGS_QUERY } from "../Tag/queries";
import "react-quill/dist/quill.snow.css";

import { CATEGORIES_QUERY } from "../Category/queries";
import { CREATE_CARD, CARDS_QUERY, UPDATE_CARD } from "./queries";
import Editor from "../Editor";
import swal from 'sweetalert';


const AR = "Arabic";
const EN = "English";

const CreateCard = () => {
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
  const [createCard] = useMutation(CREATE_CARD);
  const [updateCard] = useMutation(UPDATE_CARD);
  
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

  async function handleCreateCard(e) {
    e.preventDefault();
    const currentCard = language === AR ? contentAR : contentEN;
    const otherCardID = language === EN ? contentAR : contentEN;

    // validate required fields in current lang
    const errors = validate(currentCard, language);
    if (errors.length > 0) {
      setValidation({ hasError: true, errors });
      return;
    }

    // try to create article(s)
    try {
      // check if content in other lang is not empty to bind both articles if so
      const formData = new FormData(e.target);
      // payload of current article
      const payload1 = {
        language,
        title: currentCard.title,
        content: currentCard.content,
        category: getCatID(intialCategories, formData.get("category")),
        published_at: getDate(new Date()),
        status: "Pending",
        // author: "5e93e0d2c266b30fa0d7fad9", // sultan
        author: "5eb1f731147f722414b44c30", // sarah
        meta: {
          visits: 0,
          likes: 0,
        },
      };
      const card1 = await createCard({
        variables: { data: payload1 } /*TODO add headers token here*/,
      });
      swal("Success", "Send to Review!", "success");
      const currentCardID = card1.data.createCard.card.id;

      // create another article if other article is not empty
      const isOtherLangEmpty = isEmpty(otherCardID);
      if (isOtherLangEmpty === false) {
        const payload2 = {
          ...payload1,
          language: language === AR ? EN : EN,
          title: otherCardID.title || "null",
          content: otherCardID.content || "null",
          card_id_of_other_language: currentCardID
        };
        const card2 = await createCard({
          variables: { data: payload2 } /*TODO add headers token here*/,
        });
        const otherCardID = card2.data.createCard.card.id

        // update article1 with article2's id
        await updateCard({
          variables: {
            id: currentCardID,
            data: {
              card_id_of_other_language: otherCardID
            }
          }
        });
      }
      swal("Success", "Send to Review!", "success");
    } catch (error) {
      console.log("Error handleCreateCard:", error);
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
    <h3>{language === AR ? "إنشاء بطاقة جديدة" : "Create Card"}</h3>

    <form onSubmit={handleCreateCard}>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class={`btn btn-info no-radius ${language === AR ? 'active' : ''}`} onClick={switchToAR}>
      <input type="radio" name="language" /> الموضوع بالعربية
    </label>
    <label class={`btn btn-info no-radius ${language === EN ? 'active' : ''}`} onClick={switchToEN}>
      <input type="radio" name="language" /> Article in English
    </label>
  </div>

  <br />
  <br/>
  {language === AR && <ARCard
    handleChangeEditor={handleChangeEditor}
    handleChangeTitle={handleChangeTitle}
    content={contentAR.content}
    title={contentAR.title}
  />}
  {language === EN && <ENCard
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
        <div class="alert alert-danger mt-3" role="alert">
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

const ARCard = ({ handleChangeEditor, handleChangeTitle, content, title }) => (
  <>
    <label>عنوان البطاقة</label>
    <input className="form-control" style={{ width:"33.4rem" }} name="title" type="text" placeholder="Card title" value={title} onChange={handleChangeTitle} />
    <br/>
    <label>المحتوى</label>
    <Editor
      handleChangeEditorValue={handleChangeEditor}
      value={content}
      land={AR}
    />
  </>
);

const ENCard = ({ handleChangeEditor, handleChangeTitle, content, title }) => (
  <>
    <label>Card title</label>
    <input className="form-control"  style={{ width:"33.4rem" }} name="title" type="text" placeholder="Card title" value={title} onChange={handleChangeTitle} />
    <br/>
    <label>Card content</label>
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
  if (title.trim() == "") {
    errors.push(lang === EN ? "Title must not be empty" : "عنوان الموضوع فارغ");
  }
  if (title.trim() !== "" && title.length < 4) {
    errors.push(lang === EN ? "Title is too short" : "عنوان الموضوع قصير جداً");
  }
  if (StrippedString(content).trim() == "") {
    errors.push(lang === EN ? "Content must not be empty" : "محتوى الموضوع فارغ");
  }
  return errors;
}

function isEmpty(article) {
  const { title, content } = article;
  if (title.trim() == "" && StrippedString(content).trim() == "") {
    return true;
  }
  return false;
}

const getDate = (date) =>
  `${date.getUTCFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`; // the desired format by Strapi

const getCatID = (cats, cat) => cats?.find(({ name }) => name === cat).id;

const StrippedString = string => string.replace(/(<([^>]+)>)/ig, "");


export default CreateCard;
