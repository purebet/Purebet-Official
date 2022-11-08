import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import AvailableBets from "../components/AvailableBets";
import Categories from "../components/Categories";
import BetSlip from "../components/BetSlip";
import "@solana/web3.js";
var solanaWeb3 = require("@solana/web3.js");

const Exchange = () => {
  const [walletAdd, setWalletAdd] = useState("");
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
  useEffect(() => {
    apiFunct();
    // const intervalId = setInterval(() => {
    //   apiFunct();
    // }, 15000);
  }, []);
  console.log(apiRes);

  return (
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <div className="exchange-inner-section">
        <div className="cat-sidebar">
          <Categories />
        </div>
        <div className="exchange-section">
          <div className="betting-events-wrapper">
            <h3 className="p-font sect-title">Highlights.</h3>
            <div className="bet-events">
              {/* {avaiOdds.slice(0, 4).map((item, index) => {
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
            })} */}
              <div className="high-card b-font">
                <div className="eve-dt">
                  <p>
                    Sat 30/11
                    <br />
                    23:00
                  </p>
                </div>
                <div className="card-header">
                  <div className="team1-logo-wrap">
                    <img src="" alt="" />
                    <p className="team-name">SEA Seahawks</p>
                  </div>
                  <div>VS</div>
                  <div className="team2-logo-wrap">
                    <img src="" alt="" />
                    <p className="team-name">DEN Bronocs</p>
                  </div>
                </div>
                <div className="card-grid">
                  <div className="row1">
                    <div id="odd1">1.675</div>
                    <div id="odd-draw">-</div>
                    <div id="odd2">2.4</div>
                  </div>
                  <div className="row2">
                    <div id="odd1">1.675</div>
                    <div id="odd-draw">-</div>
                    <div id="odd2">2.4</div>
                  </div>
                </div>
                <div className="total">Traded: $372</div>
              </div>
              <div className="high-card b-font">
                <div className="eve-dt">
                  <p>
                    Sat 30/11
                    <br />
                    23:00
                  </p>
                </div>
                <div className="card-header">
                  <div className="team1-logo-wrap">
                    <img src="" alt="" />
                    <p className="team-name">SEA Seahawks</p>
                  </div>
                  <div>VS</div>
                  <div className="team2-logo-wrap">
                    <img src="" alt="" />
                    <p className="team-name">DEN Bronocs</p>
                  </div>
                </div>
                <div className="card-grid">
                  <div className="row1">
                    <div id="odd1">1.675</div>
                    <div id="odd-draw">-</div>
                    <div id="odd2">2.4</div>
                  </div>
                  <div className="row2">
                    <div id="odd1">1.675</div>
                    <div id="odd-draw">-</div>
                    <div id="odd2">2.4</div>
                  </div>
                </div>
                <div className="total">Traded: $372</div>
              </div>
              <div className="high-card b-font">
                <div className="eve-dt">
                  <p>
                    Sat 30/11
                    <br />
                    23:00
                  </p>
                </div>
                <div className="card-header">
                  <div className="team1-logo-wrap">
                    <img src="" alt="" />
                    <p className="team-name">SEA Seahawks</p>
                  </div>
                  <div>VS</div>
                  <div className="team2-logo-wrap">
                    <img src="" alt="" />
                    <p className="team-name">DEN Bronocs</p>
                  </div>
                </div>
                <div className="card-grid">
                  <div className="row1">
                    <div id="odd1">1.675</div>
                    <div id="odd-draw">-</div>
                    <div id="odd2">2.4</div>
                  </div>
                  <div className="row2">
                    <div id="odd1">1.675</div>
                    <div id="odd-draw">-</div>
                    <div id="odd2">2.4</div>
                  </div>
                </div>
                <div className="total">Traded: $372</div>
              </div>
            </div>
            <h3 className="p-font sect-title">Next Up.</h3>
            <div className="long-row-eves b-font">
              {/* {apiRes.soccer?.map((item, index) => {
              return (
                <div className="long-eve" key={index}>
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
                    <div className="team1-odd long-odd">
                      {item.moneyline.home.Yes.highestOdds}
                    </div>
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
            })} */}
            </div>
          </div>
        </div>
        <div className="pending-bets-section"></div>
      </div>
    </div>
  );
};

export default Exchange;
