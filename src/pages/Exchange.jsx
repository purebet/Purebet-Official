import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import bgImg from "../images/Ellipse.png";
import AvailableBets from "../components/AvailableBets";
import Categories from "../components/Categories";
import BetSlip from "../components/BetSlip";
import "@solana/web3.js";
var solanaWeb3 = require("@solana/web3.js");

const Exchange = () => {
  const [betData, setBetData] = useState([]);
  const [betSlipOpen, setBetSlipOpen] = useState();
  const [accArrStake, setAccArrStake] = useState([]);
  const [accArray, setAccArray] = useState([]);
  const oriOdds = betData[2];
  const oriStake = betData[3];
  const [changedOdds, setChangedOdds] = useState(oriOdds);
  const [changedStake, setChangedStake] = useState();
  const [walletAdd, setWalletAdd] = useState("");
  const [avaiOdds, setAvaiOdds] = useState([]);
  const [cat, setCat] = useState(false);
  const [catId, setCatId] = useState(0);
  const avaiBets = async () => {
    try {
      var connection = new solanaWeb3.Connection("https://devnet.genesysgo.net/", "confirmed");
      var programID = new solanaWeb3.PublicKey("M8WYXm9YGPcBqt8QpAMgZXbMFjVXeTyMrQ94pAtkitK");
      var all0s = new solanaWeb3.PublicKey(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
      //later this variable will be populated from the database. each id1 * 256 + id2 will have all events linked with it
      var initJSON = {"0":{
                      "event": "Purebet to be ready on October 20th", 
                      "homeTeam": "Yes", 
                      "awayTeam": "No", 
                      "sport": "Programming, Designing, and Writing", 
                      "date": "October 20th",
                      "home": [ {"odds": 0, "totalAmount": 0, "accArr": [{"amount": 0, "acc": "blank"}] }, 
                                {"odds": 0, "totalAmount": 0, "accArr": [{"amount": 0, "acc": "blank"}] }, 
                                {"odds": 0, "totalAmount": 0, "accArr": [{"amount": 0, "acc": "blank"}] } 
                              ], 
                      "away": [{"odds": 0, "totalAmount": 0, "accArr": [{"amount": 0, "acc": "blank"}] },
                               {"odds": 0, "totalAmount": 0, "accArr": [{"amount": 0, "acc": "blank"}] },
                                {"odds": 0, "totalAmount": 0, "accArr": [{"amount": 0, "acc": "blank"}] } 
                              ]
                     }};
      //home is blank so people can bet on home
      var homeAccs = await connection.getProgramAccounts(
        programID, 
        {filters:
          [
            {memcmp: {offset: 6, bytes: all0s.toBase58()} },
            {DataSizeFilter: {dataSize: 71} }
          ]
        },
        {dataSlice: {length: 6, offset:0} }
      );
      
      for(var x = 0; x < homeAccs.length; x++){
        var id1 = accs[x].account.data[0];
        var id2 = accs[x].account.data[1];
        var position = id1 * 256 + id2;
        
        var stakeHome = (homeAccs[x].account.data[2] * 256 + accs[x].account.data[3]) / 100;
        var stakeAway = (homeAccs[x].account.data[4] * 256 + accs[x].account.data[5]) / 100;
        if(stakeHome == 0 || stakeAway == 0){
          continue;
        }
        
        var toMatchStake = stakeHome;
        var toMatchOdds = (stakeHome + stakeAway) / stakeHome;
        //var highest = initJson.outputNee.home[0];
        //var secondHighest = output[indexNeeded].home[1];
        //var thirdHighest = output[indexNeeded].home[2];
        
      
      /*
      const res = await axios.get("https://script.google.com/macros/s/AKfycbxCY_YhtNe-GCBm98zDC11eSx6p9-cwQSfxS56BM3dCpY6cl5EbM-RU5zSn2_x3ex4HQg/exec");
      console.log(res.data);
      setAvaiOdds(res.data);
      */
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    avaiBets();
  }, []);
  return (
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <img src={bgImg} className="bg-img"></img>
      <div className="ex-hero-text serif-800">
        No deposit or <br />
        payout hassle.
        <br />
        No limit or bans.
        <br />
        Purely betting.
        <br />
        <span>Purebet.</span>
      </div>
      <div className="betting-events-wrapper">
        <h3 className="serif-600 sect-title">Upcoming Events.</h3>
        <div className="bet-events">
          //there used to be a .slice(0, 4) after avaiOdds, but I took it out because for the time being we won't have more than 5 events.
          {avaiOdds.map((item, index) => {
            return (
              <AvailableBets
                setBetData={setBetData}
                setBetSlipOpen={setBetSlipOpen}
                setChangedOdds={setChangedOdds}
                setAccArrStake={setAccArrStake}
                setChangedStake={setChangedStake}
                setAccArray={setAccArray}
                item={item}
                index={index}
                avaiOdds={avaiOdds}
              />
            );
          })}
        </div>
      </div>
      <Categories setCat={setCat} setCatId={setCatId} />
      <BetSlip
        betData={betData}
        betSlipOpen={betSlipOpen}
        setBetSlipOpen={setBetSlipOpen}
        setChangedOdds={setChangedOdds}
        setChangedStake={setChangedStake}
        changedOdds={changedOdds}
        changedStake={changedStake}
        walletAdd={walletAdd}
        accArrStake={accArrStake}
        accArray={accArray}
      />
    </div>
  );
};

export default Exchange;
