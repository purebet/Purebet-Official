import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import { useState } from "react";

const PendingBets = () => {
  const [walletAdd, setWalletAdd] = useState("");
  const getPendingBets = async () => {
    const res = await axios.get(
      `https://usdcpending.mbdqwfss.repl.co/?key=${walletAdd}`
    );
    console.log(res);
    console.log(walletAdd);
  };
  return (
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <h3 className="serif">Pending Bets.</h3>
      <div className="p-bets-wrapper sans" onClick={getPendingBets}>
        get bets!!
      </div>
    </div>
  );
};

export default PendingBets;
