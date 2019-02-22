import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentWaiting from './PaymentWaiting';
import PaymentExist from './PaymentExist';
import NotFound from './NotFound';
import config from "../../config";
import Clipboard from "clipboard";

/**
 * Order details
 * Home page form
 */
export default class OrderDetails extends Component {
  static propTypes = {
    fetchOrder: PropTypes.func.isRequired,
    order: PropTypes.shape({}).isRequired,
  };
  componentDidMount() {
    // eslint-disable-next-line
    const copy = new Clipboard('.copyToClipboard');
    this.dataTimeout = setInterval(this.updateData, config.refreshOrderDataInterval);
    setTimeout(this.updateData, 1000); // need small timeout to fetch data from the server, as we have async creation of order
  }
  componentWillUnmount() {
    clearTimeout(this.dataTimeout);
  }
  updateData = () => {
    const { order: { uuid }, fetchOrder } = this.props;
    fetchOrder({ uuid });
  };
  renderStatus = () => {
    const { order, order: { state }, fetchOrder } = this.props;
    switch (state) {
      case 'UNPAID':
      case 'TO_BE_CREATED':
      case 'UNDERPAID': {
        return <PaymentWaiting fetchOrder={fetchOrder} order={order} />;
      }
      case 'PAID_UNCONFIRMED':
      case 'PAID':
      case 'BTC_SENT': {
        return <PaymentExist order={order} />;
      }
      case 'TIMED_OUT':
      case 'NOT_FOUND': {
        return <NotFound order={order} />;
      }
      default: {
        return <div />;
      }
    }
  };
  render() {
    return (
      <div className="relative">
        <div className="block">
          {this.renderStatus()}
        </div>
      </div>
    );
  }
}
