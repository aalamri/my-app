import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { TAGS_QUERY } from "../Tag/queries";
import "react-quill/dist/quill.snow.css";

import { CREATE_CARD, CARDS_QUERY } from "./queries";
import Editor from "../Editor";

const CreateCard = () => {
  const { data, loading, error } = useQuery(TAGS_QUERY);
  const [createCard, { data: createCardData }] = useMutation(
    CREATE_CARD,
    {
      update(cache, { data: { createCard } }) {
        try {
          const { cards } = cache.readQuery({ query: CARDS_QUERY });
          cache.writeQuery({
            query: CARDS_QUERY,
            data: { cards: cards.concat([createCard]) },
          });
        } catch (error) {
          if (error.message.startsWith("Can't find field cards on object")) {
            cache.writeQuery({
              query: CARDS_QUERY,
              data: { cards: [createCard] },
            });
          } else {
            console.log("CreateCard error:", error);
          }
        }
      },
    }
  );
  const [editorValue, setEditorValue] = useState("");
  const [language, setLanguage] = useState("Arabic");

  const intialTags = data ? data.tags : [];

  if (loading) {
    return <span>loading</span>;
  }
  if (error) {
    return <span>error</span>;
  }

  function handleCreateCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const card_url_in_other_language = formData.get(
      "card_url_in_other_language"
    );
    const content = editorValue;

    if (title && content) {
      const payload = {
        language,
        card_url_in_other_language,
        title,
        content,
        // tags: getCatID(intialTags, formData.get("tag")),
        published_at: getDate(new Date()),
        status: "Pending",
        author_id: "123",
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
      createCard({
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
    <form onSubmit={handleCreateCard}>
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
        name="card_url_in_other_language"
        type="text"
        placeholder="URL"
      />
      <br />
      <label htmlFor="img">Cover image:</label>
      <input type="file" id="img" name="img" accept="image/*" />
      <br />
      <label>Card title</label>
      <input name="title" type="text" placeholder="Article title" />
      <br />
      <label>Card content</label>
      <Editor
        handleChangeEditorValue={handleChangeEditorValue}
        value={editorValue}
      />
      <br />
      <label>Select Tag:</label>
      <select name="tag" id="cars">
        {intialTags.length > 0 &&
          intialTags.map((cat) => {
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

export default CreateCard;
