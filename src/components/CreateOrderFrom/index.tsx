import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Input, CheckBox, Button, Select } from "squirrel-ui-components";
import { useMst } from "../../store";
import { ERRORS } from "../../constants";
import "./styles.scss";

type Currency = {
  label: string;
  value: string;
};

const options: Array<Currency> = [
  { label: "BTC", value: "BTC" },
  { label: "XMR", value: "XMR" },
];

/**
 * Create Order Form
 */
const CreateOrder: React.FC = () => {
  const {
    orderStore: {
      createOrder,
      order: { btcDestAddress },
    },
    paramsStore: {
      params: { zeroConfMaxAmount },
    },
  } = useMst();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("BTC");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  function successCallback(): void {
    setError("");
    setTimeout(() => {}, 1000);
  }
  function errorCallback(err: {
    data: { error: string; error_msg: string; error_msg_display: string };
  }): void {
    setLoading(false);
    setError(ERRORS[err.data.error] || ERRORS.defaultError);
    if (err.data.error_msg_display || err.data.error_msg) {
      setError(err.data.error_msg_display || err.data.error_msg);
    }
  }
  function onSubmit(): Promise<void> {
    setLoading(true);
    const requestData = {
      btc_dest_address: btcDestAddress,
      amount,
      amount_currency: currency,
    };
    return createOrder(requestData).then(successCallback, errorCallback);
  }
  function onCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const {
      target: { value },
    } = e;
    setCurrency(value);
  }
  useEffect(() => {
    setError("");
  }, [btcDestAddress]); // eslint-disable-line react-hooks/exhaustive-deps
  const valid = confirmed && btcDestAddress && amount > 0;
  return (
    <div className="create-order">
      <h3 className="h3">Create order</h3>
      <div className="mb-3">
        <span className="t-hint-1">Bitcoin destination address:</span>
        <br />
        <span className="text-primary">{btcDestAddress}</span>
      </div>
      <div className="mb-3">
        <Input
          name="amount"
          type="number"
          placeholder="Order amount"
          id="amount"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setAmount(parseFloat(e.target.value))
          }
          select={
            <Select value={currency} onChange={onCurrencyChange}>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          }
        />
        <label className="t-hint-1" htmlFor="amount">
          Orders up to <span>{zeroConfMaxAmount}</span> BTC will be sent out
          instantly.
        </label>
      </div>
      <div className="mb-3">
        <CheckBox
          checked={confirmed}
          id="confirm"
          label={
            <span>
              I’ve read and agree to the&nbsp;
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://xmr.to/terms-of-service"
              >
                <button type="button" className="clear-btn c-hand text-primary">
                  Terms of Service
                </button>
              </a>
            </span>
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setConfirmed(e.target.checked)
          }
        />
      </div>
      {error && <div className="mb-3 text-error">{error}</div>}
      <Button
        onClick={onSubmit}
        type="submit"
        id="submit"
        disabled={!valid}
        loading={loading}
        large
        primary
      >
        Next Step
      </Button>
    </div>
  );
};

export default observer(CreateOrder);
