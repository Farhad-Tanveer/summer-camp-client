import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Benefits from "../Benefits/Benefits";
import Instructors from "../instructors/instructors";
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
      <Instructors></Instructors>
    </div>
  );
};

export default Home;
