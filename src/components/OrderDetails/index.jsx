import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentWaiting from './PaymentWaiting';
import PaymentExist from './PaymentExist';
import NotFound from './NotFound';

/**
 * Order details
 * Home page form
 */
export default class OrderDetails extends Component {
  static propTypes = {
    fetchOrder: PropTypes.func.isRequired,
    clearOrder: PropTypes.func.isRequired,
    order: PropTypes.shape({}).isRequired,
  };
  state = {
    loading: false,
  };
  componentWillUnmount() {
    const { clearOrder } = this.props;
    clearOrder();
  }
  renderStatus = () => {
    const { order, order: { state }, clearOrder, fetchOrder } = this.props;
    switch (state) {
      case 'UNPAID':
      case 'TO_BE_CREATED':
      case 'UNDERPAID': {
        return <PaymentWaiting fetchOrder={fetchOrder} trackAnotherOrder={clearOrder} order={order} />;
      }
      case 'PAID_UNCONFIRMED':
      case 'PAID':
      case 'BTC_SENT': {
        return <PaymentExist trackAnotherOrder={clearOrder} order={order} />;
      }
      case 'TIMED_OUT':
      case 'NOT_FOUND': {
        return <NotFound trackAnotherOrder={clearOrder} order={order} />;
      }
      default: {
        return <div />;
      }
    }
  };
  render() {
    const { loading } = this.state;
    return (
      <div className="relative">
        <div className="block">
          {this.renderStatus()}
        </div>
      </div>
    );
  }
}

// xmrto-7btVWH