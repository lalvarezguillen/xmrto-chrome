import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Form from '../common/Form';
import Button from '../common/Button';
import Rate from '../Rate';

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
    changeTab: PropTypes.func.isRequired,
    setBTCAddress: PropTypes.func.isRequired,
    order: PropTypes.shape({
      btcDestAddress: PropTypes.string,
    }).isRequired,
  };
  state = {
    loading: false,
    usePP: false,
    error: '',
    btcAmount: 0,
  };
  componentWillUnmount() {
    const { setBTCAddress } = this.props;
    setBTCAddress('');
  }
  onSubmit = () => {
    this.setState({ loading: true });
    const { createOrder, changeTab, order: { btcDestAddress: address } } = this.props;
    const { usePP, btcAmount } = this.state;
    const requestData = usePP
      ? { pp_url: address }
      : {
        btc_dest_address: address,
        btc_amount: btcAmount,
      };
    createOrder(requestData).then(() => {
      changeTab(1);
    })
      .catch(() => {
        this.setState({
          loading: false,
        })
      })
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { loading, usePP, btcAmount = 0, error } = this.state;
    const {
      params: {
        price,
        zeroConfMaxAmount,
        lowerLimit,
        upperLimit,
      },
      order: { btcDestAddress: address },
      setBTCAddress,
    } = this.props;
    const valid = address && (usePP ? true : btcAmount > 0);
    return (
      <div className="relative">
        <div className="block">
          <div>
            <Form>
              <div>
                <Form.Field>
                  <Input
                    name="address"
                    id="address"
                    type="text"
                    placeholder={usePP ? 'Payment protocol bill URL' : 'Bitcoin wallet destination address'}
                    onChange={(e) => setBTCAddress(e.target.value)}
                    value={address}
                    fluid
                  />
                  <label htmlFor="address">
                    {
                      usePP && (
                        <div className="dInlineBlock">
                          <span className="lightText">or&nbsp;</span>
                          <button
                            type="button"
                            className="clearButton primaryText"
                            onClick={() => {
                              this.setState({
                                address: '',
                                usePP: false,
                              });
                            }}
                          >
                            enter your wallet address
                          </button>
                          <span className="lightText">
                              &nbsp;instead
                            </span>
                        </div>
                      )
                    }
                    {
                      !usePP && (
                        <div className="dInlineBlock">
                          <span className="lightText">or&nbsp;</span>
                          <button
                            type="button"
                            className="clearButton primaryText"
                            onClick={() => {
                              this.setState({
                                address: '',
                                usePP: true,
                              });
                            }}
                          >
                            enter payment bill URL
                          </button>
                          <span className="lightText">
                              &nbsp;instead
                            </span>
                        </div>
                      )
                    }
                  </label>
                </Form.Field>
              </div>
              <div>
                {
                  !usePP && (
                    <Form.Field>
                      <div className="flex1">
                        <div className="flexVertAlign">
                          <Input
                            name="btcAmount"
                            type="number"
                            onChange={(e, data) => this.onChange({ target: { name: data.name, value: data.value }})}
                            value={btcAmount}
                            label={{ content: 'BTC', secondary: true }}
                            min={lowerLimit}
                            max={upperLimit}
                            fluid
                          />
                        </div>
                        <label htmlFor="btcAmount">
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
            btcAmount={parseFloat(btcAmount)}
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
