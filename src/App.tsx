import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "./store";
import config from "./config";
import OrderCountDown from "./components/OrderCountDown";
import Rate from "./components/Rate";
import CreateOrderFrom from "./components/CreateOrderFrom";
import UnpaidOrder from "./components/UnpaidOrder";
import PaidOrder from "./components/PaidOrder";
import ExpiredOrder from "./components/ExpiredOrder";
import { IFRAME_HEIGHT, ORDER_STATE } from "./constants";
import "./styles.scss";

const defaultHeight = 360;

const App: React.FC = () => {
  const {
    paramsStore: { fetchParams },
    orderStore: { order, fetchOrder },
  } = useMst();
  useEffect(() => {
    fetchParams();
    const paramsIntervalID = setInterval(() => {
      fetchParams();
    }, config.refreshOrderParamsInterval);
    const dataIntervalID = setInterval(() => {
      if (order.uuid) {
        fetchOrder({ uuid: order.uuid });
      }
    }, config.refreshOrderDataInterval);
    return () => {
      clearInterval(paramsIntervalID);
      clearInterval(dataIntervalID);
    };
  }, [fetchParams, fetchOrder, order.uuid]);
  useEffect(() => {
    window.parent.postMessage(
      {
        type: "resize",
        data: { height: IFRAME_HEIGHT[order.state] || defaultHeight },
      },
      "*"
    );
  }, [order.state]);
  function renderSwitch() {
    switch (order.state) {
      case ORDER_STATE.TO_BE_CREATED: {
        return <div>Please wait...</div>;
      }
      case ORDER_STATE.UNPAID:
      case ORDER_STATE.UNDERPAID: {
        return <UnpaidOrder />;
      }
      case ORDER_STATE.PAID_UNCONFIRMED:
      case ORDER_STATE.PAID:
      case ORDER_STATE.BTC_SENT: {
        return <PaidOrder />;
      }
      case ORDER_STATE.TIMED_OUT: {
        return <ExpiredOrder />;
      }
      default:
        return <CreateOrderFrom />;
    }
  }
  return (
    <div
      className="app"
      style={{ height: `${IFRAME_HEIGHT[order.state] || defaultHeight}px` }}
    >
      <div className="app__left">{renderSwitch()}</div>
      <div className="app__right">
        <OrderCountDown />
        <Rate />
      </div>
    </div>
  );
};

export default observer(App);
