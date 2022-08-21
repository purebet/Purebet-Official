import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import WalletBtn from "./WalletBtn.tsx";

const Nav = ({ setWalletAdd }) => {
  return (
    <div>
      <header>
        <Link to="/">
          <StaticImage
            src="../assets/Logo/Group 37.png"
            className="logo"
          ></StaticImage>
        </Link>
        <div className="right-nav">
          <Link to="/Exchange" className="sans nav-ele">
            Home
          </Link>
          <Link to="/SortByCategory" className="sans nav-ele">
            Events
          </Link>
          <div className="sans nav-ele"> <a href = "https://docs.google.com/document/d/1tCQ5CTwp9gK5DBMFC2g_aD_M0c6S851lREqKl0B4CMw/edit?usp=sharing" target = "_blank">About</a> </div>
          <Link to="/PendingBets" className="sans nav-ele">
            Pending Bets
          </Link>
          <a
            href="https://purecrash.mbdqwfss.repl.co/"
            target="_blank"
            className="sans nav-ele"
          >
            Casino Game
          </a>
          <WalletBtn setWalletAdd={setWalletAdd} />
        </div>
      </header>
    </div>
  );
};

export default Nav;
