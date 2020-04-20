import React from "react";

const CreateCard = () => {
  return (
    <form>
      <label>Card title</label>
      <input type="text" placeholder="Cart title"></input>
      <br />
      <label>Content title</label>
      <textarea placeholder="Card content"></textarea>
      <br />
      <button>Create</button>
    </form>
  );
};

export default CreateCard;
