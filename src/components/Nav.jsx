import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import WalletBtn from "./WalletBtn.tsx";

const Nav = ({ setWalletAdd }) => {
  return (
    <div>
      <header>
        <StaticImage
          src="../assets/Logo/Group 37.png"
          className="logo"
        ></StaticImage>
        <div className="right-nav">
          <Link to="/Exchange" className="sans nav-ele">
            Home
          </Link>
          <Link to="/SortByCategory" className="sans nav-ele">
            Events
          </Link>
          <div className="sans nav-ele">About</div>
          <Link to="/PendingBets" className="sans nav-ele">
            Pending Bets
          </Link>
          <WalletBtn setWalletAdd={setWalletAdd} />
        </div>
      </header>
    </div>
  );
};

export default Nav;
