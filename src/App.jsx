import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useMoralis } from "react-moralis";

const App = () => {
  const { logout, authenticate, user, Moralis, enableWeb3, isWeb3Enabled, isAuthenticated } =
    useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
      console.log("web3 activated");
    }
  }, [isWeb3Enabled, isAuthenticated]);

  async function auth() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
      mobileLinks: ["metamask", "trust", "rainbow", "argent", "imtoken", "pillar"],
      signingMessage: "Welcome!",
    });
    console.log(user);
  }

  async function send() {
    console.log("hi");
    const requestDetails = {
      type: "native",
      amount: Moralis.Units.ETH("0.5"),
      receiver: "0x259DB2fD041d370e803f4D44951bE0E4722b7a45",
    };

    const result = await Moralis.transfer(requestDetails);

    console.log(result.blockHash);
  }

  if (user)
    return (
      <div>
        <button onClick={logout}>Disconnect Wallet</button>
        <button onClick={() => send()}>Send Tokens</button>
      </div>
    );

  return (
    <div>
      <button onClick={() => auth()}>Connect Wallet</button>
    </div>
  );
};

export default App;
