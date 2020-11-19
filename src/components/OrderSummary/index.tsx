import React from "react";
import { observer } from "mobx-react-lite";
import BitcoinSent from "./bitcoin_sent.svg";
import Segment from "../Segment";
import pluralize from "../../helpers/pluralize";

interface OrderStatusProps {
  state: string;
  btcTransactionId: string;
  incomingNumConfirmationsRemaining: number;
  btcNumConfirmations: number;
  btcNumConfirmationsThreshold: number;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  state,
  btcTransactionId,
  incomingNumConfirmationsRemaining,
  btcNumConfirmations,
  btcNumConfirmationsThreshold,
}) => (
  <div>
    {(state === "BTC_SENT" || state === "NOT_FOUND") && (
      <div>
        <div className="mb-2">
          <div className="t-hint-1">
            Transaction ID of your BTC payment: <br />
          </div>
          <a
            className="text-break text-break-all"
            href={`https://tradeblock.com/bitcoin/tx/${btcTransactionId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {btcTransactionId}
          </a>
        </div>
      </div>
    )}
    <div className="mb-2">
      <div className="d-flex">
        <div className="text-primary" style={{ marginRight: "1rem" }}>
          STATUS:
        </div>
        <div>
          {state === "PAID_UNCONFIRMED" && (
            <p>
              We are waiting for
              <span className="text-primary">
                {" "}
                {incomingNumConfirmationsRemaining}
              </span>{" "}
              additional{" "}
              {pluralize(incomingNumConfirmationsRemaining, "confirmation")}{" "}
              before we send your BTC payment. <br />
            </p>
          )}
          {state === "PAID" && (
            <p>
              Your Monero payment was confirmed. We are now sending your
              Bitcoins...
            </p>
          )}
          {state === "BTC_SENT" && (
            <>
              <div>
                This transaction has currently
                <div className="text-primary d-inline mx-1">
                  {btcNumConfirmations > btcNumConfirmationsThreshold
                    ? `${btcNumConfirmationsThreshold}+`
                    : btcNumConfirmations}
                </div>
                {pluralize(btcNumConfirmations, "confirmation")}.<br />
              </div>
            </>
          )}
        </div>
      </div>
      {state === "NOT_FOUND" && <p>Your order could not be found</p>}
    </div>
  </div>
);

interface IOrderSummary {
  incomingAmountTotal: number;
  state: string;
  btcAmount: number;
  btcTransactionId: string;
  incomingNumConfirmationsRemaining: number;
  btcNumConfirmations: number;
  btcNumConfirmationsThreshold: number;
}

const OrderSummary: React.FC<IOrderSummary> = ({
  incomingAmountTotal,
  state,
  btcAmount,
  btcTransactionId,
  incomingNumConfirmationsRemaining,
  btcNumConfirmations,
  btcNumConfirmationsThreshold,
}) => (
  <div>
    <div className="mb-2">
      <div className="mb-2">
        <Segment positive>
          <div className="item">
            <div className="item__image">
              <img width={56} height={56} src={BitcoinSent} alt="code" />
            </div>
            <div className="item__content">
              <div>
                Thank you, we received your{" "}
                <span className="text-bold">{incomingAmountTotal} XMR</span>{" "}
                payment.
                <br />
                {state === "BTC_SENT" && (
                  <span id="btc_sent">
                    Your <span className="text-bold">{btcAmount} BTC </span>{" "}
                    payment has been sent.
                  </span>
                )}
              </div>
            </div>
          </div>
        </Segment>
      </div>
      <OrderStatus
        state={state}
        btcTransactionId={btcTransactionId}
        incomingNumConfirmationsRemaining={incomingNumConfirmationsRemaining}
        btcNumConfirmations={btcNumConfirmations}
        btcNumConfirmationsThreshold={btcNumConfirmationsThreshold}
      />
    </div>
  </div>
);

export default observer(OrderSummary);
