import React from "react";
import { Button } from "squirrel-ui-components";
import { observer } from "mobx-react-lite";
import { useMst } from "../../store";
import IconTimeout from "./timeout.svg";

const ExpiredOrder: React.FC = () => {
  const {
    orderStore: {
      order: { btcDestAddress },
      setData,
    },
  } = useMst();
  return (
    <div>
      <div className="p-2">
        <div className="text-center">
          <img src={IconTimeout} alt="timeout" />
        </div>
        <br />
        <p className="p-2">
          This order timed out because XMR.to did not receive any or sufficient
          payment within the timeout.
          <br />
          Are you sure your transaction was broadcast and is confirmed on the
          Monero blockchain? Check if you can see your transaction on block
          explorers such as&nbsp;
          <a
            className="link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://xmrchain.net"
          >
            https://xmrchain.net
          </a>{" "}
          or&nbsp;
          <a
            className="link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://moneroblocks.info"
          >
            https://moneroblocks.info
          </a>
          .&nbsp; If your transaction is indeed confirmed, see section{" "}
          <a
            className="link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://xmr.to#faq"
          >
            <i>My money is gone?!</i>
          </a>{" "}
          in the FAQ.
        </p>
        <div className="text-center">
          <Button
            type="button"
            onClick={(): void => {
              setData({ btcDestAddress });
            }}
          >
            Create new order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(ExpiredOrder);
