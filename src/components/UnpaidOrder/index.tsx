import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import QRCode from "qrcode.react";
import { Input, Code, Button } from "squirrel-ui-components";
import { Decimal } from "decimal.js";
import { useMst } from "../../store";
import Copy from "../Copy";

interface IWalletCode {
  remainingAmountIncoming: number;
  incomingAmountTotal: number;
  receivingSubaddress: string;
  state: string;
  onChange: () => void;
}

const WalletCode: React.FC<IWalletCode> = ({
  remainingAmountIncoming,
  incomingAmountTotal,
  receivingSubaddress,
  state,
  onChange,
}) => {
  const [useGUI, setUseGUI] = useState(false);
  return (
    <div>
      <div className="t-hint-1">
        Copy the line below into your {useGUI ? "Monero GUI" : "Monero CLI"}{" "}
        wallet to pay this order. Or use{" "}
        <button
          type="button"
          className="clear-btn c-hand text-primary"
          onClick={onChange}
        >
          QR code
        </button>
      </div>
      <Code>
        {useGUI ? (
          <span>
            {`monero:${receivingSubaddress}?tx_amount=${
              state === "UNDERPAID"
                ? remainingAmountIncoming
                : incomingAmountTotal
            }&tx_description=XMR.TO-payment`}
          </span>
        ) : (
          <span>
            {`transfer ${receivingSubaddress} ${
              state === "UNDERPAID"
                ? remainingAmountIncoming
                : incomingAmountTotal
            }`}
          </span>
        )}
      </Code>
      <div className="t-hint-1">
        or use&nbsp;
        <button
          type="button"
          className="text-primary clear-btn"
          onClick={() => {
            setUseGUI((v) => !v);
          }}
        >
          {useGUI ? "monero CLI" : "monero GUI"}
        </button>
      </div>
    </div>
  );
};

const WalletQRCode: React.FC<IWalletCode> = ({
  receivingSubaddress,
  remainingAmountIncoming,
  incomingAmountTotal,
  state,
  onChange,
}) => {
  const qrCodeString = `monero:${receivingSubaddress}?tx_amount=${
    state === "UNDERPAID" ? remainingAmountIncoming : incomingAmountTotal
  }&tx_description=XMR.to-payment`;
  return (
    <div>
      <div className="t-hint-1 mb-2">
        Scan this QR code with your mobile wallet. Or use{" "}
        <button
          type="button"
          className="clear-btn c-hand text-primary"
          onClick={onChange}
        >
          wallet command
        </button>
      </div>
      <QRCode value={qrCodeString} size={140} level="H" />
    </div>
  );
};

const UnpaidOrder = () => {
  const {
    orderStore: {
      order: {
        uuid,
        state,
        remainingAmountIncoming,
        receivingSubaddress,
        incomingAmountTotal,
        btcAmountPartial,
      },
      fetchOrder,
      completeOrder,
    },
  } = useMst();
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  function onCompleteOrder() {
    completeOrder({ uuid }).then(() => {
      fetchOrder({ uuid }).then();
    });
    setLoading(true);
  }
  const incomingAmountReceived = new Decimal(incomingAmountTotal)
    .minus(remainingAmountIncoming)
    .toNumber();
  return (
    <section className="order-step">
      <header className="order-step__header">
        <h3 className="h3">
          {state === "UNDERPAID" ? (
            "Incomplete payment"
          ) : (
            <span>
              Send <span className="text-primary">{incomingAmountTotal}</span>
              <Copy value={`${incomingAmountTotal}`} id="amount" /> XMR to the
              following address:
            </span>
          )}
        </h3>
      </header>
      <div className="order-step__content">
        {state === "UNDERPAID" && (
          <p className="mb-2">
            Received:{" "}
            <span className="text-bold">{incomingAmountReceived} XMR</span>
            &nbsp; out of{" "}
            <span className="text-bold">{incomingAmountTotal} XMR</span>.<br />
            Please send an additional{" "}
            <span className="text-bold">
              <Copy
                value={`${remainingAmountIncoming}`}
                text={`${remainingAmountIncoming} XMR`}
                id="xmrAmountRemaining"
              />
              &nbsp;
            </span>
          </p>
        )}
        <div className="mb-3">
          <div className="t-hint-1">Monero address:</div>
          <Input
            value={receivingSubaddress || ""}
            name="moneroAddress"
            id="moneroAddress"
            readOnly
          />
        </div>
        <div className="mb-2">
          {tabIndex === 0 && (
            <WalletQRCode
              state={state}
              receivingSubaddress={receivingSubaddress}
              remainingAmountIncoming={remainingAmountIncoming}
              incomingAmountTotal={incomingAmountTotal}
              onChange={() => setTabIndex(1)}
            />
          )}
          {tabIndex === 1 && (
            <WalletCode
              state={state}
              remainingAmountIncoming={remainingAmountIncoming}
              incomingAmountTotal={incomingAmountTotal}
              receivingSubaddress={receivingSubaddress}
              onChange={() => setTabIndex(0)}
            />
          )}
        </div>
        <div className="mb-2">
          {state === "UNDERPAID" && btcAmountPartial > 0 && (
            <p className="t-hint-1">
              Or press ”Complete Now” to complete the order immediately, using{" "}
              {incomingAmountReceived} XMR send to far. You&apos;ll receive{" "}
              {btcAmountPartial} BTC.
            </p>
          )}
          {state === "UNDERPAID" && btcAmountPartial > 0 && (
            <Button
              onClick={onCompleteOrder}
              size="big"
              loading={loading}
              primary
            >
              Complete Now
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default observer(UnpaidOrder);
