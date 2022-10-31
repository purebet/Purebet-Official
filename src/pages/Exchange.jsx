import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import bgImg from "../images/Ellipse.png";
import AvailableBets from "../components/AvailableBets";
import Categories from "../components/Categories";
import BetSlip from "../components/BetSlip";

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
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbxCY_YhtNe-GCBm98zDC11eSx6p9-cwQSfxS56BM3dCpY6cl5EbM-RU5zSn2_x3ex4HQg/exec"
      );
      console.log(res.data);
      setAvaiOdds(res.data);
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
      <div className="cat-sidebar"></div>
      <div className="exchange-section">
        <div className="betting-events-wrapper">
          <h3 className="serif-600 sect-title">Highlights.</h3>
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
            <div className="high-card sans">
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
            <div className="high-card sans">
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
            <div className="high-card sans">
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
          <h3 className="serif-600 sect-title">Next Up.</h3>
          <div className="long-row-eves sans">
            <div className="long-eve">
              <div className="long-eve-dt eve-dt">
                Mon, 27/11
                <br />
                14:30
              </div>
              <div className="long-eve-img">
                <img src="" alt="" />
              </div>
              <div className="long-eve-teams">Team1 VS Team2</div>
              <div className="long-eve-img">
                <img src="" alt="" />
              </div>
              <div className="long-odd1 long-odds">
                <div className="team1-odd long-odd">1.34</div>
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
          </div>
        </div>
        {/* <Categories setCat={setCat} setCatId={setCatId} />
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
        /> */}
      </div>
      <div className="pending-bets-section"></div>
    </div>
  );
};

export default Exchange;
