import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import QRCode from 'qrcode.react';
import VAR from '../../variables';
import secondsToHms from '../../helpers/secondsToHms';
import Form from '../common/Form';
import Input from '../common/Input';
import Icon from '../common/Icon';
import Loader from '../common/Loader';
import Tooltip from '../common/Tooltip';
import Code from '../common/Code';
import Copy from '../common/Copy';

export default class PaymentWaiting extends Component {
  static propTypes = {
    order: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      xmrAmountRemaining: PropTypes.number.isRequired,
      xmrAmountTotal: PropTypes.number.isRequired,
      xmrReceivingIntegratedAddress: PropTypes.string.isRequired,
      xmrRequiredPaymentIdLong: PropTypes.string.isRequired,
      xmrReceivingAddress: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      secondsTillTimeout: PropTypes.number.isRequired,
    }).isRequired,
    fetchOrder: PropTypes.func.isRequired,
  };
  state = {
    timeout: this.props.order.secondsTillTimeout || 0,
    useOldStyleAddress: false,
  };
  componentDidMount() {
    // eslint-disable-next-line
    const copy = new Clipboard('.copyToClipboard');
    this.timeout = setInterval(this.updateTimer, 1000);
    setTimeout(this.updateData, 1000); // need little timeout to fetch data from the server, as we have async creation of order
  }
  componentWillReceiveProps(newProps) {
    this.setState({ timeout: newProps.order.secondsTillTimeout || 0 });
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  updateTimer = () => {
    const { timeout } = this.state;
    this.setState({ timeout: timeout - 1 });
  };
  render() {
    const {
      order: {
        xmrAmountRemaining,
        xmrReceivingIntegratedAddress,
        xmrRequiredPaymentIdLong,
        xmrReceivingAddress,
        xmrAmountTotal,
        state,
        uuid,
      },
    } = this.props;
    const xmrReceived = xmrAmountTotal - xmrAmountRemaining;
    const { timeout, useOldStyleAddress } = this.state;
    const qrCodeString = `monero:${xmrReceivingIntegratedAddress}?tx_amount=${state === 'UNDERPAID' ? xmrAmountRemaining : xmrAmountTotal}&tx_description=XMR.TO payment`;
    return (
      <div className="relative">
        <div className="centered">Order Secret Key &mdash; <span className="bold">{uuid}</span></div>
        <div className="centered error">Important: save the secret key to track the status of your order.</div>
        <div className="block">
          {
            state === 'UNDERPAID'
              ? <span>Send additional <Copy text={xmrAmountRemaining} /> XMR to complete your order</span>
              : <span>Send <span className="primaryText"><Copy text={xmrAmountTotal} /></span> XMR to the following address:</span>
          }
        </div>
        <div className="block">
          <div>
            <div>
              {
                state === 'UNDERPAID' && (
                  <div className="flex">
                    <div style={{ marginRight: '1rem' }}>
                      <Icon name="clock" color={VAR.colors.lightPrimary} />
                    </div>
                    <div>
                      <p className="fz14">
                        We’ve received your payment: {xmrReceived} XMR
                        out of {xmrAmountTotal} XMR. <br />
                        Please send an additional {xmrAmountRemaining} XMR
                        to complete your order.
                      </p>
                    </div>
                  </div>
                )
              }
              <div className="block">
                {
                  useOldStyleAddress ? (
                    <div>
                      <Form.Field>
                        <span className="fz12 dBlock secondaryText">
                          Payment ID to include (you must not forget this!)
                        </span>
                        <Input
                          value={xmrRequiredPaymentIdLong || ''}
                          name="paymentIdLong"
                          button={{
                            content: (
                              <Tooltip
                                autoDismiss={2000}
                                content={(
                                  <div className="fz12 successText normal nowrap">
                                            <span className="fz9">
                                              <Icon name="check" color={VAR.colors.success} />
                                            </span>&nbsp;&nbsp;<span>Copied</span>
                                  </div>
                                )}
                                on="click"
                              >
                                <Icon name="copy" />
                              </Tooltip>
                            ),
                            className: 'copyToClipboard',
                            clipboardText: xmrRequiredPaymentIdLong,
                          }}
                          fluid
                        />
                      </Form.Field>
                      <div>
                                <span className="fz12 dBlock secondaryText">
                                  Address to send XMR to
                                </span>
                        <Input
                          value={xmrReceivingAddress || ''}
                          name="xmrReceivingAddress"
                          button={{
                            content: (
                              <Tooltip
                                autoDismiss={2000}
                                content={(
                                  <div className="fz12 successText normal nowrap">
                                            <span className="fz9">
                                              <Icon name="check" color={VAR.colors.success} />
                                            </span>&nbsp;&nbsp;<span>Copied</span>
                                  </div>
                                )}
                                on="click"
                              >
                                <Icon name="copy" />
                              </Tooltip>
                            ),
                            className: 'copyToClipboard',
                            clipboardText: xmrReceivingAddress,
                          }}
                          fluid
                        />
                      </div>
                    </div>
                  ) : (
                    <Input
                      value={xmrReceivingIntegratedAddress || ''}
                      name="moneroAddress"
                      button={{
                        content: (
                          <Tooltip
                            autoDismiss={2000}
                            content={(
                              <div className="fz12 successText normal nowrap">
                                        <span className="fz9">
                                          <Icon name="check" color={VAR.colors.success} />
                                        </span>&nbsp;&nbsp;<span>Copied</span>
                              </div>
                            )}
                            on="click"
                          >
                            <Icon name="copy" />
                          </Tooltip>
                        ),
                        className: 'copyToClipboard',
                        clipboardText: xmrReceivingIntegratedAddress,
                      }}
                      fluid
                    />
                  )
                }
                <Form.Field>
                  <label htmlFor="changeType">
                    or&nbsp;
                    <button
                      name="changeType"
                      type="button"
                      className="clearButton primaryText"
                      onClick={() => this.setState({
                        useOldStyleAddress: !useOldStyleAddress,
                      })}
                    >
                      {useOldStyleAddress ? 'use integrated address' : 'use old style address (payment ID)'}
                    </button>
                    &nbsp;instead
                  </label>
                </Form.Field>
              </div>
              <div className="xmrto-TYC2Uq">
                {
                  !!xmrReceivingIntegratedAddress && (
                    <div className="centered">
                      <QRCode value={qrCodeString} size={140} level="H" />
                    </div>
                  )
                }
              </div>
              <div>
                <div className="fz13 secondaryText">
                  Copy the line below into your Monero CLI wallet to pay this order:
                </div>
                <Code>
                  {`transfer ${xmrReceivingIntegratedAddress} ${state === 'UNDERPAID' ? xmrAmountRemaining : xmrAmountTotal}`}
                </Code>
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="flex">
            <div style={{ marginRight: '1rem' }}>
              <Icon name="clock" color={VAR.colors.lightPrimary} />
            </div>
            <div>
              <p className="fz15">Order expires in {secondsToHms(timeout) || 0}</p>
            </div>
          </div>
        </div>
        <Loader active={!xmrReceivingIntegratedAddress} cover dimmer />
      </div>
    );
  }
}
