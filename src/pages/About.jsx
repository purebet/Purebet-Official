import React from "react";

const About = () => {
  return (
    <div>
      <h3 className="sans-600 sect-title">About Purebet.</h3>
      <p className="sans about-body">
        Purebet is a decentralized, non-custodial sports betting exchange and
        prediction market based on the Solana blockchain, custom built from the
        ground up to give the optimal betting experience. The current build is
        an alpha version to demonstrate the power of building custom built smart
        contracts on the Solana blockchain designed specifically for sports
        betting. Purebet allows anyone to express their opinion on any sporting
        event, political race, financial market, or any other prediction outcome
        without the worry of having to trust a 3rd party with their funds.
        Purebet connects people with opposing views automatically and
        anonymously.
      </p>
      <h3 className="sans-600 sect-title">To use this devnet demo.</h3>
      <p className="sans about-body">
        Switch your Phantom wallet to devent by clicking the cog in the bottom
        right, and selecting Change Network then Devnet. Go to{" "}
        <a href="http://solfaucet.com"> Sol Faucet </a> to get up to 2 devnet
        SOL. Go to devnet{" "}
        <a href="https://spl-token-faucet.com/?token-name=USDC">USDC faucet</a>{" "}
        to obtain up to 1000 devnet USDC. Go to our exchange to bet on an
        upcoming sporting event or our casino to test your classic Crash
        strategies before we go to mainnet. Contact us in{" "}
        <a href="https://discord.gg/22tr2FYAh9">Discord</a> if you have any
        issues or questions.
      </p>
    </div>
  );
};

export default About;
