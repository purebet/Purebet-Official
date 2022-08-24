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
      `https://script.google.com/macros/s/AKfycbwjTojh5QMQRoXLhSdBq4t3bSL6EumvtmtBczHQsYQZkAORragqz9HM5GRKQFaE7RIk5Q/exec?key=${walletAdd}`
    );
    console.log(res);      
    setPendingData(res.data);
    console.log(walletAdd);
  };
  if (walletAdd == "")
    return (
      <div>
        <Nav setWalletAdd={setWalletAdd} />
        <h3 className="serif-600 p-sect-title">Pending Bets.</h3>
        <h5 className="serif-400 p-msg">Please connect your wallet.</h5>
      </div>
    );
  else if(pendingData == null)
    return(
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <div>
        <h3 className="serif-600 p-sect-title">Pending Bets.</h3>
        <h5 className="serif-400 p-msg">Please click the button below.</h5>
        <div className="p-bets-btn sans btn" onClick={getPendingBets}>
          Get Pending Bets!!
        </div>
      </div>
    </div>
    );

  return (
    
      <div>
    <Nav setWalletAdd={setWalletAdd} />
            <table id = "pendingbets">
              <tr>
                <th className = "serif-400"> Event </th>
                <th className = "serif-400"> Backing </th>
                <th className = "serif-400"> Is Matched? </th>
                <th className = "serif-400"> Stake </th>
                <th className = "serif-400"> Odds </th>
              </tr>
            {pendingData.map((bet) => (
              <tr>
                <td className = "serif-400"> {bet.event} </td>
                <td className = "serif-400"> {bet.team} </td>
                <td className = "serif-400"> {bet.isMatched} </td>
                <td className = "serif-400"> {bet.stake} </td>
                <td className = "serif-400"> {bet.odds} </td>
              </tr>
            ))}
            </table>
       
      </div>
  );
};

export default PendingBets;
