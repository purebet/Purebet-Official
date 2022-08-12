import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const Nav = () => {
  return (
    <div>
      <header>
        <StaticImage
          src="../assets/Logo/Group 37.png"
          className="logo"
        ></StaticImage>
      </header>
    </div>
  );
};

export default Nav;
