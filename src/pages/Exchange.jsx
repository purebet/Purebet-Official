import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import bgImg from "../images/Ellipse.png";
import AvailableBets from "../components/AvailableBets";
import Categories from "../components/Categories";

const Exchange = () => {
  return (
    <div>
      <Nav />
      <img src={bgImg} className="bg-img"></img>
      <div className="ex-hero-text serif-800">
        No deposit or <br />
        payout hassel.
        <br />
        No limit or bans.
        <br />
        Purely betting.
        <br />
        <span>Purebet.</span>
      </div>
      <Categories />
      <AvailableBets />
    </div>
  );
};

export default Exchange;
