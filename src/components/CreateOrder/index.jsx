import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Form from '../common/Form';
import Button from '../common/Button';
import Rate from '../Rate';
import {inject, observer} from "mobx-react/index";

/**
 * Create Order Form
 * Home page form
 */
class CreateOrder extends Component {
  static propTypes = {
    params: PropTypes.shape({
      price: PropTypes.number,
      zeroConfMaxAmount: PropTypes.number,
      lowerLimit: PropTypes.number,
      upperLimit: PropTypes.number,
    }).isRequired,
    createOrder: PropTypes.func.isRequired,
    changeTab: PropTypes.func.isRequired,
    orderFormStore: PropTypes.shape({
      address: PropTypes.string,
      amount: PropTypes.number,
      usePP: PropTypes.bool,
      changeAddress: PropTypes.func,
      changeType: PropTypes.func,
      changeAmount: PropTypes.func,
    }).isRequired,
    netType: PropTypes.func,
  };
  state = {
    loading: false,
    error: '',
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { createOrder, changeTab, orderFormStore: { address, usePP, amount } } = this.props;
    const requestData = usePP
      ? { pp_url: address }
      : {
        btc_dest_address: address,
        btc_amount: amount,
      };
    createOrder(requestData).then(() => {
      changeTab(1);
    })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Could not create your order. Check your input values! Is this a valid bitcoin address?'
        })
      })
  };
  render() {
    const { loading, error } = this.state;
    const {
      netType,
      params: {
        price,
        zeroConfMaxAmount,
        lowerLimit,
        upperLimit,
      },
      orderFormStore: { address, usePP, amount, changeAmount },
    } = this.props;
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
                  {address}
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
                            onChange={(e, data) => changeAmount(data.value)}
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

export default inject("orderFormStore")(observer(CreateOrder));
