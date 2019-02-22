import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Form from '../common/Form';
import Button from '../common/Button';
import Rate from '../Rate';
import { ERRORS } from '../../constants';
/**
 * Create Order Form
 * Home page form
 */
export default class CreateOrder extends Component {
  static propTypes = {
    params: PropTypes.shape({
      price: PropTypes.number,
      zeroConfMaxAmount: PropTypes.number,
      lowerLimit: PropTypes.number,
      upperLimit: PropTypes.number,
    }).isRequired,
    createOrder: PropTypes.func.isRequired,
    usePP: PropTypes.bool,
    address: PropTypes.string.isRequired,
    netType: PropTypes.string.isRequired,
  };
  state = {
    loading: false,
    error: '',
    amount: '',
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { address, usePP, createOrder } = this.props;
    const { amount } = this.state;
    const errorCallback = (error) => {
      this.setState({
        loading: false,
        error: ERRORS[error.data.error] || ERRORS.defaultError,
      });
    };
    const requestData = usePP
      ? { pp_url: address }
      : {
        btc_dest_address: address,
        btc_amount: amount,
      };
    createOrder(requestData)
      .catch(errorCallback);
  };
  render() {
    const { loading, error } = this.state;
    const {
      params: {
        price,
        zeroConfMaxAmount,
        lowerLimit,
        upperLimit,
      },
      netType,
      address,
      usePP,
    } = this.props;
    const { amount } = this.state;
    const valid = address && (usePP ? true : amount > 0);
    return (
      <div className="relative">
        <div className="block">
          <div>
            <Form onSubmit={this.onSubmit}>
              <div>
                <Form.Field>
                  {
                    netType === 'stagenet' ? (
                      <div className="error fz12">Stagenet address:</div>
                    ) : (
                      <div className="fz12">Address:</div>
                    )
                  }
                  <div className="breakWord primaryText">
                    {address}
                  </div>
                  {
                    usePP && (
                      <div className="hint">
                        Fill in your "Contact & Refund Email" in bitpay dialog, and continue with XMR.to
                      </div>
                    )
                  }
                </Form.Field>
              </div>
              <div>
                {
                  !usePP && (
                    <Form.Field>
                      <div className="flex1">
                        <div className="flexVertAlign">
                          <Input
                            name="amount"
                            type="number"
                            onChange={(e, data) => this.setState({ amount: data.value })}
                            value={amount}
                            label={{ content: 'BTC', secondary: true }}
                            min={lowerLimit}
                            max={upperLimit}
                            fluid
                          />
                        </div>
                        <label htmlFor="amount">
                           <span className="fz12 lightText halfTopOffset dBlock">
                              Orders up to <span className="bold">{zeroConfMaxAmount}</span> BTC will be sent out instantly.
                            </span>
                        </label>
                      </div>
                    </Form.Field>
                  )
                }
              </div>
              <div>
                {
                  error && (
                    <div className="error">
                      {error}
                    </div>
                  )
                }
              </div>
            </Form>
          </div>
        </div>
        <div className="block">
          <Rate
            lowerLimit={lowerLimit}
            upperLimit={upperLimit}
            price={price}
            maxAmount={zeroConfMaxAmount}
            btcAmount={parseFloat(amount)}
          />
        </div>
        <div className="block centered">
          <Button onClick={this.onSubmit} size="big" disabled={!valid} loading={loading} primary>
            Create Order
          </Button>
        </div>
      </div>
    );
  }
}
