import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/index.scss";

const AvailableBets = ({
  setBetData,
  setBetSlipOpen,
  setChangedOdds,
  setChangedStake,
}) => {
  const [avaiOdds, setAvaiOdds] = useState([]);
  // const [betOpen, setBetOpen] = useState();
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

  const getBetData = (id, ha, od, st) => {
    setBetData([id, ha, od, st]);
    setBetSlipOpen(true);
    setChangedOdds(od);
    setChangedStake(st);
    console.log(id, ha, od, st);
  };

  return (
    <div className="betting-events-wrapper">
      <h3 className="serif-600 sect-title">Upcoming Events.</h3>
      <div className="bet-events">
        {avaiOdds.slice(0, 4).map((item, index) => {
          return (
            <div className="event-wrapper" key={index} id={index}>
              <h4 className="serif-600">{item.event}.</h4>
              <h5 className="serif-400">{item.date}.</h5>
              <div className="bet-event open-bet-details">
                <div>
                  <h4 className="serif-600 team-name home-team">
                    {item.homeTeam}
                  </h4>
                  <div
                    className="h-odds-block home-block"
                    onClick={() =>
                      getBetData(
                        index,
                        0,
                        item.home[0].odds,
                        item.home[0].totalAmount
                      )
                    }
                  >
                    <div className="h-odds sans highest-odds-home">
                      {item.home[0].odds}
                    </div>
                    <div className="odds-bet-amt sans highest-odds-home">
                      {item.home[0].totalAmount} USDC
                    </div>
                  </div>
                  <div
                    className="h-odds-block home-block nhb"
                    onClick={() =>
                      getBetData(
                        index,
                        0,
                        item.home[1].odds,
                        item.home[1].totalAmount
                      )
                    }
                  >
                    <div className="h-odds sans">{item.home[1].odds}</div>
                    <div className="odds-bet-amt sans">
                      {item.home[1].totalAmount} USDC
                    </div>
                  </div>
                  <div
                    className="h-odds-block home-block nhb"
                    onClick={() =>
                      getBetData(
                        index,
                        0,
                        item.home[2].odds,
                        item.home[2].totalAmount
                      )
                    }
                  >
                    <div className="h-odds sans">{item.home[2].odds}</div>
                    <div className="odds-bet-amt sans">
                      {item.home[2].totalAmount} USDC
                    </div>
                  </div>
                </div>
                <h4 className="serif-600 team-name vs">VS</h4>
                <div>
                  <h4 className="serif-600 team-name away-team">
                    {item.awayTeam}
                  </h4>
                  <div
                    className="h-odds-block away-block"
                    onClick={() =>
                      getBetData(
                        index,
                        1,
                        item.away[0].odds,
                        item.away[0].totalAmount
                      )
                    }
                  >
                    <div className="h-odds sans highest-odds-away">
                      {item.away[0].odds}
                    </div>
                    <div className="odds-bet-amt sans highest-odds-away">
                      {item.away[0].totalAmount} USDC
                    </div>
                  </div>
                  <div
                    className="h-odds-block away-block nhb"
                    onClick={() =>
                      getBetData(
                        index,
                        1,
                        item.away[1].odds,
                        item.away[1].totalAmount
                      )
                    }
                  >
                    <div className="h-odds sans">{item.away[1].odds}</div>
                    <div className="odds-bet-amt sans">
                      {item.away[1].totalAmount} USDC
                    </div>
                  </div>
                  <div
                    className="h-odds-block away-block nhb"
                    onClick={() =>
                      getBetData(
                        index,
                        1,
                        item.away[2].odds,
                        item.away[2].totalAmount
                      )
                    }
                  >
                    <div className="h-odds sans">{item.away[2].odds}</div>
                    <div className="odds-bet-amt sans">
                      {item.away[2].totalAmount} USDC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableBets;
