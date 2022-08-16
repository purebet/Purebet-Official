import React from "react";
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
        <WalletBtn setWalletAdd={setWalletAdd} />
      </header>
    </div>
  );
};

export default Nav;
