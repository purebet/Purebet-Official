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
      `https://script.google.com/macros/s/AKfycbxCY_YhtNe-GCBm98zDC11eSx6p9-cwQSfxS56BM3dCpY6cl5EbM-RU5zSn2_x3ex4HQg/exec?key=${walletAdd}`
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
            <table style={{marginLeft:"auto", marginRight:"auto"}}>
              <tr>
                <th className = "serif-400" style = {{padding:"2%"}}> Event </th>
                <th className = "serif-400" style = {{padding:"2%"}}> Backing </th>
                <th className = "serif-400" style = {{padding:"2%"}}> Is Matched? </th>
                <th className = "serif-400" style = {{padding:"2%"}}> Stake </th>
                <th className = "serif-400" style = {{padding:"2%"}}> Odds </th>
              </tr>
            {pendingData.map((bet) => (
              <tr>
                <td className = "serif-400" style = {{padding:"2%"}} > {bet.event} </td>
                <td className = "serif-400" style = {{padding:"2%"}}> {bet.team} </td>
                <td className = "serif-400" style = {{padding:"2%"}}> {bet.isMatched} </td>
                <td className = "serif-400" style = {{padding:"2%"}}> {bet.stake} </td>
                <td className = "serif-400" style = {{padding:"2%"}}> {bet.odds} </td>
              </tr>
            ))}
            </table>
       
      </div>
  );
};

export default PendingBets;
