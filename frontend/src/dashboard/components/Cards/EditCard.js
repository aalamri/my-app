import React from "react";
import { useParams } from "react-router";

const EditCard = () => {
  let { id } = useParams();

  return <div className="uk-container uk-container-medium">EDIT Card {id}</div>;
};

export default EditCard;
