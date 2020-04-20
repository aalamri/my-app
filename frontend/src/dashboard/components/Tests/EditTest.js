import React from "react";
import { useParams } from "react-router";

const EditTest = () => {
  let { id } = useParams();

  return <div className="uk-container uk-container-medium">EDIT Test {id}</div>;
};

export default EditTest;
