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
var programID = new solanaWeb3.PublicKey(
  "5WiqUxXHhvFEGSTzFsdK8GuZUjVF6aq7RPLiDBQH65d1"
);
var mint = new solanaWeb3.PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
);
var tokenProgram = new solanaWeb3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);
var destination = new solanaWeb3.PublicKey(
  "DnznFoJLb1WWQDsPfsAyh5u6oRr92scK58g4oqsMuMmH"
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
      if (walletAdd == "") {
        alert("Please connect your wallet first. ");
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
        if (i == accArrStake.length - 1 || changedStakeCopy < stakeTemp) {
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
      var rentExemptVal = await connection.getMinimumBalanceForRentExemption(
        71
      );
      var userUSDCAssocTokAddr = await connection.getTokenAccountsByOwner(
        globalKey,
        { mint: mint }
      );
      var blockhashObj = await connection.getRecentBlockhash();
      var betTrans = new solanaWeb3.Transaction();

      for (var x = 0; x < finalArr.length; x++) {
        var odds = finalArr[x].odds;
        var originalOdds = finalArr[x].originalOdds;
        var stake = finalArr[x].stake;
        var originalStake = finalArr[x].originalStake;
        var acc = finalArr[x].acc;
        var ha = betData[1];

        originalStake = originalStake * 100;
        stake = stake * 100;
        var oppositeStake = stake * (odds - 1);
        oppositeStake = Math.round(oppositeStake);

        var stake256 = Math.floor(stake / 256);
        var stake1s = stake - stake256 * 256;

        var oppStake256 = Math.floor(oppositeStake / 256);
        var oppStake1s = oppositeStake - oppStake256 * 256;

        var homeStake256;
        var homeStake1s;
        var awayStake256;
        var awayStake1s;
        if (ha == 0) {
          homeStake256 = stake256;
          homeStake1s = stake1s;
          awayStake256 = oppStake256;
          awayStake1s = oppStake1s;
        } else if (ha == 1) {
          awayStake256 = stake256;
          awayStake1s = stake1s;
          homeStake256 = oppStake256;
          homeStake1s = oppStake1s;
        }

        if (odds != originalOdds) {
          //fit odds to tick
          odds *= 100;
          var corrected;
          if (odds < 201) {
            corrected = odds;
          } else if (odds < 301) {
            corrected = odds - (odds % 2);
          } else if (odds < 401) {
            corrected = odds - (odds % 5);
          } else if (odds < 601) {
            corrected = odds - (odds % 10);
          } else if (odds < 1001) {
            corrected = odds - (odds % 20);
          } else if (odds < 2001) {
            corrected = odds - (odds % 50);
          } else if (odds < 3001) {
            corrected = odds - (odds % 100);
          } else if (odds < 5001) {
            corrected = odds - (odds % 200);
          } else if (odds < 10001) {
            corrected = odds - (odds % 500);
          } else {
            corrected = odds - (odds % 1000);
          }
          odds = Math.round(corrected) / 100;

          //start bet
          var seed = "a" + Math.random() * 1000000000000;
          var newAcc = await solanaWeb3.PublicKey.createWithSeed(
            globalKey,
            seed,
            programID
          );

          var trans = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.createAccountWithSeed({
              fromPubkey: globalKey,
              basePubkey: globalKey,
              seed: seed,
              newAccountPubkey: newAcc,
              lamports: rentExemptVal,
              space: 71,
              programId: programID,
            })
          );

          var wesBetData = new Uint8Array([
            betData[1],
            0,
            betData[0],
            homeStake256,
            homeStake1s,
            awayStake256,
            awayStake1s,
          ]);
          const instruction = new solanaWeb3.TransactionInstruction({
            keys: [
              { pubkey: newAcc, isSigner: false, isWritable: true },
              { pubkey: tokenProgram, isSigner: false, isWritable: false },
              {
                pubkey: userUSDCAssocTokAddr.value[0].pubkey,
                isSigner: false,
                isWritable: true,
              },
              { pubkey: mint, isSigner: false, isWritable: true },
              { pubkey: destination, isSigner: false, isWritable: true },
              { pubkey: globalKey, isSigner: true, isWritable: true },
            ],
            programId: programID,
            data: wesBetData,
          });
          trans.add(instruction);
          betTrans.add(trans);
        } else if (stake == originalStake) {
          //full match
          var startedBetAcc = new solanaWeb3.PublicKey(acc);
          var instruction = new solanaWeb3.TransactionInstruction({
            keys: [
              { pubkey: startedBetAcc, isSigner: false, isWritable: true },
              { pubkey: tokenProgram, isSigner: false, isWritable: false },
              {
                pubkey: userUSDCAssocTokAddr.value[0].pubkey,
                isSigner: false,
                isWritable: true,
              },
              { pubkey: mint, isSigner: false, isWritable: true },
              { pubkey: destination, isSigner: false, isWritable: true },
              { pubkey: globalKey, isSigner: true, isWritable: true },
            ],
            programId: programID,
            data: new Uint8Array([]),
          });

          betTrans.add(instruction);
        } else if (stake < originalStake) {
          //partial match
          console.log("Partial match running");
          var toBePartiallyMatched = new solanaWeb3.PublicKey(acc);
          var seed = "a" + Math.random() * 1000000000000;
          var newAcc = await solanaWeb3.PublicKey.createWithSeed(
            globalKey,
            seed,
            programID
          );

          var trans = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.createAccountWithSeed({
              fromPubkey: globalKey,
              basePubkey: globalKey,
              seed: seed,
              newAccountPubkey: newAcc,
              lamports: rentExemptVal,
              space: 71,
              programId: programID,
            })
          );

          var wesBetData = new Uint8Array([betData[1], stake256, stake1s]);
          const instruction = new solanaWeb3.TransactionInstruction({
            keys: [
              { pubkey: newAcc, isSigner: false, isWritable: true },
              { pubkey: tokenProgram, isSigner: false, isWritable: false },
              {
                pubkey: userUSDCAssocTokAddr.value[0].pubkey,
                isSigner: false,
                isWritable: true,
              },
              { pubkey: mint, isSigner: false, isWritable: true },
              { pubkey: destination, isSigner: false, isWritable: true },
              { pubkey: globalKey, isSigner: true, isWritable: true },
              {
                pubkey: toBePartiallyMatched,
                isSigner: false,
                isWritable: true,
              },
            ],
            programId: programID,
            data: wesBetData,
          });
          trans.add(instruction);
          betTrans.add(trans);
        } else if (stake > originalStake) {
          //overmatch
          console.log("Overmatch running");
          var startedBetAcc = new solanaWeb3.PublicKey(acc);
          var instruction = new solanaWeb3.TransactionInstruction({
            keys: [
              { pubkey: startedBetAcc, isSigner: false, isWritable: true },
              { pubkey: tokenProgram, isSigner: false, isWritable: false },
              {
                pubkey: userUSDCAssocTokAddr.value[0].pubkey,
                isSigner: false,
                isWritable: true,
              },
              { pubkey: mint, isSigner: false, isWritable: true },
              { pubkey: destination, isSigner: false, isWritable: true },
              { pubkey: globalKey, isSigner: true, isWritable: true },
            ],
            programId: programID,
            data: new Uint8Array([]),
          });
          betTrans.add(instruction);

          var newStake = stake - originalStake;
          var newOppositeStake = newStake * (odds - 1);

          var newStake256 = Math.floor(newStake / 256);
          var newStake1s = newStake - newStake256 * 256;

          var newOppStake256 = Math.floor(newOppositeStake / 256);
          var newOppStake1s = newOppositeStake - newOppStake256 * 256;

          var homeStake256;
          var homeStake1s;
          var awayStake256;
          var awayStake1s;
          if (ha == 0) {
            homeStake256 = newStake256;
            homeStake1s = newStake1s;
            awayStake256 = newOppStake256;
            awayStake1s = newOppStake1s;
          } else if (ha == 1) {
            awayStake256 = newStake256;
            awayStake1s = newStake1s;
            homeStake256 = newOppStake256;
            homeStake1s = newOppStake1s;
          }

          var seed = "a" + Math.random() * 1000000000000;
          var newAcc = await solanaWeb3.PublicKey.createWithSeed(
            globalKey,
            seed,
            programID
          );

          var trans = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.createAccountWithSeed({
              fromPubkey: globalKey,
              basePubkey: globalKey,
              seed: seed,
              newAccountPubkey: newAcc,
              lamports: rentExemptVal,
              space: 71,
              programId: programID,
            })
          );

          var wesBetData = new Uint8Array([
            betData[1],
            0,
            betData[0],
            homeStake256,
            homeStake1s,
            awayStake256,
            awayStake1s,
          ]);
          var instruction = new solanaWeb3.TransactionInstruction({
            keys: [
              { pubkey: newAcc, isSigner: false, isWritable: true },
              { pubkey: tokenProgram, isSigner: false, isWritable: false },
              {
                pubkey: userUSDCAssocTokAddr.value[0].pubkey,
                isSigner: false,
                isWritable: true,
              },
              { pubkey: mint, isSigner: false, isWritable: true },
              { pubkey: destination, isSigner: false, isWritable: true },
              { pubkey: globalKey, isSigner: true, isWritable: true },
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
          setHash(
            "https://explorer.solana.com/tx/" + signature + "?cluster=devnet"
          );
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
          Transaction Successful!{" "}
          <a href={hash} target="_blank">
            {" "}
            Explorer{" "}
          </a>
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
            This Will Return
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
            Place a Bet
          </button>
        </form>
      </div>
    </div>
  );
};

export default BetSlip;
