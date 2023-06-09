import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Benefits from "../Benefits/Benefits";
import PopularClasses from "../PopularClasses/PopularClasses";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Sporty Summer | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <Benefits></Benefits>
    </div>
  );
};

export default Home;
