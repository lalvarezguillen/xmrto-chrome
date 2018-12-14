import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderStatus from './OrderStatus';
import Button from '../common/Button';

export default class NotFound extends Component {
  static propTypes = {
    order: PropTypes.shape({
      uuid: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
    trackAnotherOrder: PropTypes.func.isRequired,
  };
  render() {
    const { order: { uuid, state }, trackAnotherOrder } = this.props;
    return (
      <div className="relative">
        <div className="block">
          <OrderStatus uuid={uuid} state={state} />
        </div>
        <div className="block centered">
          <Button
            size="big"
            secondary
            onClick={trackAnotherOrder}
          >
            Track Another Order
          </Button>
        </div>
      </div>
    );
  }
}
