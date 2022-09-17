import React, { useState } from "react";
import axios from "axios";
import "../pages/index.scss";
import "@solana/web3.js";
import bytebuffer from "bytebuffer";

var solanaWeb3 = require("@solana/web3.js");
var connection = new solanaWeb3.Connection(
  "https://devnet.genesysgo.net/",
  "confirmed"
);

const BetSlip = ({
  betData,
  betSlipOpen,
  setBetSlipOpen,
  setChangedOdds,
  setChangedStake,
  changedOdds,
  changedStake,
  walletAdd,
  accArrStake,
  accArray,
}) => {
  const [resData, setResData] = useState("");
  const [succPop, setSuccPop] = useState();
  const [hash, setHash] = useState("https://explorer.solana.com");
  const placeBets = async (e) => {
    e.preventDefault();
    try {
      if(walletAdd == ""){
        //make a new commit for gatsby to see, why isn't this deploying?
        alert("Please connect your Phantom Wallet first. ");
        return;
      }
      const oriOdds = betData[2];
      const oriStake = betData[3];
      let finalArr = [];
      let changedStakeCopy = changedStake;
      console.log(accArrStake);
      console.log(accArray);
      for (let i = 0; i < accArrStake.length; i++) {
        if (oriOdds != changedOdds) {
          finalArr.push({
            odds: changedOdds,
            originalOdds: oriOdds,
            stake: changedStake,
            originalStake: changedStake,
            acc: "",
          });
          break;
        }
        let acctemp = accArray[i];
        let stakeTemp = accArrStake[i];
        if ((i == accArrStake.length - 1 || changedStakeCopy < stakeTemp)) {          
          finalArr.push({
            odds: changedOdds,
            originalOdds: oriOdds,
            stake: changedStakeCopy,
            originalStake: stakeTemp,
            acc: acctemp,
          });
          break;
        }
        finalArr.push({
          odds: changedOdds,
          originalOdds: oriOdds,
          stake: stakeTemp,
          originalStake: stakeTemp,
          acc: acctemp,
        });
        //setChangedStake((prev) => prev - stakeTemp);
        changedStakeCopy -= stakeTemp;
      }
      console.log(finalArr);
      var globalKey = new solanaWeb3.PublicKey(walletAdd);
      var rentExemptVal = await connection.getMinimumBalanceForRentExemption(73);
      var userUSDCAssocTokAddr = await connection.getTokenAccountsByOwner(globalKey, {mint: mint});
      var blockhashObj = await connection.getRecentBlockhash();
      var betTrans = new solanaWeb3.Transaction();
      
      for(var x = 0; x < finalArr.length; x++){
        var odds = finalArr[x].odds;
        var originalOdds = finalArr[x].originalOdds;
        var stake = finalArr[x].stake;
        var originalStake = finalArr[x].originalStake;
        var acc = finalArr[x].acc;
        
	originalStake = originalStake * 100;
        stake = stake * 100;
        var oppositeStake = stake * (odds - 1);
        oppositeStake = Math.round(oppositeStake);
	      
	var stake256squared = Math.floor(stake / (256 * 256)); 
        stake = stake - stake256squared * 256 * 256;
        var stake256 = Math.floor(stake / 256);
        var stake1s = stake  - stake256 * 256;
  
        var oppStake256squared = Math.floor(oppositeStake / (256 * 256));
        oppositeStake = oppositeStake - oppStake256squared * 256 * 256;
        var oppStake256 = Math.floor(oppositeStake / 256);
        var oppStake1s = oppositeStake - oppStake256 * 256;
        
        if(odds != originalOdds){
          //fit odds to tick
          odds *= 100;
          var corrected;
          if(odds < 201){
            corrected = odds;
          }
          else if(odds < 301){
            corrected = odds - odds % 2;
          }
          else if(odds < 401){
            corrected = odds - odds % 5;
          }
          else if(odds < 601){
            corrected = odds - odds % 10;
          }
          else if(odds < 1001){
            corrected = odds - odds % 20;
          }
          else if(odds < 2001){
            corrected = odds - odds % 50;
          }
          else if(odds < 3001){
            corrected = odds - odds % 100;
          }
          else if(odds < 5001){
            corrected = odds - odds % 200;
          }
          else if(odds < 10001){
            corrected = odds - odds % 500;
          }
          else{
            corrected = odds - odds % 1000;
          }
          odds = Math.round(corrected) / 100;
          
          //start bet
          var seed = "a" + Math.random() * 1000000000000;
	        var newAcc = await solanaWeb3.PublicKey.createWithSeed(globalKey, seed, programID); 
  
	        var trans = new solanaWeb3.Transaction().add(
		        solanaWeb3.SystemProgram.createAccountWithSeed({
			        fromPubkey: globalKey,
			        basePubkey: globalKey,
			        seed: seed,
			        newAccountPubkey: newAcc,
			        lamports: rentExemptVal,
			        space: 73,
			        programId: programID,
		        })
	        );
          
          var wesBetData = new Uint8Array([betData[1], 0, betData[0], stake256squared, stake256, stake1s, oppStake256squared, oppStake256, oppStake1s]);
          const instruction = new solanaWeb3.TransactionInstruction({
		        keys: [
              {pubkey: newAcc, isSigner: false, isWritable: true},
              {pubkey: tokenProgram, isSigner: false, isWritable: false},
              {pubkey: userUSDCAssocTokAddr.value[0].pubkey, isSigner: false, isWritable: true},
              {pubkey: mint, isSigner: false, isWritable: true},
              {pubkey: destination, isSigner: false, isWritable: true},
              {pubkey: globalKey, isSigner: true, isWritable: true},
           ],
  	      	programId: programID,
		data: wesBetData,
          });
          trans.add(instruction);
          betTrans.add(trans);
        }
        else if(stake == originalStake){
          //full match
	  var startedBetAcc = new solanaWeb3.PublicKey(acc);
  	  var instruction = new solanaWeb3.TransactionInstruction({
		keys: [
      			{pubkey: startedBetAcc, isSigner: false, isWritable: true},
      			{pubkey: tokenProgram, isSigner: false, isWritable: false},
      			{pubkey: userUSDCAssocTokAddr.value[0].pubkey, isSigner: false, isWritable: true},
      			{pubkey: mint, isSigner: false, isWritable: true},
      			{pubkey: destination, isSigner: false, isWritable: true},
      			{pubkey: globalKey, isSigner: true, isWritable: true},
    		],
		programId: programID,
		data: new Uint8Array([]),
	  });

  	  betTrans.add(instruction);
        }
        else if(stake < originalStake){
		console.log("partial match running");
          	//partial match
		var toBePartiallyMatched = new solanaWeb3.PublicKey(acc);
  		var seed = "a" + Math.random() * 1000000000000;
	        var newAcc = await solanaWeb3.PublicKey.createWithSeed(globalKey, seed, programID); 
  
	        var trans = new solanaWeb3.Transaction().add(
		        solanaWeb3.SystemProgram.createAccountWithSeed({
			        fromPubkey: globalKey,
			        basePubkey: globalKey,
			        seed: seed,
			        newAccountPubkey: newAcc,
			        lamports: rentExemptVal,
			        space: 73,
			        programId: programID,
		        })
	        );
          
          	var wesBetData = new Uint8Array([betData[1], 0, betData[0], stake256squared, stake256, stake1s, oppStake256squared, oppStake256, oppStake1s]);
          	const instruction = new solanaWeb3.TransactionInstruction({
		        keys: [
              			{pubkey: newAcc, isSigner: false, isWritable: true},
	          	    	{pubkey: tokenProgram, isSigner: false, isWritable: false},
        	      		{pubkey: userUSDCAssocTokAddr.value[0].pubkey, isSigner: false, isWritable: true},
              	      		{pubkey: mint, isSigner: false, isWritable: true},
              	      		{pubkey: destination, isSigner: false, isWritable: true},
              			{pubkey: globalKey, isSigner: true, isWritable: true},
           		],
  	      		programId: programID,
		        data: wesBetData,
          	});
          	trans.add(instruction);
          	betTrans.add(trans);
  		var toBeFullyMatched = newAcc;
  		var partialInstruction = new solanaWeb3.TransactionInstruction({
			keys: [
      				{pubkey: toBePartiallyMatched, isSigner: false, isWritable: true},
      				{pubkey: toBeFullyMatched, isSigner: false, isWritable: true},
    			],
			programId: programID,
			data: new Uint8Array([]),
		});
  		betTrans.add(partialInstruction);
        }
        else if(stake > originalStake){
          //overmatch
		console.log("Overmatch running");
		var startedBetAcc = new solanaWeb3.PublicKey(acc);
  	  	var instruction = new solanaWeb3.TransactionInstruction({
			keys: [
      				{pubkey: startedBetAcc, isSigner: false, isWritable: true},
      				{pubkey: tokenProgram, isSigner: false, isWritable: false},
      				{pubkey: userUSDCAssocTokAddr.value[0].pubkey, isSigner: false, isWritable: true},
      				{pubkey: mint, isSigner: false, isWritable: true},
      				{pubkey: destination, isSigner: false, isWritable: true},
      				{pubkey: globalKey, isSigner: true, isWritable: true},
    			],
			programId: programID,
			data: new Uint8Array([]),
	  	});
	  	betTrans.add(instruction);
		
		var newStake = stake - originalStake;
    		var newOppositeStake = newStake * (odds - 1);
		var newStake256squared = Math.floor(newStake / (256 * 256)); 
        	newStake = newStake - newStake256squared * 256 * 256;
        	var newStake256 = Math.floor(newStake / 256);
        	var newStake1s = newStake  - newStake256 * 256;
  
        	var newOppStake256squared = Math.floor(newOppositeStake / (256 * 256));
        	newOppositeStake = newOppositeStake - newOppStake256squared * 256 * 256;
        	var newOppStake256 = Math.floor(newOppositeStake / 256);
        	var newOppStake1s = newOppositeStake - newOppStake256 * 256;
		
		var seed = "a" + Math.random() * 1000000000000;
	        var newAcc = await solanaWeb3.PublicKey.createWithSeed(globalKey, seed, programID); 
  
	        var trans = new solanaWeb3.Transaction().add(
		        solanaWeb3.SystemProgram.createAccountWithSeed({
			        fromPubkey: globalKey,
			        basePubkey: globalKey,
			        seed: seed,
			        newAccountPubkey: newAcc,
			        lamports: rentExemptVal,
			        space: 73,
			        programId: programID,
		        })
	        );
          
          	var wesBetData = new Uint8Array([betData[1], 0, betData[0], newStake256squared, newStake256, newStake1s, newOppStake256squared, newOppStake256, newOppStake1s]);
          	var instruction = new solanaWeb3.TransactionInstruction({
		        keys: [
              			{pubkey: newAcc, isSigner: false, isWritable: true},
              			{pubkey: tokenProgram, isSigner: false, isWritable: false},
              			{pubkey: userUSDCAssocTokAddr.value[0].pubkey, isSigner: false, isWritable: true},
              			{pubkey: mint, isSigner: false, isWritable: true},
              			{pubkey: destination, isSigner: false, isWritable: true},
              			{pubkey: globalKey, isSigner: true, isWritable: true},
           		],
  	      		programId: programID,
		        data: wesBetData,
          	});
          	trans.add(instruction);
          	betTrans.add(trans);
        }
      }
      
      betTrans.recentBlockhash = blockhashObj.blockhash;
      betTrans.feePayer = globalKey;
      /*
      const json = JSON.stringify(finalArr);
      const res = await axios.post(
        `https://usdcbetplacer.mbdqwfss.repl.co?id1=0&id2=${betData[0]}&ha=${betData[1]}&bettor=${walletAdd}`,
        json
      );
      console.log(res);
      console.log(res.data);
      let resultHex = res.data;
      // change hex result to decimal
      // const htd = (hex) => {
      //   let resByte = parseInt(hex, 16);
      //   setResData(resByte);
      // };
      // htd(res.data);
      // console.log(resData);
      var result = [];
      while (resultHex.length >= 2) {
        result.push(parseInt(resultHex.substring(0, 2), 16));
        resultHex = resultHex.substring(2, resultHex.length);
      }
      var transaction = solanaWeb3.Transaction.from(result);
      */
      let signed = await window.solana.signTransaction(betTrans);
      let signature = await connection.sendRawTransaction(signed.serialize());
      console.log(signature);
      setBetSlipOpen(false);
      if (signature != "") {
        const timeOut = setTimeout(() => {
          setSuccPop(true);
          setHash("https://explorer.solana.com/tx/" + signature + "?cluster=devnet");
        }, 2000);
        return () => clearInterval(timeOut);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeSlip = () => {
    setBetSlipOpen(false);
  };

  const handleChangedOdds = (event) => {
    setChangedOdds(event.target.value);
  };
  const handleChangedStake = (event) => {
    setChangedStake(event.target.value);
  };

  const closeSucc = () => {
    setSuccPop(false);
  };

  console.log(changedStake);
  console.log(betData);
  console.log(walletAdd);
  return (
    <div>
      <div
        className={`succ-wrap ${succPop && "succ-open"}`}
        onClick={closeSucc}
      >
        <div className={`succ-pop sans ${succPop && "succ-open"}`}>
          Transaction Successful! <a href = {hash} target = "_blank"> Explorer </a>
        </div>
      </div>
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
            This Returns
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
          <button type="submit" className="cta-btn sans" onClick={placeBets}>
            Place Bet
          </button>
        </form>
      </div>
    </div>
  );
};

export default BetSlip;
