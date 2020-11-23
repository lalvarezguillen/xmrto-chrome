import React from "react";
import { observer } from "mobx-react-lite";
import OrderSummary from "../OrderSummary";
import { useMst } from "../../store";

const PaidOrder: React.FC = () => {
  const {
    orderStore: {
      order: {
        incomingAmountTotal,
        btcAmount,
        btcNumConfirmations,
        incomingNumConfirmationsRemaining,
        btcNumConfirmationsThreshold,
        btcTransactionId,
        state,
      },
    },
  } = useMst();
  return (
    <section className="order-step">
      <header className="order-step__header">
        <h3 className="h3">We are processing your order:</h3>
      </header>
      <div className="order-step__content">
        <div className="mb-2">
          <OrderSummary
            incomingAmountTotal={incomingAmountTotal}
            state={state}
            btcAmount={btcAmount}
            btcTransactionId={btcTransactionId}
            incomingNumConfirmationsRemaining={
              incomingNumConfirmationsRemaining
            }
            btcNumConfirmations={btcNumConfirmations}
            btcNumConfirmationsThreshold={btcNumConfirmationsThreshold}
          />
        </div>
      </div>
    </section>
  );
};

export default observer(PaidOrder);
