import React from "react";
import CardsSlider from "./CardsSlider";
import FeaturedTests from "./FeaturedTests";
import FeaturedArticles from "./FeaturedArticles";

const Home = () => {
  return (
    <div>
      <CardsSlider /> 
      <FeaturedTests />
      <FeaturedArticles />
    </div>
  );
};

export default Home;
