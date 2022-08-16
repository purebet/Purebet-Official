import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import { useState } from "react";

const PendingBets = () => {
  const [walletAdd, setWalletAdd] = useState("");
  const [pendingData, setPendingData] = useState();

  const getPendingBets = async () => {
    const res = await axios.get(
      `https://usdcpending.mbdqwfss.repl.co/?key=${walletAdd}`
    );
    console.log(res);
    setPendingData(res.data);
    console.log(walletAdd);
  };
  if (walletAdd == "")
    return (
      <div>
        <Nav setWalletAdd={setWalletAdd} />
        <h3 className="serif-600">Pending Bets.</h3>
        <h5 className="serif-400">
          Please connect your wallet and click the button bellow.
        </h5>
      </div>
    );

  return (
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <div>
        <h3 className="serif">Pending Bets.</h3>
        <div className="p-bets-wrapper sans btn" onClick={getPendingBets}>
          Get bets!!
        </div>
      </div>
      <div>
        <h4 className="serif-600">Event.</h4>
        <h5 className="serif-400">Date.</h5>
        <div className="bet-event open-bet-details">
          <div>
            <h4 className="serif-600 team-name home-team">Backing Home</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingBets;
