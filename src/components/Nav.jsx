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
          <Link to="/About" className="sans nav-ele">
            About
          </Link>
          <Link to="/PendingBets" className="sans nav-ele">
            Pending Bets
          </Link>
          <a
            href="https://purebet.medium.com/"
            target="_blank"
            className="sans nav-ele"
          >
            Blog
          </a>
          <WalletBtn setWalletAdd={setWalletAdd} />
        </div>
      </header>
    </div>
  );
};

export default Nav;
