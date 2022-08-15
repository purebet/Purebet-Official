import React, { useState } from "react";
import "../pages/index.scss";

const BetSlip = ({
  betData,
  betSlipOpen,
  setBetSlipOpen,
  setChangedOdds,
  setChangedStake,
  changedOdds,
  changedStake,
}) => {
  const closeSlip = () => {
    setBetSlipOpen(false);
  };

  const handleChangedOdds = (event) => {
    setChangedOdds(event.target.value);
    console.log(event.target.value);
  };
  const handleChangedStake = (event) => {
    setChangedStake(event.target.value);
    console.log(event.target.value);
  };
  console.log(betData);
  return (
    <div>
      <div
        className={`betslip-wrapper ${betSlipOpen && "betslip-closed"}`}
        onClick={closeSlip}
      ></div>
      <div className={`betslip-container ${betSlipOpen && "betslip-closed"}`}>
        <form action="">
          <label htmlFor="odds-input" className="serif-400">
            Odds
          </label>
          <br />
          <input
            type="text"
            required
            id="odds-input"
            className="sans"
            value={changedOdds}
            onChange={handleChangedOdds}
          />
          <br />
          <br />
          <label htmlFor="stake-input" className="serif-400">
            Stake
          </label>
          <br />
          <input
            required
            type="text"
            id="stake-input"
            className="sans"
            value={changedStake}
            onChange={handleChangedStake}
          />
          <br />
          <br />
          <label htmlFor="total-field" className="serif-400">
            Total
          </label>
          <br />
          <input
            type="text"
            id="total-field"
            className="sans"
            value={(changedOdds * changedStake).toFixed(2)}
            readOnly
          />
          <br />
          <br />
          <button type="submit" className="cta-btn sans">
            Place Bet
          </button>
        </form>
      </div>
    </div>
  );
};

export default BetSlip;
