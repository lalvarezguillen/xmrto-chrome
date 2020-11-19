import React from "react";
import { Tooltip, Icon } from "squirrel-ui-components";
import { observer } from "mobx-react-lite";
import { useMst } from "../../store";
import config from "../../config";

const calculateTime = (amount: number): number => {
  for (let i = 0; i < config.num_xmr_confirmations.length; i += 1) {
    const condition = config.num_xmr_confirmations[i];
    if (amount > condition.min && amount <= condition.max) {
      return condition.confirmations * config.block_time;
    }
  }
  return 0;
};

interface RateParams {
  price?: number;
  btcAmount?: number;
  maxAmount?: number;
  lowerLimit?: number;
  upperLimit?: number;
  isOrderCreated?: boolean;
  incomingAmountTotal?: number;
  secretKey?: string;
}

const Rate: React.FC<RateParams> = ({
  price = 0,
  btcAmount = 0,
  maxAmount = 0,
  lowerLimit = 0,
  upperLimit = 0,
  isOrderCreated = false,
  incomingAmountTotal = 0,
  secretKey = "",
}) => {
  return (
    <div>
      {secretKey.length > 0 && (
        <div className="mb-2">
          <div className="t-hint-1">
            You can check the status of your order anytime by using a secret
            key:
          </div>
          <div className="text-primary text-bold">{secretKey}</div>
        </div>
      )}
      {isOrderCreated ? (
        <>
          <div className="mb-2">
            <div className="t-hint-1">Exchange rate for your order</div>
            {price ? <div>1 XMR = {price} BTC</div> : <div>Updating...</div>}
          </div>
          <div className="mb-2">
            {!!incomingAmountTotal && (
              <div>
                You pay {incomingAmountTotal} XMR you get {btcAmount} BTC.
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-2">
            <div className="t-hint-1">Indicative exchange rate</div>
            <div>1 XMR = {price} BTC</div>
          </div>
          <div className="mb-2">
            <div className="t-hint-1">Operation Limit</div>
            <div>
              {lowerLimit.toFixed(11).replace(/\.?0+$/, "")} BTC &mdash;{" "}
              {upperLimit.toFixed(11).replace(/\.?0+$/, "")} BTC
            </div>
          </div>
        </>
      )}
      {!secretKey && (
        <div className="mb-2">
          <div className="t-hint-1">
            Est. time to send BTC &nbsp;
            <Tooltip
              content={`Estimated time for us to send your bitcoins, \n after you click "send" in your Monero wallet. \n 0 to 0.1 BTC: instant. \n ${
                upperLimit > 0.1 ? `0.1 to ${upperLimit} BTC: 2 minutes` : ""
              }`}
            >
              <Icon name="info" />
            </Tooltip>
          </div>
          <div>
            {btcAmount <= maxAmount ? (
              <span>instant</span>
            ) : (
              `${calculateTime(btcAmount)} minutes`
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const StepRateWrapper: React.FC = () => {
  const {
    orderStore: {
      order: { incomingAmountTotal, incomingPriceBtc, btcAmount, uuid },
    },
    paramsStore: {
      params: { zeroConfMaxAmount, price, lowerLimit, upperLimit },
    },
  } = useMst();
  return uuid ? (
    <Rate
      isOrderCreated={!!uuid}
      price={incomingPriceBtc}
      btcAmount={btcAmount || 0}
      incomingAmountTotal={incomingAmountTotal}
      secretKey={uuid}
    />
  ) : (
    <Rate
      lowerLimit={lowerLimit}
      upperLimit={upperLimit}
      price={price}
      maxAmount={zeroConfMaxAmount}
    />
  );
};

const StepRate = observer(StepRateWrapper);

export default StepRate;
