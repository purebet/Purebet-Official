import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import AvailableBets from "../components/AvailableBets";
import BetSlip from "../components/BetSlip";
import "./index.scss";
import Categories from "../components/Categories";
import soccer from "../images/Icons/soccer-ball.png";
import election from "../images/Icons/elections.png";
import basketball from "../images/Icons/ball-of-basketball.png";
import boxing from "../images/Icons/boxing-gloves.png";
import cricket from "../images/Icons/cricket.png";
import football from "../images/Icons/rugby-ball.png";
import "@solana/web3.js";
var solanaWeb3 = require("@solana/web3.js");

const SortByCategory = ({ location }) => {
  const [walletAdd, setWalletAdd] = useState("");
  const [avaiOdds, setAvaiOdds] = useState([]);
  const [betData, setBetData] = useState([]);
  const [betSlipOpen, setBetSlipOpen] = useState();
  const [accArrStake, setAccArrStake] = useState([]);
  const [accArray, setAccArray] = useState([]);
  const oriOdds = betData[2];
  const oriStake = betData[3];
  const [changedOdds, setChangedOdds] = useState(oriOdds);
  const [changedStake, setChangedStake] = useState();
  const [cat, setCat] = useState();
  const [catId, setCatId] = useState();
  const [apiRes, setApiRes] = useState(0);

  const apiFunct = async () => {
    try {
      const res = await axios.get(
        "https://j35m1flwm6.execute-api.ap-northeast-1.amazonaws.com/pbapi"
      );
      console.log(res.data);
      setApiRes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cat);
  useEffect(() => {
    apiFunct();
    const str = location.state.sport;
    const result = str.replace(/\s+/g, "").toLowerCase();

    setCat(result);
    // const intervalId = setInterval(() => {
    //   apiFunct();
    // }, 15000);
  }, [setCat]);

  return (
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <div className="exchange-inner-section">
        <Categories setCat={setCat} setCatId={setCatId} />
        <div className="betting-events-wrapper">
          <h3 className="p-font sect-title">
            Explore {location.state.sport} Events.
          </h3>
          <div className="long-row-eves b-font">
            {apiRes[cat]?.map((item) => {
              return (
                <div className="long-eve">
                  <div className="long-eve-dt eve-dt">
                    Mon, 27/11
                    <br />
                    14:30
                  </div>
                  <div className="long-eve-img">
                    <img src="" alt="" />
                  </div>
                  <div className="long-eve-teams">{item.event}</div>
                  <div className="long-eve-img">
                    <img src="" alt="" />
                  </div>
                  <div className="long-odd1 long-odds">
                    <div className="team1-odd long-odd"></div>
                    <div className="team2-odd long-odd">2.34</div>
                  </div>
                  <div className="long-odd-draw long-odds">
                    <div className="team1-odd long-odd">-</div>
                    <div className="team2-odd long-odd">-</div>
                  </div>
                  <div className="long-odd2 long-odds">
                    <div className="team1-odd long-odd">2.45</div>
                    <div className="team2-odd long-odd">5.67</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SortByCategory;
