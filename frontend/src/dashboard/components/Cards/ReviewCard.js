import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  GET_CARD,
  UPDATE_CARD,
  GET_TAGS,
  CARDS_QUERY,
} from "./queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Editor from "../Editor";
import { getToken } from "../../../utils/index";

const author_id = "123"; // TODO get user's id
const token = getToken();

const ReviewCard = () => {
  let { id } = useParams();

  const [cardStatus, setCardStatus] = useState("Pending")
  const { data, loading, error } = useQuery(GET_CARD, {
    variables: { id },
  });
  const { data: tags } = useQuery(GET_TAGS);
  const [updateCard] = useMutation(UPDATE_CARD, {
    variables: { id },
    update(cache, { data: { updateCard } }) {
      try {
        const { cards } = cache.readQuery({ query: CARDS_QUERY });
        cache.writeQuery({
          query: CARDS_QUERY,
          data: {
            cards: cards.map((a) => (a.id === id ? updateCard : a)),
          },
        });
      } catch (error) {
        if (error.message.startsWith("Can't find field cards on object")) {
          cache.writeQuery({
            query: CARDS_QUERY,
            data: { cards: [updateCard] },
          });
        } else {
          console.log("updateCard error:", error);
        }
      }
    },
  });
  const [language, setLanguage] = useState("");
  const [urlOtherLanguage, setUrlOtherLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentTag, setCurrentTag] = useState({
    id: null,
    name: null,
  });

  useEffect(() => {
    if (data) {
      console.log("useEffect", data.card.language);
      setLanguage(data.card.language);
      setUrlOtherLanguage(data.card.card_id_of_other_language);
      setTitle(data.card.title);
      setContent(data.card.content);
      populateCurrentTag();
    }
  }, [data]);

  useEffect(() => {
    if (tags) {
      populateCurrentTag();
    }
  }, [tags]);

  function populateCurrentTag() {
    if (tags?.tags.length > 0 && data?.card.tag) {
      const cat = tags.tags.find(
        ({ id }) => id === data.card.tag.id
      );
      setCurrentTag(cat);
    }
  }

  if (id === null) {
    return <p>Error: Invalid Card id!</p>;
  }

  if (data?.card.is_deleted) {
    return <p>Error: This card is deleted!</p>;
  }

  function handleChangeEditorValue(value) {
    setContent(value);
  }


  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      status: cardStatus
    }
    updateCard(
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
    setCardStatus(status)
  }

  function handleChangeTag(e) {
    const name = e.target.value;
    const id = getCatID(tags.tags, name);
    setCurrentTag({ id, name });
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
        Card URL in {language === "Arabic" ? "English" : "Arabic"} language
      </label>
      <input
        name="card_id_of_other_language"
        type="text"
        placeholder="URL"
        value={urlOtherLanguage}
        onChange={({ target }) => setUrlOtherLanguage(target.value)}
      />
      <br />
      <label htmlFor="img">Cover image:</label>
      <input type="file" id="img" name="img" accept="image/*" />
      <br />
      <label>Card title</label>
      <input
        name="title"
        type="text"
        placeholder="Card title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label>Card content</label>
      <Editor
        handleChangeEditorValue={handleChangeEditorValue}
        value={content}
      />
      <br />
      <label>Select Tag:</label>
      <select onChange={handleChangeTag} value={currentTag.name}>
        {tags?.tags.length > 0 &&
          tags.tags.map(({ id, name }) => {
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
                <input className="uk-radio" type="radio" name="radio2" onClick={() => handleComment("Approved")} checked={cardStatus === "Approved"}>
          </input>
        </label>
        <label> Reject
                <input className="uk-radio" type="radio" name="radio2" onClick={() => handleComment("Rejected")} checked={cardStatus === "Rejected"}>
          </input>
        </label>
        {cardStatus === "Rejected" &&
          <div className="uk-margin">
            <textarea className="uk-textarea" rows="4" placeholder="Comments"></textarea>
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

export default ReviewCard;
