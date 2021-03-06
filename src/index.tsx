import React from "react";
import ReactDOM from "react-dom";
import WAValidator from "wallet-address-validator";
import App from "./App";
import { Provider, rootStore } from "./store";
import config from "./config";
import "./styles/main.scss";

function render({
  address,
  networkType,
}: {
  address: string;
  networkType: string;
}): void {
  rootStore.orderStore.setOrderDestAddress(address);
  config.setAPI(networkType);
  ReactDOM.render(
    <Provider value={rootStore}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

window.renderReactApp = render;
if (window.chrome && window.chrome.runtime.onMessage) {
  window.chrome.runtime.onMessage.addListener(
    (request: { type: string; address: string }) => {
      if (request.type === "runApp") {
        const isTestNet = WAValidator.validate(
          request.address,
          "bitcoin",
          "testnet"
        );
        const isProdNet = WAValidator.validate(
          request.address,
          "bitcoin",
          "prod"
        );
        const networkType = isProdNet ? "mainnet" : "stagenet";
        if (!isTestNet && !isProdNet) {
          // eslint-disable-next-line
          console.error("Address INVALID");
          return;
        }
        render({ address: request.address, networkType });
      }
    }
  );
}
