import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import Copy from '../common/Copy';
import Button from '../common/Button';
import { Statistic } from '../Rate';
import OrderStatus from './OrderStatus';

export default class Processing extends Component {
  static propTypes = {
    order: PropTypes.shape({
      xmrNumConfirmationsRemaining: PropTypes.number,
      btcTransactionId: PropTypes.string,
      xmrPriceBtc: PropTypes.number,
      xmrAmountTotal: PropTypes.number,
      btcAmount: PropTypes.number,
      state: PropTypes.string,
      uuid: PropTypes.string,
    }).isRequired,
  };
  componentDidMount() {
    // eslint-disable-next-line
    const copy = new Clipboard('.copyToClipboard');
  }
  render() {
    const {
      order: {
        xmrNumConfirmationsRemaining,
        btcTransactionId,
        btcDestAddress,
        xmrPriceBtc,
        xmrAmountTotal,
        btcAmount,
        state,
        uuid,
      },
    } = this.props;
    return (
      <div className="relative">
        <div className="block">
          <div>
            <div>
              <div>
                <OrderStatus uuid={uuid} state={state} />
              </div>
              {
                state === 'BTC_SENT' && (
                  <div className="block">
                    <label htmlFor="btcAddress" className="dBlock secondaryText fz12">
                      Transaction ID of your BTC payment:
                    </label>
                    <Copy text={btcTransactionId || ''} />
                  </div>
                )
              }
              <div className="fz13 xmrto-KTvMGA">
                {
                  state === 'PAID_UNCONFIRMED' && (
                    <div className="flex">
                      <div className="primaryText bold" style={{ marginRight: '1rem' }}>
                        STATUS:
                      </div>
                      <p>
                        We are waiting for
                        <span className="primaryText"> {xmrNumConfirmationsRemaining}</span> additional confirmation
                        before we send your BTC payment.
                      </p>
                    </div>
                  )
                }
                {
                  state === 'PAID' && (
                    <div className="flex">
                      <div className="primaryText bold" style={{ marginRight: '1rem' }}>
                        STATUS:
                      </div>
                      <p>
                        Your Monero payment was confirmed.
                        We are now sending your Bitcoins.
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <Statistic>
            <Statistic.Row>
              <div className="fz12 secondaryText">Destination Address</div>
              <div className="breakWord primaryText">
                {btcDestAddress}
              </div>
            </Statistic.Row>
            <Statistic.Row>
              <div className="fz12 secondaryText">Exchange Rate</div>
              <div>1 XMR = {xmrPriceBtc} BTC</div>
            </Statistic.Row>
            <Statistic.Row>
              <div className="fz12 secondaryText">Order Amount</div>
              <div>{xmrAmountTotal} XMR = {btcAmount} BTC</div>
            </Statistic.Row>
          </Statistic>
        </div>
      </div>
    );
  }
}
