import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import { useState } from "react";

const PendingBets = () => {
  const [walletAdd, setWalletAdd] = useState("");
  const [pendingData, setPendingData] = useState();
  var table = document.getElementById("pendingbets");
  //var games = [
  const getPendingBets = async () => {
    const res = await axios.get(
      `https://usdcpending.mbdqwfss.repl.co/?key=${walletAdd}`
    );
    console.log(res);
    for(var x = 0; x < res.data.length; x++){
      var row = document.createElement("tr");
      
      var event = document.createElement("td");
      event.innerHTML = res.data[x].id2;
      row.appendChild(event);
      
      var team = document.createElement("td");
      team.innerHTML = res.data[x].ha;
      row.appendChild(team);
      
      var matched = document.createElement("td");
      matched.innerHTML = res.data[x].isMatched;
      row.appendChild(matched);
      
      var stake = document.createElement("td");
      stake.innerHTML = res.data[x].stake;
      row.appendChild(stake);
      
      var odds = document.createElement("td");
      odds.innerHTML = res.data[x].odds;
      row.appendChild(odds);
      
      table.appendChild(row);
    }
      
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

  return (
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <div>
        <h3 className="serif-600 p-sect-title">Pending Bets.</h3>
        <h5 className="serif-400 p-msg">Please click the button below.</h5>
        <div className="p-bets-btn sans btn" onClick={getPendingBets}>
          Get Pending Bets!!
        </div>
      </div>
      <div>
            <table id = "pendingbets">
              <tr>
                <th> Event </th>
                <th> Backing </th>
                <th> Is Matched? </th>
                <th> Stake </th>
                <th> Odds </th>
              </tr>
            </table>
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
