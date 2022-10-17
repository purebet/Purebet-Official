import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import bgImg from "../images/Ellipse.png";
import AvailableBets from "../components/AvailableBets";
import Categories from "../components/Categories";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

const index = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Purebet</title>
        <link rel="icon" type="image/x-icon" href=""></link> 
        <link rel="apple-touch-icon" href="/apple-favicon.png" />
   
        <link rel="shortcut icon" type="image/png" href="https://raw.githubusercontent.com/lbianlbian/Purebet-Exchange-v2/master/src/images/apple-favicon.png"/>
      </Helmet>
      <Nav />
      <img src={bgImg} className="bg-img"></img>
      <div className="landing-page">
        <div className="hero-logo-wrapper">
          <h1 className="hero-logo serif-800">Purebet.</h1>
          <h4 className="tagline sans">
            A next generation decentralized sports betting exchange.
          </h4>
        </div>
        <div className="btn-container">
          <a
            href="https://purebet.medium.com/"
            target="_blank"
            className="trans-btn sans"
          >
            Blog.
          </a>
          <Link to="/Exchange" className="cta-btn sans">
            Launch Exchange.
          </Link>
        </div>
      </div>
      <div className="social-text">
        <h3 className="serif-600">
          Want to know more about <span>Purebet?</span>
        </h3>
        <p className="sans">
          Check out our <a href = "https://docs.google.com/document/d/1tCQ5CTwp9gK5DBMFC2g_aD_M0c6S851lREqKl0B4CMw/edit?usp=sharing" target = "_blank">About Us</a> page. Please follow us on{" "}
          <a href="https://twitter.com/Purebet_io" target="_blank">
            {" "}
            Twitter
          </a>{" "}
          to stay updated and <br /> join our{" "}
          <a href="https://discord.com/invite/3UWkCEQGka" target="_blank">
            Discord
          </a>{" "}
          to meet the community/ask questions!
        </p>
      </div>
    </main>
  );
};

export default index;
