import React from "react";
import { useParams } from "react-router";

const EditArticle = () => {
  let { id } = useParams();

  return (
    <div className="uk-container uk-container-medium">EDIT Article {id}</div>
  );
};

export default EditArticle;
