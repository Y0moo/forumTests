import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useMoralis } from "react-moralis";

const App = () => {
  const { logout, authenticate, user, Moralis, enableWeb3, isWeb3Enabled, isAuthenticated } = useMoralis();
  const [tx, setTx] = useState("no")

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  // async function auth() {
  //   const user = authenticate({
  //     provider: "walletconnect",
  //     chainId: 4,
  //     mobileLinks: ["metamask", "trust", "rainbow", "argent", "imtoken", "pillar"],
  //     signingMessage: "Welcome!",
  //   });
  //   alert(user);
  // }

  async function send() {
    alert("hi");
    const requestDetails = {
      type: "native",
      amount: Moralis.Units.ETH("0.00005"),
      receiver: "0x259DB2fD041d370e803f4D44951bE0E4722b7a45",
    };

    await Moralis.transfer(requestDetails)
      .then((tx) => setTx(tx))
      .catch((e) => setTx(e));
  }

  return (
    <div>
      <button onClick={() =>  authenticate({ provider: "walletconnect", chainId: 4 })}>Auth</button>
      {JSON.stringify(tx)}
    </div>
  );
};

export default App;
