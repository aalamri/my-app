import React, {useState} from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import {useMutation } from "@apollo/react-hooks";
import Query from "../../dashboard/Query";
import { CARD_QUERY, UPDATE_CARD } from "../../dashboard/Cards/queries";
import Dashboard from "../../dashboard";
import { getToken } from "../../utils/index";

const token = getToken();

const Card = () => {
    
    let { id } = useParams();
    const [cardStatus,setCardStatus] = useState("Pending")
    const [updatCard, { data: updateCardData }] = useMutation(
        UPDATE_CARD,
    )

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            status: cardStatus
        }
        updatCard (
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
        setCardStatus (status)
    }
    
 
  return (
    <div className="uk-container uk-container-medium">
      <Dashboard />
      <div class="uk-container uk-container-medium"></div>
      <Query query={CARD_QUERY} id={id}>
        {({ data: { card } }) => {
            console.log("is approve", card.is_approved )
        return (
            <div>
        <form class="uk-form-horizontal uk-margin-large">
        <div class="uk-margin">
        <label class="uk-form-label" for="form-horizontal-text">Title</label>
        <div class="uk-width-1-4@s">
          <label htmlFor="title"></label>
          <input class="uk-input" 
            type="text"
            name="title"
            id="title"
            value={card.title}
            // onChange={this.handleChange}
          ></input>
        </div>
        </div>
        <div class="uk-margin">
        <label class="uk-form-label" for="form-horizontal-text">Content</label>
        <div class="uk-width-1-4@s">
          <label htmlFor="Content"></label>
          <input class="uk-input" 
            type="text"
            name="Content"
            id="Content"
            value={card.Content}
            // onChange={this.handleChange}
          ></input>
        </div>
        </div>             
         <div
                id=""
                className="uk-margin"
                data-src={
                  card.image.url
                    ? process.env.REACT_APP_BACKEND_URL + card.image.url
                    : ""
                }
                data-srcset={
                  card.image.url
                    ? process.env.REACT_APP_BACKEND_URL + card.image.url
                    : ""
                }
                data-uk-img
              >
              </div>
            <div className="uk-margin">
            <label class="uk-form-label" for="form-horizontal-select">Language</label>
                <select>
                    <option>
                    {card.Language}
                    </option>
                </select>
            </div>
              <div className="uk-margin">
              <label class="uk-form-label" for="form-horizontal-select">Published</label>
                <div className="">
                  <ReactMarkdown source={card.content} escapeHtml={false} />
                  <p>
                    <Moment format="MMM Do YYYY">{card.published_at}</Moment>
                  </p>
                </div>
              </div>
              <div className="uk-margin">
            <label> Approved
                <input class="uk-radio" type="radio" name="radio2" onClick={() => handleComment("Approved")} checked={cardStatus === "Approved"}> 
                </input>
            </label>
            <label> Reject
                <input class="uk-radio" type="radio" name="radio2"  onClick={() => handleComment("Rejected")} checked={cardStatus === "Rejected"}> 
                </input>
            </label>
            {cardStatus === "Rejected" && 
            <div className="uk-margin">
            <textarea class="uk-textarea" rows="4" placeholder="Comments"></textarea>    
            </div>
            }
            </div>
              </form>
              <button class="uk-button uk-button-primary" onClick={handleSubmit}>Submit</button>
              {/* <button class="uk-button uk-button-danger uk-button-large" oonClick={() => {history.goBack()}}>Back</button> */}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Card;
