import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/index.scss";

const AvailableBets = () => {
  const [avaiOdds, setAvaiOdds] = useState([]);
  const [betOpen, setBetOpen] = useState();
  const avaiBets = async () => {
    try {
      const res = await axios.get("https://usdcavailable.mbdqwfss.repl.co");
      console.log(res.data);
      setAvaiOdds(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    avaiBets();
  }, []);

  const betDetails = (id) => {
    const ele = document.getElementById(id);
    // classList = "classList" in ele;
    ele.classList.add("open-bet-details");
    const hidBlock = ele.getElementsByClassName("nhb");
    console.log(hidBlock.length);
    for (let i = 0; i <= hidBlock.length - 1; i++) {
      hidBlock[i].classList.remove("h-block");
    }
    console.log(hidBlock[0]);
    setBetOpen((prev) => !prev);
  };

  const handleBets = async () => {
    try {
      const json = JSON.stringify({
        odds: "2",
        originalOdds: "2",
        stake: "10",
        originalStake: "10",
        acc: "CkMWLnaWGUVrQTpLYJ8kwptE6sHd7KMVgtbH51xy6FfR",
      });
      const res = await axios.post(
        "https://usdcbetplacer.mbdqwfss.repl.co?id1=0&id2=1&ha=0&bettor=HAE4RisEb22vDBQs7YwDeF27SUj6PGdvfQiKBqsSwyLV",
        json
      );
      console.log(res);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="betting-events-wrapper">
      <h3 className="serif-600 sect-title">Upcoming Events.</h3>
      <div className="bet-events">
        {avaiOdds.map((item, index) => {
          return (
            <div
              className="bet-event"
              key={index}
              id={index}
              onClick={() => betDetails(index)}
              betOpen
            >
              <h4 className="serif-600 team-name home-team">RealMadrid</h4>
              <div>
                <div className="h-odds-block home-block">
                  <div className="h-odds sans highest-odds-home">
                    {item.home[0].odds}
                  </div>
                  <div className="odds-bet-amt sans highest-odds-home">
                    {item.home[0].totalAmount} SOL
                  </div>
                </div>
                <div className="h-odds-block home-block h-block nhb">
                  <div className="h-odds sans">{item.home[1].odds}</div>
                  <div className="odds-bet-amt sans">
                    {item.home[1].totalAmount} SOL
                  </div>
                </div>
                <div className="h-odds-block home-block h-block nhb">
                  <div className="h-odds sans">{item.home[2].odds}</div>
                  <div className="odds-bet-amt sans">
                    {item.home[2].totalAmount} SOL
                  </div>
                </div>
              </div>
              <h4 className="serif-600 team-name vs">VS</h4>
              <div>
                <div className="h-odds-block away-block">
                  <div className="h-odds sans highest-odds-away">
                    {item.away[0].odds}
                  </div>
                  <div className="odds-bet-amt sans highest-odds-away">
                    {item.away[0].totalAmount} SOL
                  </div>
                </div>
                <div className="h-odds-block away-block h-block nhb">
                  <div className="h-odds sans">{item.away[1].odds}</div>
                  <div className="odds-bet-amt sans">
                    {item.away[1].totalAmount} SOL
                  </div>
                </div>
                <div className="h-odds-block away-block h-block nhb">
                  <div className="h-odds sans">{item.away[2].odds}</div>
                  <div className="odds-bet-amt sans">
                    {item.away[2].totalAmount} SOL
                  </div>
                </div>
              </div>
              <h4 className="serif-600 team-name away-team">Barcelona</h4>
            </div>
          );
        })}
      </div>
      {/* <div className="opened-event-wrapper"></div>
      <div className="bet-event-opened">
        <h4 className="serif-600 team-name home-team">Real Madrid</h4>
        <div className="block-container">
          <div className="h-odds-block home-block">
            <div className="h-odds sans highest-odds-home">76</div>
            <div className="odds-bet-amt sans highest-odds-home">7 SOL</div>
          </div>
          <div className="h-odds-block home-block">
            <div className="h-odds sans">76</div>
            <div className="odds-bet-amt sans">7 SOL</div>
          </div>
          <div className="h-odds-block home-block">
            <div className="h-odds sans">76</div>
            <div className="odds-bet-amt sans">7 SOL</div>
          </div>
        </div>
        <h4 className="serif-600 team-name vs">VS</h4>
        <div className="block-container">
          <div className="h-odds-block away-block">
            <div className="h-odds sans highest-odds-away">87</div>
            <div className="odds-bet-amt sans highest-odds-away">9 SOL</div>
          </div>
          <div className="h-odds-block away-block">
            <div className="h-odds sans">87</div>
            <div className="odds-bet-amt sans">9 SOL</div>
          </div>
          <div className="h-odds-block away-block">
            <div className="h-odds sans">87</div>
            <div className="odds-bet-amt sans">9 SOL</div>
          </div>
        </div>
        <h4 className="serif-600 team-name away-team">Barcelona</h4>
      </div> */}
      <div className="btn sans" onClick={handleBets}>
        Place Bet
      </div>
    </div>
  );
};

export default AvailableBets;
