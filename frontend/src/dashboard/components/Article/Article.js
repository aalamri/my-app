import React, {useState} from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import {useMutation } from "@apollo/react-hooks";
import Query from "../Query";
import { ARTICLE_QUERY, UPDATE_ARTICLE } from "./queries";
import Dashboard from "../MainDash";
import { getToken } from "../../../utils";

const token = getToken();

const Article = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  console.log("userdsfaasdfasd", user);
    let { id } = useParams();
    const [cardStatus,setCardStatus] = useState("Pending")
    const [updatArticle, { data: updateCardData }] = useMutation(
      UPDATE_ARTICLE,
    )

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            status: cardStatus
        }
        updatArticle (
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
      <Query query={ARTICLE_QUERY} id={id}>
        {({ data: { article } }) => {
            console.log("is approve", article.is_approved )
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
            value={article.title}
            // onChange={this.handleChange}
          ></input>
        </div>
        </div>
        <div class="uk-margin">
        <label class="uk-form-label" for="form-horizontal-text">Content</label>
        <div class="uk-width-1-4@s">
          <label htmlFor="Content"></label>
        <ReactMarkdown source={article.content} escapeHtml={false} />
        </div>
        </div>             
         <div
                id=""
                className="uk-margin"
                data-src={
                  article.image.url
                    ? process.env.REACT_APP_BACKEND_URL + article.image.url
                    : ""
                }
                data-srcset={
                  article.image.url
                    ? process.env.REACT_APP_BACKEND_URL + article.image.url
                    : ""
                }
                data-uk-img
              >
              </div>
            <div className="uk-margin">
            <label class="uk-form-label" for="form-horizontal-select">Language</label>
                <select>
                    <option>
                    {article.language}
                    </option>
                </select>
            </div>
              <div className="uk-margin">
              <label class="uk-form-label" for="form-horizontal-select">Published</label>
                <div className="">
                  <p>
                    <Moment format="MMM Do YYYY">{article.published_at}</Moment>
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

export default Article;
