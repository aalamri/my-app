import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_FEEDBACK,FEEDBACK_QUERY } from "./queries";


const CreateFeedback = () => {
    const { data, loading, error } = useQuery(FEEDBACK_QUERY);
    const [createFeedback] = useMutation(
        CREATE_FEEDBACK,
        {
          update(cache, { data: { createFeedback } }) {
            try {
              const { feedbacks } = cache.readQuery({ query: FEEDBACK_QUERY });
              cache.writeQuery({
                query: FEEDBACK_QUERY,
                data: { feedbacks: feedbacks.concat([createFeedback]) },
              });
            } catch (error) {
              if (error.message.startsWith("Can't find field cards on object")) {
                cache.writeQuery({
                  query: FEEDBACK_QUERY,
                  data: { feedbacks: [createFeedback] },
                });
              } else {
                console.log("createFeedback error:", error);
              }
            }
          },
        }
      );
      const [editorValue, setEditorValue] = useState("");
      const [language, setLanguage] = useState("Arabic");
    
      const intialType = data ? data.Types : [];
    
      if (loading) {
        return <span>loading</span>;
      }
      if (error) {
        return <span>error</span>;
      }

      function handleCreateFeedback(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const Type = formData.get("type");
        const message = formData.get(
          "message"
        );
        const content = editorValue;
    
        if (email && message) {
          const payload = {
            Type,
            message,
            email,
          };
          createFeedback({
            variables: { data: payload } /*TODO add headers token here*/,
          });
        } else {
          console.log("Error: 'message' AND 'email' must not be empty!");
        }
      }
      function handleChangeEditorValue(value) {
        setEditorValue(value);
      }
    
      return (
        <form onSubmit={handleCreateFeedback}>
          <label>Email</label>
          <input name="email" type="email" placeholder="Email" />
          <br />
          <label>Message</label>
          <input name="message" type="text" placeholder="message" />

          <br />
          <label>Select Type:</label>
          <select name="type" id="typs">
                  <option name="type">
                  Suggestion
                  </option>
                
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
  
export default CreateFeedback;
